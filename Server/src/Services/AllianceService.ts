import { Request, Response } from "express";
import { Alianca, Cor } from "../Models/Alianca";
import { PrismaClient } from "../generated/prisma";
import { hasValues, prisma } from "./GenericServices";

export async function NewAliance(alianca: Alianca) {
  // if (!hasValues(alianca)) {
  //   return { msg: "Preencha todos os valores" };
  // }

  const equipes = await prisma.equipe.findMany({
    where: {
      OR: [
        { numero_equipe: alianca.time1 },
        { numero_equipe: alianca.time2 },
        { numero_equipe: alianca.time3 },
      ],
    },
  });

  const equipe1 = equipes.find((e) => e.numero_equipe === alianca.time1);
  const equipe2 = equipes.find((e) => e.numero_equipe === alianca.time2);
  const equipe3 = equipes.find((e) => e.numero_equipe === alianca.time3);

  const total_pontos =
    alianca.auto_pontos + alianca.teleop_pontos + alianca.faltas_pontos;

  const new_alianca = await prisma.alianca.create({
    data: {
      color: alianca.color,
      time1: equipe1?.numero_equipe,
      time2: equipe2?.numero_equipe,
      time3: equipe3?.numero_equipe,
      auto_pontos: 0,
      teleop_pontos: 0,
      faltas_pontos: 0,
      total_pontos: total_pontos,
      total_rp: 0,
    },
  });

  return new_alianca.id;
}
