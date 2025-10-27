import type { elements, Score } from "../utils/ScoreTable";
import type { FinalPontos } from "../utils/Types";

export function inflateScoresFromFinal(
  finalPontos: FinalPontos,
  elementss: typeof elements
): Score[] {
  return elementss.map((el) => {
    const pts = el.pontos ?? {};
    return {
      id: Number(el.id),
      auto: Math.floor((finalPontos.auto_pontos ?? 0) / ((pts.au_idade_media ?? 0) + (pts.au_pre_historico ?? 0) || 1)),
      teleop: Math.floor((finalPontos.teleop_pontos ?? 0) / ((pts.op_idade_media ?? 0) + (pts.op_pre_historico ?? 0) || 1)),
      endgame: Math.floor((finalPontos.estacionar ?? 0) / (pts.estacionar ?? 1)),
      idade_media: 0,
      pre_historico: 0,
      saida: Math.floor((finalPontos.sair ?? 0) / (pts.sair ?? 1)),
      estacionar_poco: Math.floor((finalPontos.poco_endgame ?? 0) / (pts.estacionar_poco ?? 1)),
      estacionar_poco_au: Math.floor((finalPontos.poco_au ?? 0) / (pts.au_estacionar ?? 1)),
      sitio: Math.floor((finalPontos.sitio ?? 0) / (pts.estacionar ?? 1)),
      falta_branca: Math.floor((finalPontos.falta_branca ?? 0) / (pts.falta_branca ?? 1)),
      falta_estacionar: Math.floor((finalPontos.falta_estacionar ?? 0) / (pts.falta_estacionar ?? 1)),
      falta_prh: Math.floor((finalPontos.falta_prh ?? 0) / (pts.falta_prh ?? 1)),
      falta_transp: Math.floor((finalPontos.falta_transp ?? 0) / (pts.falta_transp ?? 1)),
      au_idade_media: Math.floor((finalPontos.idade_media_au ?? 0) / (pts.au_idade_media ?? 1)),
      op_idade_media: Math.floor((finalPontos.idade_media ?? 0) / (pts.op_idade_media ?? 1)),
      op_pre_historico: Math.floor((finalPontos.pre_historico ?? 0) / (pts.op_pre_historico ?? 1)),
      au_pre_historico: Math.floor((finalPontos.pre_historico_au ?? 0) / (pts.au_pre_historico ?? 1)),
    };
  });
}
