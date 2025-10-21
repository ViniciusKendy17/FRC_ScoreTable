import styles from "../../styles/Resultado.module.css"; // ← Importa o CSS global
import ImageById from "../../Components/ImageById";
import Header from "../../Components/HeaderPages";
import Footer from "../../Components/Footer";
import TeamBox from "../../Components/TeamBox";
import Placar from "../../Components/Placar";
import GridTable from "../../Components/GridTable";

export default function Resultado() {
  return (
    <div className={styles.container}>
      <Header title="Resultado"/>

      {/* Equipes Vermelhas */}
      <div className={styles.equipesRed}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ImageById
            id={22}
            alt="Imagem 1"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "500px",
              aspectRatio: "2037 / 1011",
            }}
            pasta="winner"
          />
          <ImageById
            id={23}
            alt="Imagem 2"
            style={{
              width: "100%",
              maxWidth: "500px",
              aspectRatio: "2037 / 319",
            }}
            pasta="winner"
          />
        </div>

        <TeamBox color="red" numbers={[40009, 1]} teamName="Team Teste" variant="resultado"/>
        <TeamBox color="red" numbers={[40009, 1]} teamName="Team Teste" variant="resultado"/>
        <TeamBox color="red" numbers={[40009, 1]} teamName="Team Teste" variant="resultado"/>

        <div className={styles.rankingPoints}></div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <ImageById
            id={1}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
          <ImageById
            id={4}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
          <ImageById
            id={2}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
          <ImageById
            id={3}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
          <ImageById
            id={3}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
        </div>
      </div>

      {/* Placar e Tabela */}
      <div className={styles.placarContainer}>
        <Placar
          className={styles.placar}
          variant="winner"
          scoreLeft={120}
          scoreRight={125}
        />
        <GridTable
          data={[
            ["A1", "B1", "C1"],
            ["A2", "B2", "C2"],
            ["A3", "B3", "C3"],
            ["A4", "B4", "C4"],
          ]}
        />
      </div>

      {/* Equipes Azuis */}
      <div className={styles.equipesBlue}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ImageById
            id={22}
            alt="Imagem 1"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "500px",
              aspectRatio: "2037 / 1011",
            }}
            pasta="winner"
          />
          <ImageById
            id={23}
            alt="Imagem 2"
            style={{
              width: "100%",
              maxWidth: "500px",
              aspectRatio: "2037 / 319",
            }}
            pasta="winner"
          />
        </div>

        <TeamBox color="blue" numbers={[40009, 1]} teamName="Team Teste" variant="resultado"/>
        <TeamBox color="blue" numbers={[40009, 1]} teamName="Team Teste" variant="resultado"/>
        <TeamBox color="blue" numbers={[40009, 1]} teamName="Team Teste" variant="resultado"/>

        <div className={styles.rankingPoints}></div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <ImageById
            id={11}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
          <ImageById
            id={14}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
          <ImageById
            id={12}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
          <ImageById
            id={13}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
          <ImageById
            id={13}
            alt="Ranking Points"
            style={{ width: "90px", height: "90px", aspectRatio: "260 / 260" }}
            pasta="rankingpoints"
          />
        </div>
      </div>

      <Footer /> 
    </div>
  );
}
