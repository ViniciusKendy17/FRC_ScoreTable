import "../styles/HeaderPages.css"; // ← Import direto, sem "styles"
import ImageById from "./ImageById";

interface HeaderProps {
  title?: string;
}

export default function HeaderPages({ title = "Qualificatória" }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="tipografia">{title}</h1>
      <ImageById
        alt="Logo Evento"
        id={61}
        style={{ width: "180px", height: "80%", aspectRatio: "2213 / 739", position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)"
         }}
        pasta="Logo"
        formato="svg"
      />
    </header>
  );
}
