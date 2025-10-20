import "../../Styles/Partida.css"; // ← CSS global
import PointsBox from "../../Components/PointsBox";
import Placar from "../../Components/Placar";
import Footer from "../../Components/Footer";
import Header from "../../Components/HeaderPages";
import TeamMatchs from "../../Components/TeamMatchs";

export default function Partida() {
  return (
    <div className="partida container">
      <Header title="Partida 01"
      />

      <div className="equipesRed">
        <PointsBox colorClass="redpartida" pointsText="0/4" />
        <PointsBox colorClass="red1" pointsText="2/4" />
      </div>

      <TeamMatchs
        leftTeams={[9991, 9992, 9993]}
        rightTeams={[9994, 9995, 9996]}
      />

      <Placar
        className="placar"
        variant="partida"
        scoreLeft={80}
        scoreRight={70}
        time="1:35"
      />

      <div className="equipesBlue">
        <PointsBox
          colorClass="bluepartida"
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
