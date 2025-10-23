import styles from "../styles/Qualificacao.module.css";
import stylesPartida from "../styles/Partida.module.css";
import stylesWiner from "../styles/Resultado.module.css";

type PlacarProps = {
  className?: string;
  variant?: "qualificatoria" | "partida" | "winner"; // controla estilo/layout
  scoreLeft?: number;
  scoreRight?: number;
  time?: string | number;
};


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
        >
          <div className={stylesPartida.containerPlacar}>
            <p className={stylesPartida.tipografiaPlacar} style={{ textAlign: 'left' }}>
              {scoreLeft}
            </p>
            <p
              className={stylesPartida.tipografiaResultado}
            >
              {time}
            </p>
            <p className={stylesPartida.tipografiaPlacar}>
              {scoreRight}
            </p>
          </div>
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
            gap: "80px",
            width: "400px",
            maxWidth: "100%",
          }}
        >
          <p
            style={{ paddingTop: "20px" }}
            className={stylesWiner.tipografiaPlacar}
          >
            {scoreLeft}
          </p>
          <p
            style={{ paddingTop: "20px" }}
            className={stylesWiner.tipografiaPlacar}
          >
            {scoreRight}
          </p>
        </div>
      )}
    </div>
  );
}
