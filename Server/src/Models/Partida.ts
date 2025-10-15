import {
  partida_status,
  partida_tipo_partida,
  partida_vencedor,
} from "../generated/prisma";

export interface Partida {
  tipo_partida: partida_tipo_partida;
  numero_partida: number;
  azul_pontos: number;
  vermelho_pontos: number;
  status: partida_status;
  vencedor: partida_vencedor;
  horario: string;
}

export enum Tipo_partida {
  treino = "treino",
  qualificatorias = "qualificatorias",
  eliminatorias = "eliminatorias",
}

export enum Status {
  agendada = "agendada",
  em_progresso = "em_progresso",
  finalizada = "finalizada",
}

export type Vencedor = "azul" | "vermelho" | "empate" | "no";
