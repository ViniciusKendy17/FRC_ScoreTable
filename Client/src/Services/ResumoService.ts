import type { elements, Score } from "../utils/ScoreTable";
import type { FinalPontos } from "../utils/Types";

export function inflateScoresFromFinal(
  finalPontos: FinalPontos,
  elementss: typeof elements
) {
  // inicializa estrutura com zeros
  const base = elementss.map((el) => ({
    id: Number(el.id),
    auto: 0,
    teleop: 0,
    endgame: 0,
    idade_media: 0,
    pre_historico: 0,
    saida: 0,
    estacionar_poco: 0,
    falta_branca: 0,
    falta_estacionar: 0,
    falta_prh: 0,
    falta_transp: 0,
  }));

  // copia mutável dos pontos que ainda precisamos atribuir
  let remaining = {
    auto: finalPontos.auto_pontos ?? 0,
    teleop: finalPontos.teleop_pontos ?? 0,
    estacionar_endgame: finalPontos.estacionar ?? 0, // pontos de endgame + poco + au_estacionar já agregados
    saida: finalPontos.sair ?? 0, // pontos vindos de saida
    falta_branca: finalPontos.falta_branca ?? 0,
    falta_estacionar: finalPontos.falta_estacionar ?? 0,
    falta_prh: finalPontos.falta_prh ?? 0,
    falta_transp: finalPontos.falta_transp ?? 0,
    pre_historico: finalPontos.pre_historico ?? 0,
    idade_media: finalPontos.idade_media ?? 0,
    poco_au: finalPontos.poco_au ?? 0,
    poco_endgame: finalPontos.poco_endgame ?? 0,
  };

  // função utilitária: aloca pontos de um "tipo" por elemento, devolvendo quantidade inteira
  const allocateGreedy = (
    fieldName: keyof Score, // ex: 'saida' ou 'endgame' (usamos endgame para estacionar)
    pointKey: string, // qual propriedade de el.pontos usamos, ex: 'sair' ou 'estacionar'
    remainingKey: keyof typeof remaining,
    allowFractional = false
  ) => {
    // lista de elements com o valor por unidade para este tipo (somente se ponto definido)
    const candidates = elementss
      .map((el, idx) => ({
        el,
        idx,
        value: el.pontos ? (el.pontos as any)[pointKey] ?? 0 : 0,
      }))
      .filter((c) => c.value > 0)
      // ordenar por valor unitário descendente -> preferir preencher com elementos que dão mais pontos/unidade
      .sort((a, b) => b.value - a.value);

    let remPoints = remaining[remainingKey] as number;

    for (const candidate of candidates) {
      if (remPoints <= 0) break;
      const ptsPerUnit = candidate.value;
      const maxUnits = Math.floor(remPoints / ptsPerUnit);

      if (maxUnits <= 0) continue;

      // atualiza a base (quantidade para o elemento)
      (base[candidate.idx] as any)[fieldName] += maxUnits;

      // consome pontos remanescentes
      remPoints -= maxUnits * ptsPerUnit;
    }

    // se sobrar uma pequena sobra e permitir fração (raro), tenta alocar 1 unidade no menor unitário que cabe
    if (remPoints > 0 && allowFractional) {
      const candidate = candidates[candidates.length - 1];
      if (candidate) {
        (base[candidate.idx] as any)[fieldName] += 1;
        remPoints = 0;
      }
    }

    remaining[remainingKey] = remPoints;
  };

  // 1) AUTONOMO: vários campos podem contribuir (au_idade_media, au_pre_historico, au_estacionar)
  //   Vamos decompor auto_pontos por sub-tipos se possível: usamos ponto por unidade de au_idade_media + au_pre_historico + au_estacionar
  // Para simplificar, alocamos "auto" usando a soma de pontos auto por elemento:
  (function allocateAuto() {
    // calc valor auto por unidade para cada element (soma dos campos au_*)
    const candidates = elementss
      .map((el, idx) => {
        const v =
          (el.pontos?.au_idade_media ?? 0) +
          (el.pontos?.au_pre_historico ?? 0) +
          (el.pontos?.au_estacionar ?? 0);
        return { el, idx, v };
      })
      .filter((c) => c.v > 0)
      .sort((a, b) => b.v - a.v);

    let rem = remaining.auto;
    for (const c of candidates) {
      if (rem <= 0) break;
      const per = c.v;
      const units = Math.floor(rem / per);
      if (units <= 0) continue;
      base[c.idx].auto += units;
      rem -= units * per;
    }
    remaining.auto = rem;
  })();

  // 2) TELEOP
  (function allocateTeleop() {
    const candidates = elementss
      .map((el, idx) => {
        const v =
          (el.pontos?.op_idade_media ?? 0) + (el.pontos?.op_pre_historico ?? 0);
        return { el, idx, v };
      })
      .filter((c) => c.v > 0)
      .sort((a, b) => b.v - a.v);

    let rem = remaining.teleop;
    for (const c of candidates) {
      if (rem <= 0) break;
      const per = c.v;
      const units = Math.floor(rem / per);
      if (units <= 0) continue;
      base[c.idx].teleop += units;
      rem -= units * per;
    }
    remaining.teleop = rem;
  })();

  // 3) SAIDA (sair)
  allocateGreedy("saida", "sair", "saida");

  // 4) ENDGAME / ESTACIONAR: aqui temos 3 fontes:
  //   - endgame * el.pontos.estacionar
  //   - estacionar_poco * el.pontos.estacionar_poco
  //   - au_estacionar já foi somado em auto (se usarmos au_estacionar)
  // Primeiro alocamos estacionar_poco (ponto por unidade explicit)
  allocateGreedy("estacionar_poco", "estacionar_poco", "poco_endgame");
  // Depois alocamos endgame (estacionar)
  allocateGreedy("endgame", "estacionar", "estacionar_endgame");

  // 5) FALTAS — cada tipo de falta tem seu próprio peso; alocamos separadamente
  allocateGreedy("falta_branca", "falta_branca", "falta_branca");
  allocateGreedy("falta_estacionar", "falta_estacionar", "falta_estacionar");
  allocateGreedy("falta_prh", "falta_prh", "falta_prh");
  allocateGreedy("falta_transp", "falta_transp", "falta_transp");

  // Observação: se sobrar 'remaining' > 0 para algum campo, significa que não conseguimos decompor perfeitamente.
  // Pode-se logar para debugging.
  // retornar base
  return base;
}
