import styles from "./Resultado.module.css";
import ImageById from "../../Components/ImageById"

export default function Resultado() {
  return (
    <div className={styles.container}>
      <div className={styles.equipesRed}>
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", flexDirection: "column", alignItems: "center"}}>
            <ImageById id={22} alt="Imagem 1" style={{ width: "100%", height: "100%", maxWidth: "300px", aspectRatio: "2037 / 1011" }} pasta="winner" />
            <ImageById id={23} alt="Imagem 2" style={{ width: "100%", maxWidth: "300px", aspectRatio: "2037 / 319" }} pasta="winner" />
        </div>
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
        <div className={`${styles.rankingPoints}`}></div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", gap:"10px"}}>
              <ImageById id={1} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
              <ImageById id={4} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
              <ImageById id={2} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
              <ImageById id={3} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
              <ImageById id={3} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
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
        <div className={styles.placar}>
            <div style={{display: "flex", flexDirection: "row" , width: "100%", alignItems: "center", justifyContent: "space-around"}}>
                <p style={{ margin: 0, transform: "translate(-20px, 5px)" }} className={styles.tipografiaPlacar}>120</p>
                <p style={{ margin: 0, transform: "translate(20px, 5px)" }} className={styles.tipografiaPlacar}>125</p>
            </div>
        </div>

        <table className={styles.tipografiaResultado}>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className={styles.equipesBlue}>
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", flexDirection: "column", alignItems: "center"}}>
            <ImageById id={22} alt="Imagem 1" style={{ width: "100%", height: "100%", maxWidth: "300px", aspectRatio: "2037 / 1011" }} pasta="winner" />
            <ImageById id={23} alt="Imagem 2" style={{ width: "100%", maxWidth: "300px", aspectRatio: "2037 / 319" }} pasta="winner" />
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
        <div className={`${styles.rankingPoints}`}></div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", gap:"10px"}}>
              <ImageById id={11} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
              <ImageById id={14} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
              <ImageById id={12} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
              <ImageById id={13} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
              <ImageById id={13} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
            </div>
      </div>
    </div>
  );
}
