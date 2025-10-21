import { toast, ToastContainer } from "react-toastify";
import { PartidaService } from "../Services/PartidaService";
import "../Style/Modal.css";
import { toast_pro } from "../utils/Util";

export default function ModalDelete({
  SetModal,
  id,
  DefinirPartidas,
}: {
  SetModal: any;
  id: number;
  DefinirPartidas: any;
}) {
  async function GetMatches() {
    const todas_partidas = await PartidaService.GetMatches();
    DefinirPartidas(todas_partidas);
  }

  async function HandleDelete(id: number) {
    const data = await PartidaService.DeleteMatch(id);

    console.log(data);

    if (data) {
      toast.success("Partida deletada com sucesso", toast_pro);
      setTimeout(async () => {
        SetModal(false);
        await GetMatches();
      }, 300);
    }
  }

  return (
    <>
      <div id="out-modal" onClick={() => SetModal(false)}>
        <div
          id="modal"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <svg
            id="trash"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>

          <svg
            id="xx"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
            onClick={() => SetModal(false)}
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>

          <h3>Deletar</h3>
          <p style={{ textAlign: "center" }}>
            Tem certeza que deseja deletar a partida ?
          </p>

          <div id="out-btn">
            <button type="button" id="cancel" onClick={() => SetModal(false)}>
              Cancelar
            </button>
            <button type="button" id="confirm" onClick={() => HandleDelete(id)}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
