export type Cor = "azul" | "vermelho";

export type Alianca = {
  color: Cor;
  time1: number;
  time2: number;
  partida_id: number | null;
  idade_media: number;
  estacionar: number;
  pre_historico: number;
  pre_historico_au: number;
  idade_media_au: number;
  poco_au: number;
  poco_endgame: number;
  sitio: number;
  sair: number;
  auto_pontos: number;
  teleop_pontos: number;
  faltas_pontos: number;
  rp_auto: number;
  rp_estacionar: number;
  falta_branca: number;
  falta_prh: number;
  falta_transp: number;
  falta_estacionar: number;
};

export type ALiancaParcial = Pick<Alianca, "color" | "time1" | "time2">;
