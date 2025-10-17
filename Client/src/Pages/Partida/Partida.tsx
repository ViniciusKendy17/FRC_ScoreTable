import PointsBox from "../../Components/PointsBox";
import Placar from "../../Components/Placar";
import styles from "../../Style/Classificacao.module.css";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import TeamMatchs from "../../Components/TeamMatchs";

export default function Resultado() {
  return (
    <div className={styles.container}>
      <Header title="Partida" pesquisa={""} SetPesquisa={undefined} showpesquisa={false} id_partida={0} />

      <div className={styles.equipesRed}>
        <PointsBox colorClass="red" pointsText="0/4" />
        <PointsBox colorClass="red1" pointsText="2/4" />
      </div>

      <TeamMatchs
        leftTeams={[9991, 9992, 9993]}
        rightTeams={[9994, 9995, 9996]}
      />

        <Placar
          className={styles.placar}
          variant="partida"
          scoreLeft={80}
          scoreRight={70}
          time="1:35"
        />


      <div className={styles.equipesBlue}>
        <PointsBox
          colorClass="blue"
          pointsText="1/4"
          transform="translate(-20px, 8.5px)"
        />
        <PointsBox
          colorClass="blue1"
          pointsText="3/4"
          transform="translate(-20px, 8.5px)"
        />
      </div>
      <Footer text="FRC Score Table" />
    </div>
  );
}
