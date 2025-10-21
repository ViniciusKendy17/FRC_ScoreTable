import styles from "../../styles/Partida.module.css"; // ← CSS global
import PointsBox from "../../Components/PointsBox";
import Placar from "../../Components/Placar";
import Footer from "../../Components/Footer";
import Header from "../../Components/HeaderPages";
import TeamMatchs from "../../Components/TeamMatchs";

export default function Partida() {
  return (
    <div className={`${styles.container}`}>
      <Header title="Partida 01"
      />

       <div className={`${styles.equipesRed}`}>
        <PointsBox colorClass="red" pointsText="0/4" />
        <PointsBox colorClass="red1" pointsText="2/4" />
      </div>

      <TeamMatchs
        leftTeams={[9991, 9992, 9993]}
        rightTeams={[9994, 9995, 9996]}
      />

     <Placar
        className={`${styles.placar}`}
        variant="partida"
        scoreLeft={80}
        scoreRight={70}
        time="1:35"
      />

    <div className={`${styles.equipesBlue}`}>
        <PointsBox
          colorClass="blue"
          pointsText="1/4"
          transform="translate(-45px, -10.5px)"
        />
        <PointsBox
          colorClass="blue1"
          pointsText="3/4"
          transform="translate(-45px, -10.5px)"
        />
      </div>

      <Footer text="FRC Score Table" /> 
    </div>
  );
}
