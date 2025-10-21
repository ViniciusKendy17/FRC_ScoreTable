import type { GameElement } from "../utils/ScoreTable";
import "../Style/PontuacaoCard.css";

type Props = {
  element: GameElement;
  score: {
    id: number;
    auto: number;
    teleop: number;
    endgame: number;
    saida: number;
    estacionar_poco: number;
  };
  onChange: (
    field: "auto" | "teleop" | "endgame" | "saida" | "estacionar_poco",
    value: number
  ) => void;
};

export default function ScoreCard({ element, score, onChange }: Props) {
  const { nome, pontos, cor = "0px" } = element;
  if (!pontos) return null;

  // calcula total baseado nos campos existentes
  const total_card =
    score.auto *
      ((pontos.au_idade_media ?? 0) +
        (pontos.au_pre_historico ?? 0) +
        (pontos.au_estacionar ?? 0)) +
    score.teleop *
      ((pontos.op_idade_media ?? 0) + (pontos.op_pre_historico ?? 0)) +
    score.endgame * (pontos.estacionar ?? 0) +
    score.saida * (pontos.sair ?? 0) +
    score.estacionar_poco * (pontos.estacionar_poco ?? 0);

  return (
    <div className="score-card" style={{ borderColor: cor }}>
      <div className="score-header">
        <h3>{nome}</h3>
        <div className="total">{total_card} pts</div>
      </div>

      <div className="score-body">
        {/* AUTÔNOMO */}
        {(pontos.au_idade_media !== undefined ||
          pontos.au_pre_historico !== undefined ||
          pontos.au_estacionar !== undefined) && (
          <div className="phase">
            <span>Autônomo</span>
            <div className="buttons">
              <button
                onClick={() => onChange("auto", Math.max(0, score.auto - 1))}
              >
                −
              </button>
              <span>{score.auto}</span>
              <button onClick={() => onChange("auto", score.auto + 1)}>
                +
              </button>
            </div>
          </div>
        )}

        {/* TELEOPERADO */}
        {(pontos.op_idade_media !== undefined ||
          pontos.op_pre_historico !== undefined) && (
          <div className="phase">
            <span>Teleoperado</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange("teleop", Math.max(0, score.teleop - 1))
                }
              >
                −
              </button>
              <span>{score.teleop}</span>
              <button onClick={() => onChange("teleop", score.teleop + 1)}>
                +
              </button>
            </div>
          </div>
        )}

        {/* ENDGAME */}
        {pontos.estacionar !== undefined && (
          <div className="phase">
            <span>End Game</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange("endgame", Math.max(0, score.endgame - 1))
                }
              >
                −
              </button>
              <span>{score.endgame}</span>
              <button onClick={() => onChange("endgame", score.endgame + 1)}>
                +
              </button>
            </div>
          </div>
        )}

        {pontos.estacionar_poco !== undefined && (
          <div className="phase">
            <span>Estacionar Poço ({pontos.estacionar_poco} pts/unidade)</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange(
                    "estacionar_poco",
                    Math.max(0, score.estacionar_poco - 1)
                  )
                }
              >
                −
              </button>
              <span>{score.estacionar_poco}</span>
              <button
                onClick={() =>
                  onChange("estacionar_poco", score.estacionar_poco + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* SAÍDA */}
        {pontos.sair !== undefined && (
          <div className="phase">
            <span>Saída ({pontos.sair} pts/unidade)</span>
            <div className="buttons">
              <button
                onClick={() => onChange("saida", Math.max(0, score.saida - 1))}
              >
                −
              </button>
              <span>{score.saida}</span>
              <button onClick={() => onChange("saida", score.saida + 1)}>
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
