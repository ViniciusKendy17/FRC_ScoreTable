import type { GameElement } from "../utils/ScoreTable";
import "../Style/PontuacaoCard.css";
type Props = {
  element: GameElement;
  score: {
    id: number;
    auto: number;
    teleop: number;
    endgame: number;
    idade_media: number;
    pre_historico: number;
  };
  onChange: (
    field: "auto" | "teleop" | "endgame" | "idade_media" | "pre_historico",
    value: number
  ) => void;
};

export default function ScoreCard({ element, score, onChange }: Props) {
  const { nome, pontos, cor = "1px" } = element;

  if (!pontos) return null;


  const total_card =
    score.auto * (pontos.auto_pontos ?? 0) +
    score.teleop * (pontos.teleop_pontos ?? 0) +
    score.endgame * (pontos.estacionar ?? 0) +
    score.idade_media * (pontos.idade_media ?? 0) +
    score.pre_historico * (pontos.pre_historico ?? 0);

  return (
    <div className="score-card" style={{ borderColor: cor }}>
      <div className="score-header">
        <h3>{nome}</h3>
        <div className="total">{total_card} pts</div>
      </div>

      <div className="score-body">
        {pontos.auto_pontos !== undefined && (
          <div className="phase">
            <span>Auto ({pontos.auto_pontos} pts)</span>
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

        {pontos.teleop_pontos !== undefined && (
          <div className="phase">
            <span>Teleop ({pontos.teleop_pontos} pts)</span>
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

        {pontos.estacionar !== undefined && (
          <div className="phase">
            <span>End Game ({pontos.estacionar} pts)</span>
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

        {pontos.idade_media !== undefined && (
          <div className="phase">
            <span>Idade Média ({pontos.idade_media} pts)</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange("idade_media", Math.max(0, score.idade_media - 1))
                }
              >
                −
              </button>
              <span>{score.idade_media}</span>
              <button
                onClick={() => onChange("idade_media", score.idade_media + 1)}
              >
                +
              </button>
            </div>
          </div>
        )}

        {pontos.pre_historico !== undefined && (
          <div className="phase">
            <span>Pré-Histórico ({pontos.pre_historico} pts)</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange(
                    "pre_historico",
                    Math.max(0, score.pre_historico - 1)
                  )
                }
              >
                −
              </button>
              <span>{score.pre_historico}</span>
              <button
                onClick={() =>
                  onChange("pre_historico", score.pre_historico + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
