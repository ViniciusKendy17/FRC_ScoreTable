import { useNavigate } from "react-router-dom";
import "../styles/HeaderPages.css";
import ImageById from "./ImageById";

interface HeaderProps {
  title?: string;
}

export default function HeaderPages({ title = "Qualificatória" }: HeaderProps) {
  const nav = useNavigate();

  return (
    <header className="header">
      {/* <button type="button" onClick={() => nav("/")} id="partidas">
        Voltar
      </button> */}
      <h1 className="tipografia">{title}</h1>
      <div className="logoHeader">
        <ImageById
          alt="Logo Evento"
          id={61}
          pasta="Logo"
          formato="svg"
          style={{ width: "100%", height: "auto", aspectRatio: "2213 / 739" }}
        />
      </div>
    </header>
  );
}
