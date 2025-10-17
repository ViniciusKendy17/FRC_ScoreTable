import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { Aliança, Cor } from "../../utils/Types";
import { PartidaService } from "../../Services/PartidaService";
import "../../Style/Pontuacao.css";
import Header from "../../Components/Header";
import "../../Style/HomeJudge.css";
import { elements, type Pontos, type Score } from "../../utils/ScoreTable";
import ScoreCard from "../../Components/ScoreSection";

export default function Pontuacao() {
  const { id } = useParams();

  const [aliancas, SetAliancas] = useState<Aliança[] | null>([]);
  const [alianca, setAlianca] = useState<"vermelho" | "azul">("vermelho");

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
    })),
    azul: elements.map((el) => ({
      id: Number(el.id),
      auto: 0,
      teleop: 0,
      endgame: 0,
      idade_media: 0,
      pre_historico: 0,
    })),
  });

  const updateScore = (
    id: number,
    field: "auto" | "teleop" | "endgame" | "idade_media" | "pre_historico",
    value: number
  ) => {
    setScores((prev) => ({
      ...prev,
      [alianca]: prev[alianca as "vermelho" | "azul"].map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));
  };

  const totalAll = scores[alianca].reduce((acc, s) => {
    const el = elements.find((e) => Number(e.id) === s.id);
    if (!el) return acc;
    return (
      acc +
      s.auto * (el.pontos.auto_pontos ?? 0) +
      s.teleop * (el.pontos.teleop_pontos ?? 0) +
      s.endgame * (el.pontos.estacionar ?? 0)
    );
  }, 0);

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

      final_score.auto_pontos += sc.auto * (el.pontos.auto_pontos ?? 0);
      final_score.teleop_pontos += sc.teleop * (el.pontos.teleop_pontos ?? 0);
      final_score.estacionar += sc.endgame * (el.pontos.estacionar ?? 0);

      final_score.idade_media += sc.idade_media * (el.pontos.idade_media ?? 0);
      final_score.pre_historico += sc.pre_historico;

      console.log(sc.pre_historico)
      // if (el.pontos.faltas_pontos)
      //   final_score.faltas_pontos += sc.teleop * el.pontos.faltas_pontos;


      // console.log(final_score.idade_media);

      // if (el.pontos.sair) final_score.sair += sc.endgame * el.pontos.sair;

      // if (el.pontos.rp_auto) final_score.rp_auto += sc.auto * el.pontos.rp_auto;

      // if (el.pontos.rp_estacionar)
      //   final_score.rp_estacionar += sc.endgame * el.pontos.rp_estacionar;
    });

    return final_score;
  }

  const jsonAPI = useMemo(() => {
    return { alianca: GetFinalScore(alianca, scores, elements) };
  }, [alianca, scores, elements]);

  console.log(jsonAPI);
  
  async function DefineAlliences() {
    const data = await PartidaService.GetAlliencesByMatch(Number(id));
    SetAliancas(data);
    console.log(data);
  }

  useEffect(() => {
    DefineAlliences();
  }, []);

  return (
    <>
      <div id="back">
        <Header
          showpesquisa={false}
          id_partida={Number(id)}
          pesquisa=""
          SetPesquisa=""
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
            <div id="times">
              <p>Equipes:</p>
              <p>{selected_alianca?.time1}</p>
              <p>{selected_alianca?.time2}</p>
              <p>{selected_alianca?.time3}</p>
            </div>

            <section id="box-cards">
              {elements.map((el) => {
                const score = scores[alianca].find((s) => s.id === el.id);
                if (!score) return null; // evita que ScoreCard receba undefined
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

            <div style={{ marginTop: 10, fontWeight: "bold", color: "#fff" }}>
              Total da aliança {alianca}: {totalAll} pts
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
