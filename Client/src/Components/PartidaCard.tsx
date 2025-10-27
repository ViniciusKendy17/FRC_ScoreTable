import type { Partida } from "../utils/Types";
import "../styles/PartidaCard.css";

import { useNavigate } from "react-router-dom";
import { use, useState } from "react";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";
import { toast_pro } from "../utils/Util";
import {
  FaCalendarAlt,
  FaPen,
  FaTrash,
  FaBullseye,
  FaList,
  FaTrophy,
} from "react-icons/fa";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function PartidaCard({
  partida,
  DefinirPartidas,
}: {
  partida: Partida;
  DefinirPartidas: any;
}) {
  const nav = useNavigate();
  const [user, SetUser] = useLocalStorage("user");

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
          <h3>
            Partida {partida.tipo_partida} #{partida.numero_partida}
          </h3>
          <h4 className={`status ${partida.status}`}>
            {partida.status === "agendada" && (
              <>
                <span className="status-dot neutral"></span>
                <span>Agendada</span>
              </>
            )}
            {partida.status === "em_progresso" && (
              <>
                <span className="status-dot progress"></span>
                <span>Em Progresso</span>
              </>
            )}
            {partida.status === "completada" && (
              <>
                <span className="status-dot done"></span>
                <span>Completada</span>
              </>
            )}
          </h4>

          {user == "fta" && (
            <div className="button-group">
              <button
                className="edit-btn"
                onClick={() => nav(`/partida/edit/${partida.id}`)}
              >
                <FaPen className="edit-icon" />
              </button>
              <button
                className="edit-btn1"
                onClick={() => nav(`/qualificatoria/${partida.id}`)}
              >
                <FaList className="edit-icon" />
              </button>
            </div>
          )}
        </div>

        <section>
          {user == "fta" && (
            <button
              type="button"
              onClick={() => nav(`/overall/${partida.id}`)}
              className="overall-btn"
            >
              <FaTrophy className="btn-icon" />
              OVERALL PARTIDA
            </button>
          )}

          {user == "fta" && (
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
          )}

          <button
            id="pont"
            disabled={
              (partida.status == "agendada" ||
                partida.status == "completada") &&
              user != "fta"
                ? true
                : false
            }
            className="btnss"
            onClick={() => {
              nav(`/partida/${partida.id}/aliancas`);
            }}
            type="button"
          >
            <FaBullseye className="btn-icon" />
            <span>PONTUAÇÃO</span>
          </button>

          {user == "fta" && (
            <>
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
            </>
          )}
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
