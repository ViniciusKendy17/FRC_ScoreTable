import type { Aliança } from "./Types";

export type Pontos = Omit<Aliança, "time1" | "time2">;

export type elements =
  | "auto"
  | "teleop"
  | "endgame"
  | "idade_media"
  | "pre_historico"
  | "saida"
  | "estacionar_poco"
  | "estacionar_poco_au"
  | "falta_branca"
  | "falta_prh"
  | "falta_transp"
  | "falta_estacionar"
  | "au_idade_media"
  | "op_idade_media"
  | "op_pre_historico"
  | "au_pre_historico"
  | "sitio";

export type ValoresPontos = {
  au_idade_media: number;
  op_idade_media: number;
  op_pre_historico: number;
  au_pre_historico: number;
  estacionar: number;
  estacionar_poco: number;
  au_estacionar: number;
  sair: number;
  falta_branca: number;
  falta_prh: number;
  falta_transp: number;
  falta_estacionar: number;
};

type PartialPontos = Partial<ValoresPontos>;

export type PartialScore = Omit<Score, "idade_media" | "pre_historico">;

export type Score = {
  id: number;
  auto: number;
  teleop: number;
  endgame: number;
  idade_media: number;
  pre_historico: number;
  saida: number;
  estacionar_poco: number;
  estacionar_poco_au: number;
  sitio: number;
  falta_branca: number;
  falta_estacionar: number;
  falta_prh: number;
  falta_transp: number;
  au_idade_media: number;
  op_idade_media: number;
  op_pre_historico: number;
  au_pre_historico: number;
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
  {
    id: 6,
    nome: "FALTA - IMPEDIR PONTUAÇÃO",
    pontos: { falta_branca: 2 },
  },
  {
    id: 7,
    nome: "FALTA - JOGAR ARTEFATO",
    pontos: { falta_prh: 6 },
  },
  {
    id: 8,
    nome: "FALTA - 2 ELEMENTOS DE JOGO",
    pontos: { falta_transp: 2 },
  },
  {
    id: 9,
    nome: "FALTA - ESTACIONAR METADE DO  POÇO ",
    pontos: { falta_estacionar: 6 },
  },
];
