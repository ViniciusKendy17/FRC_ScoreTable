import styles from "../../styles/Partida.module.css";
import PointsBox from "../../Components/PointsBox";
import Placar from "../../Components/Placar";
import Footer from "../../Components/Footer";
import Header from "../../Components/HeaderPages";
import TeamMatchs from "../../Components/TeamMatchs";
import { useParams } from "react-router-dom";
import { PartidaService } from "../../Services/PartidaService";
import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

// type Score = {
//   azul: number;
//   vermelho: number;
// };

type Score = {
  azul: { total: number; idade_media: number; pre: number };
  vermelho: { total: number; idade_media: number; pre: number };
};

export default function Partida() {
  const { id } = useParams();

  const [matchNum, setMatchNum] = useState<number>();
  const [azul, SetAzul] = useState<number[]>();
  const [ver, SetVermelho] = useState<number[]>();

  const [scores, SetScores] = useState<Score>({
    azul: { total: 0, idade_media: 0, pre: 0 },
    vermelho: { total: 0, idade_media: 0, pre: 0 },
  });
  const socketRef = useRef<Socket | null>(null);

  async function GetMatchInfo() {
    const data = await PartidaService.GetMatchInfo(Number(id));

    setMatchNum(data?.match_info.numero_partida);

    const azul = data?.alliances.find((al) => al.color === "azul")!;
    const vermelho = data?.alliances.find((al) => al.color === "vermelho")!;

    console.log([azul.time1]);

    SetAzul([azul.time1, azul.time2]);
    SetVermelho([vermelho.time1, vermelho.time2]);
  }

  useEffect(() => {
    GetMatchInfo();
  }, []);

  useEffect(() => {
    // Cria a conexão apenas uma vez
    socketRef.current = io("http://192.168.0.104:3001", {
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket!", socket.id);
    });

    socket.on("score_update", (data: Score) => {
      SetScores(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!azul || !ver) {
    return <p>Carregando placar</p>;
  }

  return (
    <div className={styles.container}>
      <Header title={`Partida ${matchNum ?? ""}`} />

      <div className={styles.equipesRed}>
        <PointsBox colorClass="red" pointsText={scores.vermelho.pre} />
        <PointsBox colorClass="red1" pointsText={scores.vermelho.idade_media} />
      </div>

      <TeamMatchs leftTeams={ver!} rightTeams={azul!} />

      <Placar
        className={styles.placar}
        scoreLeft={scores.vermelho.total}
        scoreRight={scores.azul.total}
        variant="partida"
        time="1:35"
      />

      <div className={styles.equipesBlue}>
        <PointsBox
          colorClass="blue"
          pointsText={scores.azul.pre}
          transform="translate(-45px, -10.5px)"
        />
        <PointsBox
          colorClass="blue1"
          pointsText={scores.azul.idade_media}
          transform="translate(-45px, -10.5px)"
        />
      </div>

      <Footer text="FRC Score Table" />
    </div>
  );
}
