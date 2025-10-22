import { useEffect, useState } from "react";
import Header from "../Components/Header";
import "../styles/Form.css";
import type { Equipe } from "../utils/Types";
import { PartidaService } from "../Services/PartidaService";
import { toast, ToastContainer } from "react-toastify";
import { preconnect } from "react-dom";
import { toast_pro } from "../utils/Util";

export default function FormPartida() {
  const [numero, setNumero] = useState<number>(0);
  const [tipo, setTipo] = useState("treino");
  const [horario, setHorario] = useState("12:00:00");
  const [opcoesTimes, SetTimes] = useState<Equipe[] | null>([]);

  const [azul, setAzul] = useState<(number | "")[]>([]);
  const [vermelho, setVermelho] = useState<(number | "")[]>([]);

  const handleChange = (
    cor: "azul" | "vermelho",
    index: number,
    value: number | ""
  ) => {
    const nova = [...(cor === "azul" ? azul : vermelho)];
    nova[index] = value;
    cor === "azul" ? setAzul(nova) : setVermelho(nova);
  };

  async function DefinirEquipes() {
    const equipes = await PartidaService.GetTeams();
    console.log(equipes);
    if (equipes) SetTimes(equipes);
  }

  useEffect(() => {
    DefinirEquipes();
  }, []);

  async function AddMatch() {
    const payload = {
      match: {
        numero_partida: numero,
        tipo_partida: tipo,
        horario,
      },
      aliancas: [
        {
          color: "azul",
          time1: Number(azul[0]),
          time2: Number(azul[1]),
          time3: Number(azul[2]),
        },
        {
          color: "vermelho",
          time1: Number(vermelho[0]),
          time2: Number(vermelho[1]),
          time3: Number(vermelho[2]),
        },
      ],
    };

    const data = await PartidaService.AddMatch(payload);

    if (data) {
      toast.success("Partida criada com sucesso", toast_pro);
      setNumero(0);
      setTipo("treino");
      setAzul(["", "", ""]);
      setVermelho(["", "", ""]);
    } else {
      toast.error("Erro no servidor, tente novamente");
    }
  }

  return (
    <div id="back">
      <ToastContainer />
      <Header
        pesquisa=""
        SetPesquisa={undefined}
        showpesquisa={false}
        id_partida={null}
        title="Criar Partida"
      />

      <main id="main-judge">
        <form id="form_match">
          <h3>Criar Partida</h3>

          <div className="campo">
            <label>Número da Partida</label>
            <input
              type="number"
              value={numero}
              onChange={(e) => setNumero(Number(e.target.value))}
              required
            />
          </div>

          <div className="campo">
            <label>Tipo de Partida</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="treino">Treino</option>
              <option value="qualificatorias">Qualificatórias</option>
              <option value="eliminatorias">Eliminatórias</option>
            </select>
          </div>

          <div className="aliancas">
            <div className="alianca vermelho">
              <h4>Aliança Vermelha</h4>
              {[0, 1, 2].map((i) => (
                <select
                  key={i}
                  value={vermelho[i]}
                  onChange={(e) =>
                    handleChange("vermelho", i, Number(e.target.value))
                  }
                  required
                >
                  <option value="">Selecione o time</option>
                  {opcoesTimes?.map((t) => (
                    <option key={t.numero_equipe} value={t.numero_equipe}>
                      {t.numero_equipe}
                    </option>
                  ))}
                </select>
              ))}
            </div>

            <div className="alianca azul">
              <h4>Aliança Azul</h4>
              {[0, 1, 2].map((i) => (
                <select
                  key={i}
                  value={azul[i]}
                  onChange={(e) =>
                    handleChange("azul", i, Number(e.target.value))
                  }
                  required
                >
                  <option value="">Selecione o time</option>
                  {opcoesTimes?.map((t) => (
                    <option key={t.numero_equipe} value={t.numero_equipe}>
                      {t.numero_equipe}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => AddMatch()}
            className="btn-salvar"
          >
            Salvar Partida
          </button>
        </form>
      </main>
    </div>
  );
}
