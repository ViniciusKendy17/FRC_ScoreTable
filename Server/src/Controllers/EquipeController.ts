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

export async function GetRanking(req:Request, res: Response) {
  const ranking = await prisma.ranking_view.findMany();
  return res.status(200).json({ msg: "Ranking atualizado com sucesso", ranking: ranking });
}
