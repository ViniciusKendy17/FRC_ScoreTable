import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { Aliança, Cor } from "../../utils/Types";
import { PartidaService } from "../../Services/PartidaService";
import "../../styles/Pontuacao.css";
import Header from "../../Components/Header";
import "../../styles/HomeJudge.css";
import { elements, type Pontos, type Score } from "../../utils/ScoreTable";
import ScoreCard from "../../Components/ScoreSection";
import { toast, ToastContainer } from "react-toastify";
import { toast_pro } from "../../utils/Util";
import { io } from "socket.io-client";

export default function Pontuacao() {
  const { id } = useParams();
  const [sc, SetSc] = useState<any>(null);

  const [aliancas, SetAliancas] = useState<Aliança[] | null>([]);
  const [alianca, setAlianca] = useState<"vermelho" | "azul">("vermelho");
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

  useEffect(() => {
    const socket = io("http://192.168.0.101:3001", {
      transports: ["websocket", "polling"],
    });
    SetSc(socket);

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket!", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
  const updateScore = (id: number, field: elements, value: number) => {
    setScores((prev) => {
      const updated = {
        ...prev,
        [alianca]: prev[alianca].map((s) =>
          s.id === id ? { ...s, [field]: value } : s
        ),
      };

      // recalcula os totais
      const totalVermelho = calcTotal(updated.vermelho);
      const totalAzul = calcTotal(updated.azul);

      // envia pelo WebSocket

      // atualiza localmente
      setPublicScores({ vermelho: totalVermelho, azul: totalAzul });

      sc.emit("update_alliance_score", {
        alliance: alianca,
        total: alianca == "azul" ? totalAzul : totalVermelho,
        scores: alianca == "azul" ? scores.azul : scores.vermelho,
      });

      return updated;
    });
  };

  async function EndJudgeMatch() {
    const data = await PartidaService.EndJudgeMatch(Number(id), jsonAPI);

    if (!data) {
      toast.error("Erro no servidor, tente novamente", toast_pro);
      return;
    }

    toast.success("Partida foi parcialmente finalizada com sucesso");
  }

  const selected_alianca = aliancas?.find((ali) => ali.color == alianca);

  function GetFinalScore(
    cor: Cor,
    pontos: typeof scores,
    elementos: typeof elements
  ) {
    const final_score: Pontos = {
      color: cor,
      teleop_pontos: 0,
      auto_pontos: 0,
      faltas_pontos: 0,
      idade_media: 0,
      pre_historico: 0,
      estacionar: 0,
      sair: 0,
      rp_estacionar: 0,
      rp_auto: 0,
    };

    pontos[cor].forEach((sc) => {
      const el = elementos.find((e) => Number(e.id) === sc.id);
      if (!el || !el.pontos) return;

      final_score.auto_pontos +=
        sc.auto *
        ((el.pontos.au_idade_media ?? 0) +
          (el.pontos.au_pre_historico ?? 0) +
          (el.pontos.au_estacionar ?? 0));

      final_score.teleop_pontos +=
        sc.teleop *
        ((el.pontos.op_idade_media ?? 0) + (el.pontos.op_pre_historico ?? 0));

      const estacionar_poco =
        sc.estacionar_poco * (el.pontos.estacionar_poco ?? 0);

      final_score.estacionar +=
        sc.endgame * (el.pontos.estacionar ?? 0) + estacionar_poco;

      if (sc.estacionar_poco * (el.pontos.estacionar_poco ?? 0) >= 6) {
        final_score.rp_estacionar = 1;
      }

      final_score.sair += sc.saida * (el.pontos.sair ?? 0);

      final_score.faltas_pontos +=
        sc.falta_branca * (el.pontos.falta_branca ?? 0) +
        sc.falta_estacionar * (el.pontos.falta_estacionar ?? 0) +
        sc.falta_prh * (el.pontos.falta_prh ?? 0) +
        sc.falta_transp * (el.pontos.falta_transp ?? 0);

      final_score.idade_media +=
        sc.auto * (el.pontos.au_idade_media ?? 0) +
        sc.teleop * (el.pontos.op_idade_media ?? 0);

      final_score.pre_historico +=
        sc.auto * (el.pontos.au_pre_historico ?? 0) +
        sc.teleop * (el.pontos.op_pre_historico ?? 0);

      final_score.rp_auto = final_score.auto_pontos > 3 ? 1 : 0;
    });

    return final_score;
  }

  const jsonAPI = useMemo(() => {
    return { alianca: GetFinalScore(alianca, scores, elements) };
  }, [alianca, scores, elements]);

  async function DefineAlliences() {
    const data = await PartidaService.GetAlliencesByMatch(Number(id));
    SetAliancas(data);
  }


  useEffect(() => {
    DefineAlliences();
  }, []);

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

        <main id="main-score">
          <div className="alianca-container">
            <div className="alianca-content">
              <label className="titulo">ALIANÇA</label>
              <div className="linha" />
              <div className="opcoes">
                {["vermelho", "azul"].map((cor) => (
                  <label key={cor}>
                    <input
                      type="radio"
                      name="alianca"
                      value={cor}
                      checked={alianca === cor}
                      onChange={(e) =>
                        setAlianca(e.target.value as "vermelho" | "azul")
                      }
                    />
                    Aliança {cor.charAt(0).toUpperCase() + cor.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div
            id="box-score"
            style={{
              backgroundColor: alianca === "azul" ? "#0b90d3" : "#ff002b",
            }}
          >
            <div id="out-times">
              <div id="times">
                <p>Equipes:</p>
                <p>{selected_alianca?.time1}</p>
                <p>{selected_alianca?.time2}</p>
              </div>

              <div style={{ fontWeight: "bold", color: "#fff" }}>
                Total da aliança {alianca}: {publicScores[alianca]} pts
              </div>
            </div>

            <section id="box-cards">
              {elements.map((el) => {
                const score = scores[alianca].find((s) => s.id === el.id);
                if (!score) return null;
                return (
                  <ScoreCard
                    key={el.id}
                    element={el}
                    score={score}
                    onChange={(field, value) =>
                      updateScore(Number(el.id), field, value)
                    }
                  />
                );
              })}
            </section>

            <button
              style={{
                backgroundColor:
                  alianca == "vermelho"
                    ? "rgba(175, 4, 38, 1)"
                    : "rgb(0, 85, 137)",
              }}
              id="finish"
              type="button"
              onClick={() => EndJudgeMatch()}
            >
              Finalizar Pontuação de aliança
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
