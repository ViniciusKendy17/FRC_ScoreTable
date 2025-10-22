import type { Partida } from "../utils/Types";
import "../styles/PartidaCard.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";
import { toast_pro } from "../utils/Util";
import { FaCalendarAlt, FaPen, FaTrash, FaBullseye, FaList } from "react-icons/fa";

export default function PartidaCard({
  partida,
  DefinirPartidas,
}: {
  partida: Partida;
  DefinirPartidas: any;
}) {
  const nav = useNavigate();

  const [modal, SetModal] = useState(false);

  return (
    <>
      <div
        className="card_partida"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >

      <div className="partida-header">
        <h3 style={{fontFamily: "NeoSansProBold", color: "#000", fontSize: "22px"}}>
          Partida {partida.tipo_partida} #{partida.numero_partida}
        </h3>

        <div className="button-group">
          <button className="edit-btn" onClick={() => nav("")}>
            <FaPen className="edit-icon" />
          </button>
            <button className="edit-btn1" onClick={() => nav(`/qualificatoria/${partida.id}`)}>
              <FaList className="edit-icon" />
            </button>
        </div>
      </div>


        {/* <button
          className="edit-btn1"
          onClick={() => nav(`/qualificatoria/${partida.id}`)}
        >
          <FaList className="edit-icon" />
        </button> */}

        <section>
          <button
            id="placar-btn"
            className="btnss"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nav(`/partida/${partida.id}/placar`);
            }}
          >
            <FaCalendarAlt className="btn-icon" />
            <span>PLACAR</span>
          </button>

          <button
            id="pont"
            className="btnss"
            onClick={() => {
              if (partida.status == "finalizada") {
                toast.warn(
                  "Partidas finalizadas não podem ser mais acessadas",
                  toast_pro
                );
                return;
              }
              nav(`/partida/${partida.id}/aliancas`);
            }}
            type="button"
          >
            <FaBullseye className="btn-icon" />
            <span>PONTUAÇÃO</span>
          </button>

          <button
            id="apagar-btn"
            className="btnss"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              SetModal(true);
            }}
          >
            <FaTrash className="btn-icon" />
            <span>APAGAR</span>
          </button>
        </section>
      </div>

      {modal && (
        <ModalDelete
          DefinirPartidas={DefinirPartidas}
          id={partida.id}
          SetModal={SetModal}
        />
      )}
    </>
  );
}
