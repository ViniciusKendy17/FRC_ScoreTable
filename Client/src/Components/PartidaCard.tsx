import type { Partida } from "../utils/Types";
import "../Style/PartidaCard.css";
import Apagar from "../assets/Tela1_juiz/Ativo 68.png";
import Editar from "../assets/Tela1_juiz/Ativo 67.png";
import Placar from "../assets/Tela1_juiz/Ativo 66.png";
import { useNavigate } from "react-router-dom";

export default function PartidaCard({ partida }: { partida: Partida }) {
  const nav = useNavigate();

  return (
    <>
      <div
        className="card_partida"
        onClick={(e) => {
          e.stopPropagation();
          nav(`/partida/${partida.id}/aliancas`);
        }}
      >
        <h3>
          Partida {partida.tipo_partida} #{partida.numero_partida}
        </h3>
        <section>
          <img src={Placar} alt="" />
          <img src={Editar} alt="" />
          <img src={Apagar} alt="" />
        </section>
      </div>
    </>
  );
}
