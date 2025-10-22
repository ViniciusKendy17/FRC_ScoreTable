
export type Cor = "azul" | "vermelho";

export type Alianca = {
  color: Cor;
  time1: number;
  time2: number;
  partida_id: number | null;
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

export type ALiancaParcial = Pick<Alianca, "color" | "time1" | "time2" >;
