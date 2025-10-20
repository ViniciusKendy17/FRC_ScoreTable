import React from "react";
import "../styles/Placar.css"; // Importa o CSS global

interface PlacarProps {
  className?: string;
  variant?: "qualificatoria" | "partida" | "winner";
  scoreLeft?: number;
  scoreRight?: number;
  time?: string;
}

export default function Placar({
  className,
  variant = "qualificatoria",
  scoreLeft = 0,
  scoreRight = 0,
  time = "0:00",
}: PlacarProps) {
  // Mapeia a variante para a classe global correspondente
  const variantClass =
    variant === "winner"
      ? "placar--winner"
      : variant === "partida"
      ? "placar--partida"
      : "placar--qualificatoria";

  return (
    <div className={`placar ${variantClass} ${className ?? ""}`}>
      {variant === "partida" && (
        <>
          <p className="placar__score">{scoreLeft}</p>
          <p className="placar__time">{time}</p>
          <p className="placar__score">{scoreRight}</p>
        </>
      )}

      {variant === "winner" && (
        <>
          <p className="placar__score" style={{ paddingTop: "20px" }}>
            {scoreLeft}
          </p>
          <p className="placar__score" style={{ paddingTop: "20px" }}>
            {scoreRight}
          </p>
        </>
      )}

      {variant === "qualificatoria" && (
        /* Se a qualificatória não exibe valores no placar,
           deixamos vazio para usar apenas o background/shape.
           Caso precise de números, descomente e ajuste:
           <>
             <p className="placar__score">{scoreLeft}</p>
             <p className="placar__time">{time}</p>
             <p className="placar__score">{scoreRight}</p>
           </>
        */
        <></>
      )}
    </div>
  );
}
