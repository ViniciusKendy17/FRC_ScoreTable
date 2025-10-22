import { Suspense, useEffect, useMemo, useState } from "react";
import "../../styles/HomeJudge.css";
import type { Partida } from "../../utils/Types";
import { PartidaService } from "../../Services/PartidaService";
import Header from "../../Components/Header";
import "../../App.css";
import PartidaCard from "../../Components/PartidaCard";
import Toast from "../../Components/Toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import { useLocalStorage } from "@uidotdev/usehooks";
import { BiCross, BiCrosshair, BiPlus, BiPlusCircle } from "react-icons/bi";
import { PiPlusCircleBold } from "react-icons/pi";

export default function Home() {
  const [partidas, SetPartidas] = useState<Partida[] | null>(null);
  const [pesquisa, SetPesquisa] = useState<string>("");
  const [user, SetUser] = useLocalStorage("user");

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

      {user == "fta" && (
        <div>
          <PiPlusCircleBold id="add" onClick={() => nav("/partida/nova")} />
        </div>
      )}
    </>
  );
}
