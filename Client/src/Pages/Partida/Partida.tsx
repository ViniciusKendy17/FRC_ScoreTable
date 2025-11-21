import styles from "../../styles/Partida.module.css";
import PointsBox from "../../Components/PointsBox";
import Placar from "../../Components/Placar";
import Footer from "../../Components/Footer";
import Header from "../../Components/HeaderPages";
import TeamMatchs from "../../Components/TeamMatchs";
import { useParams } from "react-router-dom";
import { PartidaService } from "../../Services/PartidaService";
import { use, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

type Score = {
  azul: { total: number; idade_media: number; pre: number };
  vermelho: { total: number; idade_media: number; pre: number };
};

export default function Partida() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matchNum, setMatchNum] = useState<number>();
  const [azul, SetAzul] = useState<number[]>();
  const [ver, SetVermelho] = useState<number[]>();

  const [scores, SetScores] = useState<Score>({
    azul: { total: 0, idade_media: 0, pre: 0 },
    vermelho: { total: 0, idade_media: 0, pre: 0 },
  });
  const socketRef = useRef<Socket | null>(null);

  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"auto" | "teleop" | "done">("auto"); // fases
  const intervalRef = useRef<number | null>(null);
  const [startSoundPlayed, setStartSoundPlayed] = useState(false);
  const [buzzerPlayed, setBuzzerPlayed] = useState(false);
  const [warningPlayed, setWarningPlayed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [tipo_partida,SetTipo] = useState()



  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  function playSound(file: string, volume: number) {
    const audio = new Audio(`/songs/${file}`);
    audio.volume = volume;
    audio
      .play()
      .catch(() => console.log(`⚠️ Som ${file} bloqueado até interação`));
  }

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
    socketRef.current = io("http://10.100.10.58:3001", {
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket!", socket.id);
    });

    socket.on("score_update", (data: any) => {
      console.log("Dados de pontuação recebidos:", data);
      SetScores({
        azul: {
          total: data.azul.total ?? 0,
          idade_media: data.azul.idade_media ?? 0,
          pre: data.azul.pre ?? 0,
        },
        vermelho: {
          total: data.vermelho.total ?? 0,
          idade_media: data.vermelho.idade_media ?? 0,
          pre: data.vermelho.pre ?? 0,
        },
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const isLoading = !azul || !ver;

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (phase === "auto" && timeLeft === 0 && !buzzerPlayed) {
      playSound("end.wav", 1.0);
      setBuzzerPlayed(true);
      setIsActive(false);

      // Aguarda ~3 segundos e inicia TELEOP automaticamente
      setTimeout(() => {
        setPhase("teleop");
        setTimeLeft(135); // 2m15s
        setIsActive(true);
        setBuzzerPlayed(false);
        playSound("resume.wav", 1.0);
      }, 2000);
    }

    if (phase === "teleop" && timeLeft === 20 && !warningPlayed) {
      playSound("warning_sonar.wav", 1.0);
      setWarningPlayed(true);
    }

    // Quando o TELEOP termina
    if (phase === "teleop" && timeLeft === 0 && !buzzerPlayed) {
      playSound("end.wav", 1.0);
      setIsActive(false);
      setBuzzerPlayed(true);
      setPhase("done");

      
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, phase, warningPlayed, buzzerPlayed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // evita scroll da página

        if (phase === "auto" && !isActive) {
          playSound("start.wav", 1.0);
          setIsActive(true);
          setStartSoundPlayed(true);
        }
      }

      if (event.key.toLowerCase() === "r") {
        setIsActive(false);
        setPhase("auto");
        setTimeLeft(15);
        setStartSoundPlayed(false);
        setBuzzerPlayed(false);
        setWarningPlayed(false);
      }

      if (event.key === "ArrowRight") {
        navigate(`/resultado/${Number(id)}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, phase, isActive, id]);

  useEffect(() => {
    if (phase === "done") {
      setTimeout(() => {
        setShowOverlay(true)
        console.log(phase)
      },2500)
    }
  }, [phase]);


  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Carregando placar...</p>
      ) : (
        <>
          <Header title={`Partida eliminatórias  ${matchNum ?? ""}`} />

          <div className={styles.equipesRed}>
            <PointsBox colorClass="red" pointsText={scores.vermelho.pre} />
            <PointsBox
              colorClass="red1"
              pointsText={scores.vermelho.idade_media}
            />
          </div>

          <TeamMatchs leftTeams={ver!} rightTeams={azul!} />

      <Placar
        className={styles.placar}
        scoreLeft={scores.vermelho.total}
        scoreRight={scores.azul.total}
        variant="partida"
        time={formattedTime}
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
        </>
      )}
      {showOverlay && <div className={styles.overlay}></div>}
    </div>
  );
}
