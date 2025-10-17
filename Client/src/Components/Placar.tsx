import React from "react";
import styles from "../Style/Qualificacao.module.css";
import stylesPartida from "../Style/Partida.module.css";
import stylesWiner from "../Style/Resultado.module.css";

interface PlacarProps {
  className?: string;
  variant?: "qualificatoria" | "partida" | "winner"; // controla estilo/layout
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
  return (
    <div>
      {variant === "qualificatoria" && (
        <div className={`${className ?? ""} ${styles.placar}`}></div>
      )}

      {variant === "partida" && (
        <div
          className={`${className ?? ""} ${stylesPartida.placar}`}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "35%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <p className={stylesPartida.tipografiaPlacar} style={{ margin: 0, transform: "translate(0px, 20px)" }}>{scoreLeft}</p>
          <p className={stylesPartida.tipografiaResultado} style={{ margin: 0, transform: "translate(0px, 20px)" }}>{time}</p>
          <p className={stylesPartida.tipografiaPlacar} style={{ margin: 0, transform: "translate(0px, 20px)" }}>{scoreRight}</p>
        </div>
      )}

{variant === "winner" && (
  <div
    className={`${className ?? ""} ${stylesWiner.placar}`} // usar estilo do Resultado
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "80px",        // distância entre os scores
      width: "100%",      // ocupa toda a coluna central
      maxWidth: "600px",  // limitar tamanho do placar
      marginTop: "60px",  // distância do topo (ajustável)
    }}
  >
    <p style={{paddingTop:"20px"}} className={stylesWiner.tipografiaPlacar}>{scoreLeft}</p>
    <p style={{paddingTop:"20px"}} className={stylesWiner.tipografiaPlacar}>{scoreRight}</p>
  </div>
)}

    </div>
  );
}
