import { Suspense, useEffect, useMemo, useState } from "react";
import '../../styles/HomeJudge.css';
import type { Partida } from "../../utils/Types";
import { PartidaService } from "../../Services/PartidaService";
import Header from "../../Components/Header";
import "../../App.css";
import PartidaCard from "../../Components/PartidaCard";
import Toast from "../../Components/Toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [partidas, SetPartidas] = useState<Partida[] | null>(null);
  const [pesquisa, SetPesquisa] = useState<string>("");

  const nav = useNavigate();

  async function DefinirPartidas() {
    const todas_partidas = await PartidaService.GetMatches();

    SetPartidas(todas_partidas);
  }

  const filtered_partidas = useMemo(() => {
    return partidas?.filter((p) => {
      if (pesquisa) {
        return p.numero_partida
          .toString()
          .toLowerCase()
          .includes(pesquisa.toLowerCase());
      }
      return true;
    });
  }, [partidas, pesquisa]);

  useEffect(() => {
    DefinirPartidas();
  }, []);

  return (
    <>
      <div id="back">
        <ToastContainer />

        <Header
          pesquisa={pesquisa}
          id_partida={null}
          showpesquisa={true}
          SetPesquisa={SetPesquisa}
          title={""}
        />

        <main id="main-judge">
          <Suspense fallback={<ClipLoader />}>
            <section id="out-partidas">
              {filtered_partidas?.length != 0 ? (
                filtered_partidas?.map((partida) => (
                  <PartidaCard
                    key={partida.id}
                    DefinirPartidas={SetPartidas}
                    partida={partida}
                  />
                ))
              ) : (
                <Toast msg="Partida não encontrada" />
              )}
            </section>
          </Suspense>
        </main>
      </div>

      <div>
        <svg
          id="add"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-circle-fill"
          viewBox="0 0 16 16"
          onClick={() => nav("/partida/nova")}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
        </svg>
      </div>
    </>
  );
}
