import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { Aliança, Cor } from "../../utils/Types";
import { PartidaService } from "../../Services/PartidaService";
import "../../styles/PontuacaoCard.css";
import "../../styles/Pontuacao.css";
import Header from "../../Components/Header";
import "../../styles/HomeJudge.css";
import { elements, type Pontos, type Score } from "../../utils/ScoreTable";
import ScoreCard from "../../Components/ScoreSection";
import { toast, ToastContainer } from "react-toastify";
import { toast_pro } from "../../utils/Util";
import { inflateScoresFromFinal } from "../../Services/ResumoService";

export default function Pontuacao() {
  const { id } = useParams();
  const [sc, SetSc] = useState<any>(null);
  const [aliancas, SetAliancas] = useState<Aliança[] | null>([]);
  const [publicScores, setPublicScores] = useState({ vermelho: 0, azul: 0 });

  const [scores, setScores] = useState<{
    vermelho: Score[];
    azul: Score[];
  }>({
    vermelho: elements.map((el) => ({
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
    })),
    azul: elements.map((el) => ({
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
    })),
  });

  // Calcula o total de uma aliança
  function calcTotal(aliancaScores: Score[]) {
    return aliancaScores.reduce((acc, s) => {
      const el = elements.find((e) => Number(e.id) === s.id);
      if (!el || !el.pontos) return acc;

      const autoPoints =
        s.auto *
        ((el.pontos.au_idade_media ?? 0) +
          (el.pontos.au_pre_historico ?? 0) +
          (el.pontos.au_estacionar ?? 0));

      const teleopPoints =
        s.teleop *
        ((el.pontos.op_idade_media ?? 0) + (el.pontos.op_pre_historico ?? 0));

      const estacionar_poco =
        s.estacionar_poco * (el.pontos.estacionar_poco ?? 0);

      const endgamePoints =
        s.endgame * (el.pontos.estacionar ?? 0) + estacionar_poco;
      const saidaPoints = s.saida * (el.pontos.sair ?? 0);

      return acc + autoPoints + teleopPoints + endgamePoints + saidaPoints;
    }, 0);
  }

  // Atualiza a pontuação de um elemento
  const updateScore = (
    alianca: "vermelho" | "azul",
    id: number,
    field: keyof Score,
    value: number
  ) => {
    setScores((prev) => {
      const updated = {
        ...prev,
        [alianca]: prev[alianca].map((s) =>
          s.id === id ? { ...s, [field]: value } : s
        ),
      };

      const totalVermelho = calcTotal(updated.vermelho);
      const totalAzul = calcTotal(updated.azul);

      setPublicScores({ vermelho: totalVermelho, azul: totalAzul });

      return updated;
    });
  };

  const GetFinalScore = (
    cor: Cor,
    pontos: typeof scores,
    elementos: typeof elements
  ): Pontos => {
    const final_score: Pontos = {
      color: cor,
      teleop_pontos: 0,
      auto_pontos: 0,
      faltas_pontos: 0,
      idade_media: 0,
      pre_historico: 0,
      pre_historico_au: 0,
      idade_media_au: 0,
      poco_au: 0,
      poco_endgame: 0,
      sitio: 0,
      estacionar: 0,
      sair: 0,
      rp_estacionar: 0,
      rp_auto: 0,
      falta_branca: 0,
      falta_prh: 0,
      falta_transp: 0,
      falta_estacionar: 0,
    };

    pontos[cor].forEach((sc) => {
      const el = elementos.find((e) => Number(e.id) === sc.id);
      if (!el || !el.pontos) return;
      const idade_media_au = sc.auto * (el.pontos.au_idade_media ?? 0);
      const idade_media_teleop = sc.teleop * (el.pontos.op_idade_media ?? 0);

      const pre_au = sc.auto * (el.pontos.au_pre_historico ?? 0);
      const pre_teleop = sc.teleop * (el.pontos.op_pre_historico ?? 0);

      const au_estacionar = sc.auto * (el.pontos.au_estacionar ?? 0);

      //Autonomo
      final_score.auto_pontos +=
        sc.auto *
        ((el.pontos.au_idade_media ?? 0) + (el.pontos.au_pre_historico ?? 0));

      //Teleoperado
      final_score.teleop_pontos +=
        sc.teleop *
        ((el.pontos.op_idade_media ?? 0) + (el.pontos.op_pre_historico ?? 0));

      //Estacionar poco + calculo de RP
      const estacionar_poco =
        sc.estacionar_poco * (el.pontos.estacionar_poco ?? 0);
      if (estacionar_poco >= 6) {
        final_score.rp_estacionar = 1;
      }

      final_score.estacionar +=
        sc.endgame * (el.pontos.estacionar ?? 0) +
        estacionar_poco +
        au_estacionar;

      //Sair no autonomo
      final_score.sair += sc.saida * (el.pontos.sair ?? 0);

      //Sitio
      final_score.sitio += sc.endgame * (el.pontos.estacionar ?? 0);

      //Poco estacionar autonomo
      final_score.poco_au += au_estacionar;

      //Poco endgame
      final_score.poco_endgame +=
        sc.estacionar_poco * (el.pontos.estacionar_poco ?? 0);

      //Faltas
      final_score.falta_branca +=
        sc.falta_branca * (el.pontos.falta_branca ?? 0);
      final_score.falta_estacionar +=
        sc.falta_estacionar * (el.pontos.falta_estacionar ?? 0);
      final_score.falta_prh += sc.falta_prh * (el.pontos.falta_prh ?? 0);
      final_score.falta_transp +=
        sc.falta_transp * (el.pontos.falta_transp ?? 0);

      final_score.faltas_pontos +=
        sc.falta_branca * (el.pontos.falta_branca ?? 0) +
        sc.falta_estacionar * (el.pontos.falta_estacionar ?? 0) +
        sc.falta_prh * (el.pontos.falta_prh ?? 0) +
        sc.falta_transp * (el.pontos.falta_transp ?? 0);

      // Total idade media teleop e autonomo
      final_score.idade_media += idade_media_teleop;
      final_score.idade_media_au += idade_media_au;

      //Total pre historico teleop e autonomo
      final_score.pre_historico += pre_teleop;
      final_score.pre_historico_au += pre_au;

      final_score.rp_auto = final_score.auto_pontos > 3 ? 1 : 0;
    });

    return final_score;
  };

  async function EndJudgeMatch() {
    const data = await PartidaService.EndJudgeMatch(Number(id), {
      vermelho: GetFinalScore("vermelho", scores, elements),
      azul: GetFinalScore("azul", scores, elements),
    });

    if (!data) {
      toast.error("Erro no servidor, tente novamente", toast_pro);
      return;
    }

    toast.success("Pontuação final enviada com sucesso!");
  }

  async function DefineAlliences() {
    const data = await PartidaService.GetAlliencesByMatch(Number(id));

    if (!data) return;
    SetAliancas(data);

    // para cada aliança retornada, converte os pontos finais para score[] com inflateScoresFromFinal
    const azulFinal = data.find((a: any) => a.color === "azul");
    const verFinal = data.find((a: any) => a.color === "vermelho");

    const inicialAzul = azulFinal
      ? inflateScoresFromFinal(azulFinal, elements)
      : elements.map((el) => ({
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
    const inicialVermelho = verFinal
      ? inflateScoresFromFinal(verFinal, elements)
      : elements.map((el) => ({
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

    setScores({ azul: inicialAzul, vermelho: inicialVermelho });

    // recalcula totais (segura)
    const totalAz = calcTotal(inicialAzul);
    const totalVerm = calcTotal(inicialVermelho);
    setPublicScores({ azul: totalAz, vermelho: totalVerm });
  }

  useEffect(() => {
    DefineAlliences();
  }, []);

  console.log(aliancas);

  return (
    <>
      <div id="back">
        <ToastContainer />
        <Header
          showpesquisa={false}
          id_partida={Number(id)}
          pesquisa=""
          SetPesquisa=""
          title={""}
        />

        <main id="main-score2">
          {(["vermelho", "azul"] as Cor[]).map((cor) => {
            const selected_alianca = aliancas?.find((a) => a.color === cor);
            return (
              <div
                key={cor}
                className="box-score"
                style={{
                  backgroundColor: cor === "azul" ? "#0b90d3" : "#ff002b",
                }}
              >
                <div id="out-times">
                  <div id="times">
                    <p>Equipes:</p>
                    <p>{selected_alianca?.time1}</p>
                    <p>{selected_alianca?.time2}</p>
                  </div>

                  <div style={{ fontWeight: "bold", color: "#fff" }}>
                    Total da aliança {cor}: {publicScores[cor]} pts
                  </div>
                </div>

                <section id="box-cards">
                  {elements.map((el) => {
                    const score = scores[cor].find((s) => s.id === el.id);
                    if (!score) return null;
                    return (
                      <ScoreCard
                        key={el.id}
                        element={el}
                        score={score}
                        onChange={(field, value) =>
                          updateScore(cor, Number(el.id), field, value)
                        }
                      />
                    );
                  })}
                </section>
              </div>
            );
          })}

          <button
            id="finish"
            type="button"
            onClick={() => EndJudgeMatch()}
            style={{
              backgroundColor: "#2e2e2e",
              color: "#fff",
              marginTop: "20px",
            }}
          >
            Finalizar Pontuação da Partida
          </button>
        </main>
      </div>
    </>
  );
}
