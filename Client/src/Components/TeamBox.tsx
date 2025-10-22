import "../Styles/TeamBox.css";

interface TeamBoxProps {
  color: "red" | "blue";
  numbers: [number,  number, number];
  teamName: string;
  justifyNumbers?: "space-between" | "center";
  widthNumbers?: string;
  variant?: "qualificatoria" | "resultado";
}

export default function TeamBox({
  color,
  numbers,
  teamName,
  justifyNumbers = "space-between",
  variant = "qualificatoria",
  widthNumbers = variant === "resultado" ? "clamp(550px, 25%, 450px)" : "clamp(445px, 25%, 450px)",
}: TeamBoxProps) {
  // mapeia a variant para a classe correta
  const variantClass =
    variant === "resultado" ? "box-resultado" : "box-qualificatoria";

  return (
    <div className={`box ${color} ${variantClass}`}>
      {/* Linha dos números */}
      <div
        className="teamBox-numbers"
        style={{ justifyContent: justifyNumbers, width: widthNumbers }}
      >
        {/* Número esquerdo */}
        <p className={`teamBoxTipografia tipografia-${variant}`}>{numbers[0]}</p>


          <p className={`teamBoxTipografia teamBoxPosition-${variant}`}>{numbers[1]}</p>


        {/* Número direito */}
        {/* <p className="teamBoxTipografia">{numbers[1]}</p> */}
      </div>

      {/* Nome do time */}
      <div className="teamBox-nameContainer">
        <p className="teamBoxName">{teamName}</p>
      </div>
    </div>
  );
}
