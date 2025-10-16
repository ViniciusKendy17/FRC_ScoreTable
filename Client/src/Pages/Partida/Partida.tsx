import styles from "./Partida.module.css";

export default function Resultado() {
  return (
    <div className={styles.container}>
      <div className={styles.equipesRed}>
        <div className={`${styles.box} ${styles.red}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 10px", 
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 0, transform: "translate(20px, 8.5px)" }}>
              <p className={`${styles.tipografia}`}>0/4</p>
            </div>
          </div>
        </div>
        <div className={`${styles.box} ${styles.red1}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 10px", 
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 0, transform: "translate(20px, 8.5px)" }}>
              <p className={`${styles.tipografia}`}>0/4</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.colunaCentral} // mesma largura do placar
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >

        <div className={styles.containerEquipes}>
          <div style={{color: "black", display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", height: "100%", gap: "20px"}} className={styles.tipografiaEquipes}>
            <p>9991</p>
            <p>9992</p>
            <p>9993</p>
          </div>
          <div style={{color: "black", display: "flex", alignItems: "center", justifyContent: "space-between", width: "25%", height: "100%", gap: "20px"}} className={styles.tipografiaEquipes}>
            <p>9994</p>
            <p>9995</p>
            <p>9996</p>
          </div>
        </div>
        <div className={styles.placar}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{ margin: 0, transform: "translate(-20px, 20px)", paddingLeft: "10px" }}
              className={styles.tipografiaPlacar}
            >
              120
            </p>

                        <p
              style={{ margin: 0, transform: "translate(0px, 20px)" }}
              className={styles.tipografiaResultado}
            >
              2:00
            </p>
            <p
              style={{ margin: 0, transform: "translate(20px, 20px)", paddingRight: "10px" }}
              className={styles.tipografiaPlacar}
            >
              125
            </p>
          </div>
        </div>
      </div>

      <div className={styles.equipesBlue}>
        <div className={`${styles.box} ${styles.blue}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 10px", // afasta do canto
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 0, transform: "translate(-20px, 8.5px)" }}>
              <p className={`${styles.tipografia}`}>0/4</p>
            </div>
          </div>
        </div>
        <div className={`${styles.box} ${styles.blue1}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 10px", 
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 0, transform: "translate(-20px, 8.5px)" }}>
              <p className={`${styles.tipografia}`}>0/4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
