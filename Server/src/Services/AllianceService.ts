import { Request, Response } from "express";
import { Alianca, Cor } from "../Models/Alianca";
import { PrismaClient } from "../generated/prisma";
import { hasValues, prisma } from "./GenericServices";
import { Vencedor } from "../Models/Partida";

export async function NewAliance(alianca: Alianca, match_id: number) {
  const equipes = await prisma.equipe.findMany({
    where: {
      OR: [{ numero_equipe: alianca.time1 }, { numero_equipe: alianca.time2 }],
    },
  });

  const equipe1 = equipes.find(
    (e: { numero_equipe: number }) => e.numero_equipe === alianca.time1
  );
  const equipe2 = equipes.find(
    (e: { numero_equipe: number }) => e.numero_equipe === alianca.time2
  );

  await prisma.alianca.create({
    data: {
      color: alianca.color,
      time1: equipe1?.numero_equipe,
      time2: equipe2?.numero_equipe,
      idade_media: 0,
      pre_historico: 0,
      estacionar: 0,
      sair: 0,
      idade_media_au: 0,
      pre_historico_au: 0,
      poco_au: 0,
      poco_endgame: 0,
      sitio: 0,
      auto_pontos: 0,
      teleop_pontos: 0,
      faltas_pontos: 0,
      total_pontos: 0,
      total_rp: 0,
      falta_branca: 0,
      falta_estacionar: 0,
      falta_prh: 0,
      falta_transp: 0,
      falta_grave: 0,
      falta_leve: 0,
      partida_id: match_id,
    },
  });
}

/**
 * @description Calcula o total de pontos de uma aliança, podendo ter ou não pontos de falta
 * @param ali
 * @param falta
 * @returns
 */
export function CalcularTotal(ali: Alianca, ali_adv: Alianca, falta: boolean) {
  const faltas_total = falta ? CalcularFaltasTotal(ali_adv) : 0;

  console.log(ali);

  return (
    ali.sair +
    ali.estacionar +
    faltas_total +
    ali.auto_pontos +
    ali.teleop_pontos
  );
}

export function CalcularFaltasTotal(ali: Alianca) {
  return (
    ali.falta_branca +
    ali.falta_estacionar +
    ali.falta_prh +
    ali.falta_transp +
    ali.falta_leve +
    ali.falta_grave
  );
}

export function CalcularRP(ali: Alianca, vencedor: Vencedor) {
  let rp_vencedor = 0;

  if (vencedor === "empate") {
    rp_vencedor = 1;
  } else if (vencedor === ali.color) {
    rp_vencedor = 3;
  } else {
    rp_vencedor = 0;
  }

  return ali.rp_estacionar + ali.rp_auto + rp_vencedor;
}
