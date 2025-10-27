import { Request, Response } from "express";
import { Equipe } from "../Models/Equipe";
import { Prisma, PrismaClient } from "../generated/prisma";
import { prisma } from "../Services/GenericServices";

export async function GetTeams(req: Request, res: Response) {
  const equipes = await prisma.equipe.findMany();

  if (!equipes) {
    return res.status(404).json({ msg: "Sem nenhuma equipe disponivel" });
  }

  return res
    .status(200)
    .json({ msg: "Equipes encontradas com sucesso", equipes: equipes });
}

export async function GetTeamsFromMatch(req: Request, res: Response) {
  const match_id = req.params.match_id;

  if (!match_id) {
    return res.status(404).json({ msg: "Partida não encontrada" });
  }

  const times = await prisma.alianca.findMany({
    where: {
      partida_id: Number(match_id),
    },
    select: {
      color: true,
      time1: true,
      time2: true,

    },
  });

  return res.status(200).json({ teams: times });
}

export async function GetRanking(req: Request, res: Response) {
  const ranking = await prisma.ranking_view.findMany();

  const safeRanking = ranking.map((r) => {
    const obj: any = {};
    for (const [key, value] of Object.entries(r)) {
      obj[key] = typeof value === "bigint" ? Number(value) : value;
    }
    return obj;
  });

  return res.status(200).json({
    msg: "Ranking atualizado com sucesso",
    ranking: safeRanking,
  });
}
