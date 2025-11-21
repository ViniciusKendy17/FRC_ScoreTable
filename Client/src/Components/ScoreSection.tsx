import type { elements, GameElement, PartialScore } from "../utils/ScoreTable";
import "../styles/PontuacaoCard.css";

type Props = {
  element: GameElement;
  score: PartialScore;
  onChange: (field: elements, value: number) => void;
};

export default function ScoreCard({ element, score, onChange }: Props) {
  const { nome, pontos, cor = "0px" } = element;
  if (!pontos) return null;

  // calcula total baseado nos campos existentes
  const total_card =
    (score.au_idade_media ?? 0) * (pontos.au_idade_media ?? 0) +
    (score.au_pre_historico ?? 0) * (pontos.au_pre_historico ?? 0) +
    (score.estacionar_poco_au ?? 0) * (pontos.au_estacionar ?? 0) +
    (score.op_idade_media ?? 0) * (pontos.op_idade_media ?? 0) +
    (score.op_pre_historico ?? 0) * (pontos.op_pre_historico ?? 0) +
    (score.estacionar_poco ?? 0) * (pontos.estacionar_poco ?? 0) +
    (score.estacionar_poco_au ?? 0) * (pontos.au_estacionar ?? 0) +
    (score.sitio ?? 0) * (pontos.estacionar ?? 0) +
    (score.saida ?? 0) * (pontos.sair ?? 0) +
    (score.falta_branca ?? 0) * (pontos.falta_branca ?? 0) +
    (score.falta_estacionar ?? 0) * (pontos.falta_estacionar ?? 0) +
    (score.falta_prh ?? 0) * (pontos.falta_prh ?? 0) +
    (score.falta_transp ?? 0) * (pontos.falta_transp ?? 0) + 
    (score.falta_grave ?? 0) * (pontos.falta_grave ?? 0) + 
    (score.falta_leve ?? 0) * (pontos.falta_leve ?? 0);

  return (
    <div className="score-card" style={{ borderColor: cor }}>
      <div className="score-header">
        <h3>{nome}</h3>
        <div className="total">{total_card} pts</div>
      </div>

      <div className="score-body">
        {/* Autonomo Idade Média */}
        {pontos.au_idade_media !== undefined && (
          <div className="phase">
            <span>Autonomo</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange(
                    "au_idade_media",
                    Math.max(0, score.au_idade_media - 1)
                  )
                }
              >
                −
              </button>
              <span>{score.au_idade_media}</span>
              <button
                onClick={() =>
                  onChange("au_idade_media", score.au_idade_media + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Teleop Idade Média */}
        {pontos.op_idade_media !== undefined && (
          <div className="phase">
            <span>Teleop</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange(
                    "op_idade_media",
                    Math.max(0, score.op_idade_media - 1)
                  )
                }
              >
                −
              </button>
              <span>{score.op_idade_media}</span>
              <button
                onClick={() =>
                  onChange("op_idade_media", score.op_idade_media + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Autonomo Pre historico */}
        {pontos.au_pre_historico !== undefined && (
          <div className="phase">
            <span>Autonomo</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange(
                    "au_pre_historico",
                    Math.max(0, score.au_pre_historico - 1)
                  )
                }
              >
                −
              </button>
              <span>{score.au_pre_historico}</span>
              <button
                onClick={() =>
                  onChange("au_pre_historico", score.au_pre_historico + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Teleop Pre Historico */}
        {pontos.op_pre_historico !== undefined && (
          <div className="phase">
            <span>Teleop</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange(
                    "op_pre_historico",
                    Math.max(0, score.op_pre_historico - 1)
                  )
                }
              >
                −
              </button>
              <span>{score.op_pre_historico}</span>
              <button
                onClick={() =>
                  onChange("op_pre_historico", score.op_pre_historico + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Estacionar POÇO auto */}
        {pontos.au_estacionar !== undefined && (
          <div className="phase">
            <span>Autonomo</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange(
                    "estacionar_poco_au",
                    Math.max(0, score.estacionar_poco_au - 1)
                  )
                }
              >
                −
              </button>
              <span>{score.estacionar_poco_au}</span>
              <button
                onClick={() =>
                  onChange("estacionar_poco_au", score.estacionar_poco_au + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Estacionar POÇO teleop */}
        {pontos.estacionar_poco !== undefined && (
          <div className="phase">
            <span>Teleop</span>
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

        {/* Estacionar SITIO */}
        {pontos.estacionar !== undefined && (
          <div className="phase">
            <span>Sitio ({pontos.estacionar} pts/unidade)</span>
            <div className="buttons">
              <button
                onClick={() => onChange("sitio", Math.max(0, score.sitio - 1))}
              >
                −
              </button>
              <span>{score.sitio}</span>
              <button onClick={() => onChange("sitio", score.sitio + 1)}>
                +
              </button>
            </div>
          </div>
        )}

        {/* FALTA BRANCA */}
        {pontos.falta_branca !== undefined && (
          <div className="phase">
            <span>Falta</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange("falta_branca", Math.max(0, score.falta_branca - 1))
                }
              >
                −
              </button>
              <span>{score.falta_branca}</span>
              <button
                onClick={() => onChange("falta_branca", score.falta_branca + 1)}
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* FALTA ESTACIONAR */}
        {pontos.falta_estacionar !== undefined && (
          <div className="phase">
            <span>Falta</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange(
                    "falta_estacionar",
                    Math.max(0, score.falta_estacionar - 1)
                  )
                }
              >
                −
              </button>
              <span>{score.falta_estacionar}</span>
              <button
                onClick={() =>
                  onChange("falta_estacionar", score.falta_estacionar + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* FALTA ARTEFATO NA HORA ERRADA */}
        {pontos.falta_prh !== undefined && (
          <div className="phase">
            <span>Falta</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange("falta_prh", Math.max(0, score.falta_prh - 1))
                }
              >
                −
              </button>
              <span>{score.falta_prh}</span>
              <button
                onClick={() => onChange("falta_prh", score.falta_prh + 1)}
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* FALTA - 2 ELEMENTOS NO ROBO */}
        {pontos.falta_transp !== undefined && (
          <div className="phase">
            <span>Falta</span>
            <div className="buttons">
              <button
                onClick={() =>
                  onChange("falta_transp", Math.max(0, score.falta_transp - 1))
                }
              >
                −
              </button>
              <span>{score.falta_transp}</span>
              <button
                onClick={() => onChange("falta_transp", score.falta_transp + 1)}
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

          {/* FALTA GRAVE */}
        {pontos.falta_grave !== undefined && (
          <div className="phase">
            <span>Falta grave </span>
            <div className="buttons">
              <button
                onClick={() => onChange("falta_grave", Math.max(0, score.falta_grave - 1))}
              >
                −
              </button>
              <span>{score.falta_grave}</span>
              <button onClick={() => onChange("falta_grave", score.falta_grave + 1)}>
                +
              </button>
            </div>
          </div>
        )}

          {/* FALTA LEVE */}
        {pontos.falta_leve !== undefined && (
          <div className="phase">
            <span>Falta leve </span>
            <div className="buttons">
              <button
                onClick={() => onChange("falta_leve", Math.max(0, score.falta_leve - 1))}
              >
                −
              </button>
              <span>{score.falta_leve}</span>
              <button onClick={() => onChange("falta_leve", score.falta_leve + 1)}>
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
