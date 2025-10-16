import styles from "./Qualificacao.module.css";

export default function Qualificacao() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${styles.title} ${styles.tipografia}`}>Qualificatória</h1>
      </header>
      <div className={styles.equipesRed}>
        <div className={`${styles.box} ${styles.red}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "clamp(445px, 25%, 450px)",
              padding: "0 10px", // afasta do canto
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <p className={`${styles.tipografia}`}>40009</p>
              <p className={`${styles.tipografia}`}>4096</p>
            </div>
            <p className={`${styles.tipografia}`}>1</p>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
          >
            <p
              className={`${styles.tipografia}`}
              style={{
                color: "black",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Team Teste
            </p>
          </div>
        </div>
        <div className={`${styles.box} ${styles.red} ${styles.tipografia}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "clamp(445px, 25%, 450px)",
              padding: "0 10px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <p className={`${styles.tipografia}`}>40009</p>
              <p className={`${styles.tipografia}`}>4096</p>
            </div>
            <p className={`${styles.tipografia}`}>1</p>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
          >
            <p
              className={`${styles.tipografia}`}
              style={{
                color: "black",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Team Teste
            </p>
          </div>
        </div>
        <div className={`${styles.box} ${styles.red} ${styles.tipografia}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "clamp(445px, 25%, 450px)",
              padding: "0 10px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <p className={`${styles.tipografia}`}>40009</p>
              <p className={`${styles.tipografia}`}>4096</p>
            </div>
            <p className={`${styles.tipografia}`}>1</p>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
          >
            <p
              className={`${styles.tipografia}`}
              style={{
                color: "black",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Team Teste
            </p>
          </div>
        </div>
      </div>
        
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gridColumn: '2 / 3', gridRow: '2 / 3'}}>
          <div className={styles.placar}></div>
        </div>

      <div className={styles.equipesBlue}>
        <div className={`${styles.box} ${styles.blue}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "clamp(445px, 25%, 450px)",
              padding: "0 10px", // afasta do canto
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <p className={`${styles.tipografia}`}>40009</p>
              <p className={`${styles.tipografia}`}>4096</p>
            </div>
            <p className={`${styles.tipografia}`}>1</p>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
          >
            <p
              className={`${styles.tipografia}`}
              style={{
                color: "black",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Team Teste
            </p>
          </div>
        </div>
        <div className={`${styles.box} ${styles.blue}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "clamp(445px, 25%, 450px)",
              padding: "0 10px", // afasta do canto
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <p className={`${styles.tipografia}`}>40009</p>
              <p className={`${styles.tipografia}`}>4096</p>
            </div>
            <p className={`${styles.tipografia}`}>1</p>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
          >
            <p
              className={`${styles.tipografia}`}
              style={{
                color: "black",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Team Teste
            </p>
          </div>
        </div>
        <div className={`${styles.box} ${styles.blue}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "clamp(445px, 25%, 450px)",
              padding: "0 10px", // afasta do canto
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <p className={`${styles.tipografia}`}>40009</p>
              <p className={`${styles.tipografia}`}>4096</p>
            </div>
            <p className={`${styles.tipografia}`}>1</p>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
          >
            <p
              className={`${styles.tipografia}`}
              style={{
                color: "black",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Team Teste
            </p>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>FRC Score Table</p>
        </div>
      </footer>

    </div>
  );
}
