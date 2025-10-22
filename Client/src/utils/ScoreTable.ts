import type { Aliança } from "./Types";

export type Pontos = Omit<Aliança, "time1" | "time2" >;

export type ValoresPontos = {
  au_idade_media: number;
  op_idade_media: number;
  op_pre_historico: number;
  au_pre_historico: number;
  estacionar: number;
  estacionar_poco: number;
  au_estacionar: number;
  sair: number;
};

type PartialPontos = Partial<ValoresPontos>;

export type Score = {
  id: number;
  auto: number;
  teleop: number;
  endgame: number;
  idade_media: number;
  pre_historico: number;
  saida: number;
  estacionar_poco: number;
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
    pontos: { au_idade_media: 5, op_idade_media: 2 },
  },
  {
    id: 2,
    nome: "ARTEFATOS PRÉ-HISTÓRICOS",
    pontos: { au_pre_historico: 10, op_pre_historico: 5 },
  },
  {
    id: 3,
    nome: "POÇO DE ESCAVAÇÃO",
    pontos: { au_estacionar: 3, estacionar_poco: 2 },
  },
  {
    id: 4,
    nome: "SÍTIO ARQUEOLÓGICO",
    pontos: { estacionar: 1 },
  },
  {
    id: 5,
    nome: "SAÍDA",
    pontos: { sair: 1 },
  },
];
