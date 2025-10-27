import { Request, Response } from "express";
import {
  partida_tipo_partida,
  Prisma,
  PrismaClient,
} from "../generated/prisma";
import { Partida, PartidaParcial, Status, Vencedor } from "../Models/Partida";
import { Alianca, ALiancaParcial } from "../Models/Alianca";
import {
  CalcularFaltasTotal,
  CalcularRP,
  CalcularTotal,
  NewAliance,
} from "../Services/AllianceService";
import { prisma } from "../Services/GenericServices";

export async function GetAllMatches(req: Request, res: Response) {
  const matches = await prisma.partida.findMany({
    orderBy: {
      numero_partida: "asc",
    },
  });

  if (!matches) {
    return res.status(404).json({ msg: "Sem partidas disponiveis" });
  }

  return res.status(200).json({ partidas: matches });
}

export async function GetMatchInfo(req: Request, res: Response) {
  const match_id = req.params.match_id;

  const [match, result] = await Promise.all([
    await prisma.partida.findUnique({
      where: {
        id: Number(match_id),
      },
      select: {
        numero_partida: true,
      },
    }),
    await prisma.alianca.findMany({
      where: {
        partida_id: Number(match_id),
      },
      select: {
        color: true,
        time1: true,
        time2: true,
        idade_media: true,
        pre_historico: true,
      },
    }),
  ]);

  return res.status(200).json({ match_info: match, alliances: result });
}

export async function GetResult(req: Request, res: Response) {
  const match_id = req.params.match_id;

  const [match, result] = await Promise.all([
    await prisma.partida.findUnique({
      where: {
        id: Number(match_id),
      },
    }),
    await prisma.alianca.findMany({
      where: {
        partida_id: Number(match_id),
      },
    }),
  ]);

  return res.status(200).json({ match_info: match, alliances: result });
}

export async function NewMatch(req: Request, res: Response) {
  try {
    const match: Partida = req.body.match;
    const aliancas: Alianca[] = req.body.aliancas;

    match.azul_pontos = 0;
    match.vermelho_pontos = 0;
    match.vencedor = "no";
    match.status = "agendada";

    const new_match = await prisma.partida.create({
      data: match,
    });

    const alliences_id = [];

    for (const alianca of aliancas) {
      alliences_id.push(await NewAliance(alianca, new_match.id));
    }

    return res.status(201).json({ msg: "Partida criada com sucesso" });
  } catch (error) {
    console.log(error);
  }
}

export async function EditMatch(req: Request, res: Response) {
  const aliancas: ALiancaParcial[] = req.body.aliancas;
  const status: Status = req.body.status;
  const match_id = req.params.match_id;

  const id_db = await prisma.partida.findUnique({
    where: {
      id: Number(match_id),
    },
  });

  if (!id_db) {
    return res.status(404).json({ msg: "Id de partida não existe" });
  }

  if (status) {
    await prisma.partida.update({
      where: {
        id: Number(match_id),
      },
      data: {
        status: status,
      },
    });
  }

  await Promise.all(
    aliancas.map((ali) => {
      return prisma.alianca.updateMany({
        where: {
          partida_id: Number(match_id),
          AND: { color: ali.color },
        },
        data: ali,
      });
    })
  );

  return res.status(200).json({ msg: "Partida editada com sucesso" });
}

export async function DeleteMatch(req: Request, res: Response) {
  const match_id = req.params.match_id;

  const id_db = await prisma.partida.findFirst({
    where: {
      id: Number(match_id),
    },
  });

  if (!id_db) {
    return res.status(404).json({ msg: "Id de partida não existe", id_db });
  }

  await Promise.all([
    await prisma.alianca.deleteMany({
      where: {
        partida_id: Number(match_id),
      },
    }),
    await prisma.partida.delete({
      where: {
        id: Number(match_id),
      },
    }),
  ]);

  return res.status(200).json({ msg: "Partida deletada com sucesso" });
}

/**
 * @description Fecha a partida de maneira parcial, sem somar pontos de falta
 * @param req
 * @param res
 * @returns
 */
