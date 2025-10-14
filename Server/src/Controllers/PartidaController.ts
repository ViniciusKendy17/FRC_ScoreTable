import { Request, Response } from "express";
import { partida_tipo_partida, PrismaClient } from "../generated/prisma";
import { Partida } from "../Models/Partida";
import { Alianca } from "../Models/Alianca";
import { NewAliance } from "../Services/AllianceService";
import { prisma } from "../Services/GenericServices";

export async function GetAllMatches(res: Response) {
  const matches = await prisma.partida.findMany();
  if (!matches) {
    return res.status(404).json({ msg: "Sem partidas disponiveis" });
  }

  return res.status(200).json(matches);
}

export async function NewMatch(req: Request, res: Response) {
  const match: Partida = req.body.match;
  const aliancas: Alianca[] = req.body.aliancas;

  try {
    const new_match = await prisma.partida.create({
      data: {
        ...match,
        alianca_azul: null,
        alianca_vermelha: null,
      },
    });

    const alliences_id = [];

    for (const alianca of aliancas) {
      alliences_id.push(await NewAliance(alianca));
    }

    const [ali_id1, ali_id2] = alliences_id;

    await prisma.partida.update({
      where: {
        id: new_match.id,
      },
      data: {
        alianca_azul: ali_id1,
        alianca_vermelha: ali_id2,
      },
    });

    return res.status(201).json({ msg: "Partida criada com sucesso" });
  } catch (error) {
    return res.status(500).json("Erro interno no servidor ou banco");
  }
}

export function EditMatch() {}

export function DeleteMatch() {}

export function EndMatch(req: Request, res: Response) {}
