import type React from "react";
import "../styles/Header.css";
import lupa from "../assets/Tela1_juiz/Ativo 62.png";
import type { Partida } from "../utils/Types";
import { useState } from "react";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
export default function Header({
  pesquisa,
  SetPesquisa,
  showpesquisa,
  id_partida,
  title,
}: {
  pesquisa: string;
  SetPesquisa: any;
  showpesquisa: boolean;
  id_partida: any;
  title: string;
}) {
  const [btnativo, SetBtnativo] = useState<string>(
    showpesquisa ? "partidas" : ""
  );

  const nav = useNavigate();
  const location = useLocation();
  const [user, SetUser] = useLocalStorage("user");
  const isPartidaPage = location.pathname.endsWith("/aliancas")

  return (
    <>
      <header className="header-judge">
        <nav id="out-buttons" style={{justifyContent: isPartidaPage ? "right": "center"}} >
          <button
            style={{
              borderBottom: btnativo == "partidas" ? "white solid 2px" : "",
            }}
            type="button"
            onClick={() => {
              SetBtnativo("partidas");
              nav("/");
            }}
            id="partidas"
          >
            PARTIDAS
          </button>

          {user == "fta" && (
            <button
              type="button"
              id="partidas"
              style={{
                borderBottom: btnativo == "ranking" ? "white solid 2px" : "",
              }}
              onClick={() => {
                SetBtnativo("ranking");
                nav("/classificacao");
              }}
            >
              RANKING
            </button>
          )}

          {showpesquisa && (
            <div id="out-search">
              <input
                type="text"
                value={pesquisa}
                onChange={(e) => SetPesquisa(e.target.value)}
                placeholder="Pesquise a partida aqui"
              />
              <img src={lupa} alt="" />
            </div>
          )}

          {id_partida != null && (
            <h3 style={{ color: "white" }}>PARTIDA: {id_partida}</h3>
          )}
        </nav>
      </header>
    </>
  );
}
