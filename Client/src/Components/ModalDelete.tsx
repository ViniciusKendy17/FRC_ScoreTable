import { toast, ToastContainer } from "react-toastify";
import { PartidaService } from "../Services/PartidaService";
import "../styles/Modal.css";
import { toast_pro } from "../utils/Util";
import { BiTrash, BiX } from "react-icons/bi";

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
          <BiTrash id="trashh" />

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

          <BiX id="xx" onClick={() => SetModal(false)} />

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
