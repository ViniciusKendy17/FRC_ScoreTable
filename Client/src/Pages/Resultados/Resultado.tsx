import styles from "../../styles/Resultado.module.css";
import ImageById from "../../Components/ImageById";
import Header from "../../Components/HeaderPages";
import Footer from "../../Components/Footer";
import TeamBox from "../../Components/TeamBox";
import Placar from "../../Components/Placar";
import GridTable from "../../Components/GridTable";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

interface Alianca {
  id: number;
  color: "azul" | "vermelho";
  time1: number;
  time2: number;
  partida_id: number;
  total_pontos: number;
  [key: string]: number | string;
}

interface TeamInfo {
  id: number;
  nome: string;
}

export default function Resultado() {
  const { id } = useParams<{ id: string }>();
  const endpoint = "http://10.100.10.58:3000/frc/";
  const [data, setData] = useState<Alianca[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState<TeamInfo[]>([]);
  const [showWinnerGif, setShowWinnerGif] = useState(false);
  const [aliancaGif, setAliancaGif] = useState<string | undefined>(undefined);
  const [fadeOut, setFadeOut] = useState(false);

  const nav = useNavigate();

  // 🎵 Função para tocar som
  function playSound(file: string, volume = 1.0) {
    const audio = new Audio(`/songs/${file}`);
    audio.volume = volume;
    audio
      .play()
      .catch(() =>
        console.log(`⚠️ Som bloqueado até interação do usuário (${file})`)
      );
  }

  // 📋 Busca nomes de equipes
  useEffect(() => {
    async function getNomes() {
      try {
        const response = await fetch(`${endpoint}teams`);
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        const json = await response.json();
        const teamNames: TeamInfo[] = json.equipes.map((team: any) => ({
          id: team.numero_equipe,
          nome: team.nome,
        }));
        setNome(teamNames);
      } catch (error) {
        console.error("Erro ao buscar nomes dos times:", error);
      }
    }
    getNomes();
  }, []);

  // ⚙️ Busca resultado da partida
  useEffect(() => {
    async function getMatch() {
      try {
        const response = await fetch(`${endpoint}match/${id}/result`);
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        const json = await response.json();
        setData(json.alliances || []);
        console.log("APi", json);
      } catch (error) {
        console.error("Erro ao buscar partida:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) getMatch();
  }, [id]);

  // 🧮 Monta objetos de pontuação
  const { pontosAlianca_Vermelha, pontosAlianca_Azul } = useMemo(() => {
    if (!data.length)
      return { pontosAlianca_Vermelha: null, pontosAlianca_Azul: null };

    const get = (color: "vermelho" | "azul") =>
      data.find((a) => a.color === color);

    return {
      pontosAlianca_Vermelha: {
        sair: get("vermelho")?.sair ?? 0,
        idade_media: get("vermelho")?.idade_media ?? 0,
        pre_historico: get("vermelho")?.pre_historico ?? 0,
        estacionar: get("vermelho")?.poco_endgame ?? 0,
        faltas: get("azul")?.faltas_pontos ?? 0,
        total_pontos: get("vermelho")?.total_pontos ?? 0,
        total_rp: get("vermelho")?.total_rp ?? 0,
        auto_pontos: get("vermelho")?.auto_pontos ?? 0,
        au_idade_media: get("vermelho")?.idade_media_au ?? 0,
        color: "vermelho",
      },
      pontosAlianca_Azul: {
        sair: get("azul")?.sair ?? 0,
        idade_media: get("azul")?.idade_media ?? 0,
        pre_historico: get("azul")?.pre_historico ?? 0,
        estacionar: get("azul")?.poco_endgame ?? 0,
        faltas: get("vermelho")?.faltas_pontos ?? 0,
        total_pontos: get("azul")?.total_pontos ?? 0,
        total_rp: get("azul")?.total_rp ?? 0,
        auto_pontos: get("azul")?.auto_pontos ?? 0,
        au_idade_media: get("azul")?.idade_media_au ?? 0 ,
        color: "azul",
      },
    };
  }, [data]);

  

  const idadeVermelha = Number(pontosAlianca_Vermelha?.idade_media ?? 0); 
  const au_idade_vermelha = Number(pontosAlianca_Vermelha?.au_idade_media ?? 0);

  const soma_v = idadeVermelha + au_idade_vermelha;

    const idadeAzul = Number(pontosAlianca_Azul?.idade_media ?? 0); 
  const au_idade_azul = Number(pontosAlianca_Azul?.au_idade_media ?? 0);

  const soma_a = idadeAzul + au_idade_azul;

  // 🧩 Função pura (sem setState) para calcular RP
  function getRankingPointImagesPure(alianca: any) {
    if (!alianca) return [];
    const imagens: number[] = [];
    const total_rp = Number(alianca.total_rp);
    const auto_pontos = Number(alianca.auto_pontos);
    const estacionar = Number(alianca.poco_endgame);


    const ids =
      alianca.color === "vermelho" ? { base: 3, auto: 4, estac: 1 }: { base: 13, auto: 14, estac: 11 };

    console.log(`id`,pontosAlianca_Vermelha)


    if (total_rp === 1 && auto_pontos > 5) imagens.push(ids.auto);
    if (total_rp === 1 && estacionar > 3) imagens.push(ids.estac);
    if (total_rp === 2 && estacionar > 3 && auto_pontos > 5)
      imagens.push(ids.estac, ids.auto);
    if (total_rp === 3) imagens.push(ids.base, ids.base, ids.base);
    if (total_rp === 4 && estacionar > 3)
      imagens.push(ids.estac, ids.base, ids.base, ids.base);
    if (total_rp === 4 && auto_pontos > 5)
      imagens.push(ids.auto, ids.base, ids.base, ids.base);
    if (total_rp === 5)
      imagens.push(ids.estac, ids.auto, ids.base, ids.base, ids.base);


    return imagens;
  }

  const rpVermelho = useMemo(
    () => getRankingPointImagesPure(pontosAlianca_Vermelha),
    [pontosAlianca_Vermelha]
  );
  const rpAzul = useMemo(
    () => getRankingPointImagesPure(pontosAlianca_Azul),
    [pontosAlianca_Azul]
  );
  const showRP = rpVermelho.length > 0 || rpAzul.length > 0;

  const vencedorCalc = useMemo(() => {
    if (!pontosAlianca_Vermelha || !pontosAlianca_Azul) return null;
    return pontosAlianca_Vermelha.total_pontos > pontosAlianca_Azul.total_pontos
      ? "vermelho"
      : pontosAlianca_Vermelha.total_pontos < pontosAlianca_Azul.total_pontos
      ? "azul"
      : null;
  }, [pontosAlianca_Vermelha, pontosAlianca_Azul]);

  useEffect(() => {
    if (!vencedorCalc) return;

    setShowWinnerGif(true);
    playSound("match_result.wav");

    if (vencedorCalc === "azul") {
      setAliancaGif("/Gif/blueWinner.mp4");
    } else {
      setAliancaGif(
        "https://community.firstinspires.org/hubfs/2025%20Animation.gif"
      );
    }


    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);

    const hideTimer = setTimeout(() => {
      setShowWinnerGif(false);
      setFadeOut(false);
    }, 7000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [vencedorCalc]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "h") {
        event.preventDefault(); // evita scroll da página
        console.log(event.key);
        nav("/");
      }

      if (event.key.toLowerCase() == "r") {
        event.preventDefault();
        nav(`/classificacao`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nav]);

  if (showWinnerGif && vencedorCalc) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          background: "black",
          overflow: "hidden",
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 1s ease-in-out",
        }}
      >
        {aliancaGif?.endsWith(".mp4") ? (
          <video
            src={aliancaGif}
            autoPlay
            muted
            playsInline
            preload="auto"
            style={{
              width: "100vw",
              maxWidth: "100%",
              height: "100vh",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            src={aliancaGif!}
            alt="Winner Animation"
            style={{
              width: "100vw",
              maxWidth: "100%",
              height: "100vh",
              maxHeight: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      style={{
        opacity: showWinnerGif ? 0 : 1,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <Header title={`Resultado`} />

      {/* Equipes Vermelhas */}
      <div className={styles.equipesRed}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            transform: "translate(0px, -15px)",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {vencedorCalc === "vermelho" ? (
            <>
              <ImageById
                id={22}
                alt="Vermelho Winner"
                style={{
                  width: "80vw",
                  maxWidth: "600px",
                  aspectRatio: "2037 / 1011",
                }}
                pasta="winner"
              />
              {/* <ImageById
                id={23}
                alt="Vermelho Winner"
                style={{
                  width: "80vw",
                  maxWidth: "600px",
                  aspectRatio: "2037 / 319",
                }}
                pasta="winner"
              /> */}
            </>
          ) : (
            <>
              <div
                style={{
                  width: "80vw",
                  maxWidth: "600px",
                  aspectRatio: "2037 / 1011",
                  visibility: "hidden",
                }}
              />
              <div
                style={{
                  width: "80vw",
                  maxWidth: "600px",
                  aspectRatio: "2037 / 319",
                  visibility: "hidden",
                }}
              />
            </>
          )}
        </div>

        {data
          .filter((t) => t.color === "vermelho")
          .flatMap((t) => [t.time1, t.time2])
          .map((numero, i) => {
            const nomeEncontrado = nome.find(
              (team) => team.id === numero
            )?.nome;
            return (
              <TeamBox
                key={`red-${i}`}
                color="red"
                numbers={[numero]}
                teamName={nomeEncontrado || `Time ${numero}`}
                variant="resultado"
              />
            );
          })}

        {rpVermelho.length > 0 ? (
          <>
            <div className={styles.rankingPoints}></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                minHeight: "10px",
              }}
            >
              {rpVermelho.map((id, index) => (
                <ImageById
                  key={`rp-vermelho-${index}`}
                  id={id}
                  alt="Ranking Points"
                  style={{
                    width: "100px",
                    height: "100px",
                    aspectRatio: "260 / 260",
                  }}
                  pasta="rankingpoints"
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                height: "8vh",
                width: "100w",
                maxWidth: "600px",
                aspectRatio: "2037 / 1011",
                visibility: "hidden",
              }}
            />
            <div
              style={{
                width: "100vw",
                maxWidth: "600px",
                aspectRatio: "2037 / 319",
                visibility: "hidden",
              }}
            />
          </>
        )}
      </div>

      <div className={styles.placarContainer}>
        <Placar
          className={styles.placar}
          variant="winner"
          scoreLeft={pontosAlianca_Vermelha?.total_pontos ?? 0}
          scoreRight={pontosAlianca_Azul?.total_pontos ?? 0}
        />
        <GridTable
          data={[
            [
              `${pontosAlianca_Vermelha?.sair ?? 0}`,
              "LEAVE",
              `${pontosAlianca_Azul?.sair ?? 0}`,
            ],
            [
              `${pontosAlianca_Vermelha?.pre_historico ?? 0}`,
              "prehistoric",
              `${pontosAlianca_Azul?.pre_historico ?? 0}`,
            ],
            [
              `${soma_v ?? 0}`,
              "Middle Ages",
              `${soma_a ?? 0}`,
            ],
            [
              `${pontosAlianca_Vermelha?.estacionar ?? 0}`,
              "Park",
              `${pontosAlianca_Azul?.estacionar ?? 0}`,
            ],
            [
              `${pontosAlianca_Vermelha?.faltas ?? 0}`,
              "Penalty",
              `${pontosAlianca_Azul?.faltas ?? 0}`,
            ],
          ]}
        />
      </div>

      {/* Equipes Azuis */}
      <div className={styles.equipesBlue}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {vencedorCalc === "azul" ? (
            <>
              <ImageById
                id={22}
                alt="Azul Winner"
                style={{
                  width: "80vw",
                  maxWidth: "600px",
                  aspectRatio: "2037 / 1011",
                }}
                pasta="winner"
              />
              {/* <ImageById
                id={23}
                alt="Azul Winner"
                style={{
                  width: "80vw",
                  maxWidth: "600px",
                  aspectRatio: "2037 / 319",
                }}
                pasta="winner"
              /> */}
            </>
          ) : (
            <>
              <div
                style={{
                  width: "80vw",
                  maxWidth: "600px",
                  aspectRatio: "2037 / 1011",
                  visibility: "hidden",
                }}
              />
              <div
                style={{
                  width: "80vw",
                  maxWidth: "600px",
                  aspectRatio: "2037 / 319",
                  visibility: "hidden",
                }}
              />
            </>
          )}
        </div>

        {data
          .filter((t) => t.color === "azul")
          .flatMap((t) => [t.time1, t.time2])
          .map((numero, i) => {
            const nomeEncontrado = nome.find(
              (team) => team.id === numero
            )?.nome;
            return (
              <TeamBox
                key={`blue-${i}`}
                color="blue"
                numbers={[numero]}
                teamName={nomeEncontrado || `Time ${numero}`}
                variant="resultado"
              />
            );
          })}

        {rpAzul.length > 0 ? (
          <>
            <div className={styles.rankingPoints}></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                minHeight: "10px",
              }}
            >
              {rpAzul.map((id, index) => (
                <ImageById
                  key={`rp-vermelho-${index}`}
                  id={id}
                  alt="Ranking Points"
                  style={{
                    width: "100px",
                    height: "100px",
                    aspectRatio: "260 / 260",
                  }}
                  pasta="rankingpoints"
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                height: "8vh",
                width: "100w",
                maxWidth: "600px",
                aspectRatio: "2037 / 1011",
                visibility: "hidden",
              }}
            />
            <div
              style={{
                width: "100vw",
                maxWidth: "600px",
                aspectRatio: "2037 / 319",
                visibility: "hidden",
              }}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
