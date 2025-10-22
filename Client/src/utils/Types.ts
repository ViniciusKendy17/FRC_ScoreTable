export type Partida = {
  id: number;
  numero_partida: number;
  tipo_partida: Tipo_Partida;
  status: Status;
  azul_pontos: number;
  vermelho_pontos: number;
  vencedor: Vencedor;
  horario: string;
};

export type Aliança = {
  color: Cor;
  time1: number;
  time2: number;
  idade_media: number;
  estacionar: number;
  pre_historico: number;
  sair: number;
  auto_pontos: number;
  teleop_pontos: number;
  faltas_pontos: number;
  rp_auto: number;
  rp_estacionar: number;
};

export type AliancaParcial = Omit<
  Aliança,
  | "idade_media"
  | "estacionar"
  | "pre_historico"
  | "sair"
  | "auto_pontos"
  | "teleop_pontos"
  | "faltas_pontos"
  | "rp_auto"
  | "rp_estacionar"
>;

export type Equipe = {
  numero_equipe: number;
  nome: string;
};

export type Toast = {
  message: string;
};

export type Cor = "azul" | "vermelho";

type Tipo_Partida = "qualificatorias" | "eliminatorias" | "treino";

type Status = "agendada" | "em_progresso" | "finalizada";

type Vencedor = "azul" | "vermelho" | "empate" | "no";

//Game Score
