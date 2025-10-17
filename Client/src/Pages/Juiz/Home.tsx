import { useEffect, useMemo, useState } from "react";
import "../../Style/HomeJudge.css";
import type { Partida } from "../../utils/Types";
import { PartidaService } from "../../Services/PartidaService";
import Header from "../../Components/Header";
import "../../App.css";
import PartidaCard from "../../Components/PartidaCard";
import Toast from "../../Components/Toast";

export default function Home() {
  const [partidas, SetPartidas] = useState<Partida[] | null>(null);
  const [pesquisa, SetPesquisa] = useState<string>("");

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
        <Header
          pesquisa={pesquisa}
          id_partida={0}
          showpesquisa={true}
          SetPesquisa={SetPesquisa}
        />

        <main id="main-judge">
          <section id="out-partidas">
            {partidas?.length != 0 ? (
              filtered_partidas?.map((partida) => (
                <PartidaCard key={partida.id} partida={partida} />
              ))
            ) : (
              <Toast msg="Partida não encontrada" />
            )}
          </section>
        </main>
      </div>
    </>
  );
}
