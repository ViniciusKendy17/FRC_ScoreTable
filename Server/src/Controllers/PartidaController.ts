import { Request, Response } from "express";
import {
  partida_tipo_partida,
  Prisma,
  PrismaClient,
} from "../generated/prisma";
import { Partida, Vencedor } from "../Models/Partida";
import { Alianca, ALiancaParcial } from "../Models/Alianca";
import {
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
  const match_id = req.params.match_id;

  const id_db = await prisma.partida.findUnique({
    where: {
      id: Number(match_id),
    },
  });

  if (!id_db) {
    return res.status(404).json({ msg: "Id de partida não existe" });
  }

  await Promise.all(
    aliancas.map((ali) => {
      return prisma.alianca.updateMany({
        where: {
          partida_id: Number(match_id),
          AND: { color: ali.color },
        },
        data: {
          time1: ali.time1,
          time2: ali.time2,
          time3: ali.time3,
        },
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

  const total = CalcularTotal(alianca);

  await prisma.alianca.updateMany({
    where: {
      partida_id: Number(match_id),
      AND: { color: alianca.color },
    },
    data: {
      teleop_pontos: alianca.teleop_pontos,
      auto_pontos: alianca.auto_pontos,
      faltas_pontos: alianca.faltas_pontos,
      idade_media: alianca.idade_media,
      pre_historico: alianca.pre_historico,
      estacionar: alianca.estacionar,
      sair: alianca.sair,
      total_rp: CalcularRP(alianca, "no"),
      total_pontos: total,
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

  const total_azul = CalcularTotal(alianca_azul);
  const total_vermelho = CalcularTotal(alianca_vermelho);

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
          faltas_pontos: ali.faltas_pontos,
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

//   const a  = tryFunc(async () => {
//        return await prisma.partida.update({
//       where: {
//         id: Number(match_id),
//       },
//       data: {
//         vencedor: vencedor,
//         status: "completada",
//       },
//     });
//   })
// }
