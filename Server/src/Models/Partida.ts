import {
  partida_status,
  partida_tipo_partida,
  partida_vencedor,
} from "../generated/prisma";

export type Partida = {
  tipo_partida: partida_tipo_partida;
  numero_partida: number;
  azul_pontos: number;
  vermelho_pontos: number;
  status: partida_status;
  vencedor: partida_vencedor;
  horario: string;
};


export type PartidaParcial = Partial<Partida>;

// type MiniPatida = Pick<Partida, "status" | "tipo_partida">;

type PartidaRecord = Record<string, PartidaParcial>;

// const part: PartidaRecord = {
//   partida1: { azul_pontos: 1 },
// };

// type User = {
//   usename: string;
//   password: string;
// };

// type UserDto = Omit<User, "password">;

export type Tipo_partida = "treino" | "qualificatorias" | "eliminatorias";

export type Status = "agendada" | "em_progresso" | "finalizada";

export type Vencedor = "azul" | "vermelho" | "empate" | "no";
