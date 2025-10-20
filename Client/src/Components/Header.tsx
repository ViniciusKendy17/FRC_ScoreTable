import type React from "react";
import "../Style/Header.css";
import lupa from "../assets/Tela1_juiz/Ativo 62.png";
import type { Partida } from "../utils/Types";
import { useState } from "react";
import "../App.css"
import { useNavigate } from "react-router-dom";
export default function Header({
  pesquisa,
  SetPesquisa,
  showpesquisa,
  id_partida,
  title
}: {
  pesquisa: string;
  SetPesquisa: any;
  showpesquisa: boolean;
  id_partida: any;
  title:string
}) {
  const [btnativo, SetBtnativo] = useState<string>(
    showpesquisa ? "partidas" : ""
  );

  const nav = useNavigate();

  return (
    <>
      <header className="header-judge">
        <nav id="out-buttons">
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
          <button
            type="button"
            id="partidas"
            style={{
              borderBottom: btnativo == "ranking" ? "white solid 2px" : "",
            }}
            onClick={() => {
              SetBtnativo("ranking");
            }}
          >
            RANKING
          </button>

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
