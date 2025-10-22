import { Request, Response } from "express";
import { Alianca, Cor } from "../Models/Alianca";
import { PrismaClient } from "../generated/prisma";
import { hasValues, prisma } from "./GenericServices";

export async function NewAliance(alianca: Alianca, match_id: number) {
  const equipes = await prisma.equipe.findMany({
    where: {
      OR: [
        { numero_equipe: alianca.time1 },
        { numero_equipe: alianca.time2 },
      ],
    },
  });

  const equipe1 = equipes.find((e: { numero_equipe: number; }) => e.numero_equipe === alianca.time1);
  const equipe2 = equipes.find((e: { numero_equipe: number; }) => e.numero_equipe === alianca.time2);

  await prisma.alianca.create({
    data: {
      color: alianca.color,
      time1: equipe1?.numero_equipe,
      time2: equipe2?.numero_equipe,
      idade_media: 0,
      pre_historico: 0,
      estacionar: 0,
      sair: 0,
      auto_pontos: 0,
      teleop_pontos: 0,
      faltas_pontos: 0,
      total_pontos: 0,
      total_rp: 0,
      partida_id: match_id,
    },
  });
}

export function CalcularTotal(ali: Alianca) {
  return (
    ali.sair +
    ali.estacionar +
    ali.faltas_pontos +
    ali.auto_pontos +
    ali.teleop_pontos
  );
}

export function CalcularRP(ali: Alianca, vencedor: string) {
  const rp_final = vencedor != "empate" ? 3 : vencedor == "empate" ? 1 : 0;

  return ali.rp_estacionar + ali.rp_auto + rp_final;
}