export async function EndJudgeScores(req: Request, res: Response) {
  const alianca: Alianca = req.body.alianca;
  const match_id = req.params.match_id;

  const match_db = await prisma.partida.findFirst({
    where: {
      id: Number(match_id),
    },
  });

  if (match_db?.status == "completada") {
    return res
      .status(401)
      .json({ msg: "Partidas já completadas nãp podem ser alteradas" });
  }

  const total = CalcularTotal(alianca, alianca, false);

  await prisma.alianca.updateMany({
    where: {
      partida_id: Number(match_id),
      AND: { color: alianca.color },
    },
    data: {
      teleop_pontos: alianca.teleop_pontos,
      auto_pontos: alianca.auto_pontos,
      faltas_pontos: CalcularFaltasTotal(alianca),
      falta_branca: alianca.falta_branca,
      falta_estacionar: alianca.falta_estacionar,
      falta_prh: alianca.falta_prh,
      falta_transp: alianca.falta_transp,
      idade_media: alianca.idade_media,
      pre_historico: alianca.pre_historico,
      idade_media_au: alianca.idade_media_au,
      pre_historico_au: alianca.pre_historico_au,
      poco_au: alianca.poco_au,
      poco_endgame: alianca.poco_endgame,
      sitio: alianca.sitio,
      estacionar: alianca.estacionar,
      sair: alianca.sair,
      total_rp: CalcularRP(alianca, "no"),
      total_pontos: total,
    },
  });

  await prisma.partida.update({
    where: {
      id: match_db?.id,
    },
    data: {
      status: "em_progresso",
    },
  });

  return res.status(200).json({
    msg: `Resultado parcial da aliança ${alianca.color} registrada com sucesso `,
  });
}

export async function EndMatch(req: Request, res: Response) {
  const aliancas: Alianca[] = req.body.aliancas;
  const match_id = req.params.match_id;

  let vencedor: Vencedor;

  const alianca_azul = aliancas.find((f) => f.color == "azul")!;
  const alianca_vermelho = aliancas.find((f) => f.color == "vermelho")!;

  const total_azul = CalcularTotal(alianca_azul, alianca_vermelho, true);
  const total_vermelho = CalcularTotal(alianca_vermelho, alianca_azul, true);

  if (total_azul > total_vermelho) {
    vencedor = "azul";
  } else if (total_azul < total_vermelho) {
    vencedor = "vermelho";
  } else {
    vencedor = "empate";
  }

  const total_rp_azul = CalcularRP(alianca_azul, vencedor);
  const total_rp_vermelho = CalcularRP(alianca_vermelho, vencedor);

  await Promise.all(
    aliancas.map(async (ali) => {
      return prisma.alianca.updateMany({
        where: {
          partida_id: Number(match_id),
          AND: { color: ali.color },
        },
        data: {
          teleop_pontos: ali.teleop_pontos,
          auto_pontos: ali.auto_pontos,
          faltas_pontos: CalcularFaltasTotal(ali),
          falta_branca: ali.falta_branca,
          falta_estacionar: ali.falta_estacionar,
          falta_prh: ali.falta_prh,
          falta_transp: ali.falta_transp,
          sitio: ali.sitio,
          poco_au: ali.poco_au,
          poco_endgame: ali.poco_endgame,
          idade_media: ali.idade_media,
          pre_historico: ali.pre_historico,
          estacionar: ali.estacionar,
          sair: ali.sair,
          total_rp: ali.color == "azul" ? total_rp_azul : total_rp_vermelho,
          total_pontos: ali.color == "azul" ? total_azul : total_vermelho,
        },
      });
    })
  );

  await prisma.partida.update({
    where: {
      id: Number(match_id),
    },
    data: {
      vencedor: vencedor,
      azul_pontos: total_azul,
      vermelho_pontos: total_vermelho,
      status: "completada",
    },
  });

  return res.status(200).json({
    msg: "Partida finalizada com sucesso",
    Vencedor: vencedor,
    total_azul: total_azul,
    total_vermelho: total_vermelho,
  });
}

export async function GetalliancesByMatchId(req: Request, res: Response) {
  const match_id = req.params.match_id;

  const aliancas = await prisma.alianca.findMany({
    where: {
      partida_id: Number(match_id),
    },
  });

  if (aliancas.length == 0) {
    return res.status(404).json({ msg: "Alianças não encontradas" });
  }

  return res
    .status(200)
    .json({ msg: "Aliancas encontradas com sucesso", aliancas: aliancas });
}
