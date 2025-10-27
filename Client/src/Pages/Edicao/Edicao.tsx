import { useEffect, useState } from "react";
import "../../styles/Form.css";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../Components/Header";
import type { Cor, Equipe, PartialAlianca, Status } from "../../utils/Types";
import { PartidaService } from "../../Services/PartidaService";
import { toast_pro } from "../../utils/Util";
import { useParams } from "react-router-dom";

export default function Edicao() {
  const [opcoesTimes, SetTimes] = useState<Equipe[] | null>([]);
  const [status, SetStatus] = useState<Status>("agendada");

  const { id } = useParams();

  const [azul, setAzul] = useState<(number | "")[]>([]);
  const [vermelho, setVermelho] = useState<(number | "")[]>([]);
  const handleChange = (cor: Cor, index: number, value: number | "") => {
    const nova = [...(cor === "azul" ? azul : vermelho)];
    nova[index] = value;
    cor === "azul" ? setAzul(nova) : setVermelho(nova);
  };

  async function GetTeamFromMatch() {
    const teams = await PartidaService.GetTeamsFromMatch(Number(id));

    const azuis = teams?.teams.find((t) => t.color == "azul");
    const vermelhos = teams?.teams.find((t) => t.color == "vermelho");

    if (azuis) {
      setAzul([azuis.time1 ?? "", azuis.time2 ?? ""]);
    }

    if (vermelhos) {
      setVermelho([vermelhos.time1 ?? "", vermelhos.time2 ?? ""]);
    }
  }

  async function DefinirEquipes() {
    const equipes = await PartidaService.GetTeams();
    if (equipes) SetTimes(equipes);
  }

  useEffect(() => {
    DefinirEquipes();
    GetTeamFromMatch();
  }, []);

  async function EditMatch() {
    const payload = {
      status: status,
      aliancas: [
        {
          color: "azul",
          time1: Number(azul[0]),
          time2: Number(azul[1]),
        },
        {
          color: "vermelho",
          time1: Number(vermelho[0]),
          time2: Number(vermelho[1]),
        },
      ],
    };

    const data = await PartidaService.EditMatch(Number(id), payload);

    if (data) {
      toast.success("Partida atualizada com sucesso", toast_pro);
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
          <h3>Editar Partida</h3>

          <h3>Partida ID: {id}</h3>

          <select
            className="alianca"
            name=""
            onChange={(e) => SetStatus(e.target.value as Status)}
            id=""
          >
            <option value="agendada">Agendada</option>
            <option value="em_progresso">Em progresso</option>
            <option value="completada">Finalizada</option>
          </select>

          <div className="aliancas">
            <div className="alianca vermelho">
              <h4>Aliança Vermelha</h4>
              {[0, 1].map((i) => (
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
              {[0, 1].map((i) => (
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
            onClick={() => EditMatch()}
            className="btn-salvar"
          >
            Salvar Alterações
          </button>
        </form>
      </main>
    </div>
  );
}
