import type { Aliança } from "./Types";

export type Pontos = Omit<Aliança, "time1" | "time2" | "time3">;

export type PartialPontos = Partial<Aliança>;

export type Score = {
  id: number;
  auto: number;
  teleop: number;
  endgame: number;
  idade_media:number,
  pre_historico:number
};

export type GameElement = {
  id: number;
  nome: string;
  pontos: PartialPontos;
  cor?: string;
};

export const elements: GameElement[] = [
  {
    id: 1,
    nome: "ARTEFATOS DA IDADE MÉDIA",
    pontos: { auto_pontos: 5, teleop_pontos: 2 },
  },
  {
    id: 2,
    nome: "ARTEFATOS PRÉ-HISTÓRICOS",
    pontos: { auto_pontos: 10, teleop_pontos: 5 },
  },
  {
    id: 3,
    nome: "POÇO DE ESCAVAÇÃO",
    pontos: { auto_pontos: 3, estacionar: 2 },
  },
  {
    id: 4,
    nome: "SÍTIO ARQUEOLÓGICO",
    pontos: { estacionar: 1 },
  },
  {
    id: 5,
    nome: "SAÍDA",
    pontos: { auto_pontos: 1 },
  },
];
