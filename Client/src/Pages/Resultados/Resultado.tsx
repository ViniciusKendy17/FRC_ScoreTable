import styles from "../../styles/Resultado.module.css"; // ← Importa o CSS global
import ImageById from "../../Components/ImageById";
import Header from "../../Components/HeaderPages";
import Footer from "../../Components/Footer";
import TeamBox from "../../Components/TeamBox";
import Placar from "../../Components/Placar";
import GridTable from "../../Components/GridTable";
import { useParams } from "react-router-dom";
import { use, useEffect, useMemo, useState } from "react";

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
  const endpoint = "http://192.168.0.100:3000/frc/";
  const [data, setData] = useState<Alianca[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState<any[]>([]);
  const [numero_partida, setNumeroPartida] = useState<number | null>(null);

  const getNomes = async () => {
    try {
      const response = await fetch(`${endpoint}teams`);
      if (!response.ok) throw new Error(`Erro ${response.status}`);
      const json = await response.json();
      const teamNames: TeamInfo[] = json.equipes.map((team: any) => ({
        id: team.numero_equipe,
        nome: team.nome,
      }));
      setNome(teamNames);
      console.log("Nomes dos times:", teamNames);
    } catch (error) {
      console.error("Erro ao buscar nomes dos times:", error);
    }
  };

  useEffect(() => {
    const getMatch = async () => {
      try {
        const response = await fetch(`${endpoint}match/${id}/result`);
        if (!response.ok) throw new Error(`Erro ${response.status}`);

        const json = await response.json();
        setData(json.alliances || []);
        console.log("Dados da partida:", json);
      } catch (error) {
        console.error("Erro ao buscar partida:", error);
      } finally {
        setLoading(false);
      }
    };

    getNomes();
    if (id) getMatch();
  }, [id]);

  const { pontosAlianca_Vermelha, pontosAlianca_Azul } = useMemo(() => {
    if (!data.length) {
      return { pontosAlianca_Vermelha: null, pontosAlianca_Azul: null };
    }

    return {
      pontosAlianca_Vermelha: {
        sair: data.find((a) => a.color === "vermelho")?.sair ?? 0,
        idade_media: data.find((a) => a.color === "vermelho")?.idade_media ?? 0,
        pre_historico: data.find((a) => a.color === "vermelho")?.pre_historico ?? 0,
        estacionar: data.find((a) => a.color === "vermelho")?.estacionar ?? 0,
        faltas: data.find((a) => a.color === "azul")?.faltas_pontos ?? 0,
        total_pontos: data.find((a) => a.color === "vermelho")?.total_pontos ?? 0,
        total_rp: data.find((a) => a.color === "vermelho")?.total_rp ?? 0,
        auto_pontos: data.find((a) => a.color === "vermelho")?.auto_pontos ?? 0,
        color : "vermelho",
      },
      pontosAlianca_Azul: {
        sair: data.find((a) => a.color === "azul")?.sair ?? 0,
        idade_media: data.find((a) => a.color === "azul")?.idade_media ?? 0,
        pre_historico: data.find((a) => a.color === "azul")?.pre_historico ?? 0,
        estacionar: data.find((a) => a.color === "azul")?.estacionar ?? 0,
        faltas: data.find((a) => a.color === "vermelho")?.faltas_pontos ?? 0,
        total_pontos: data.find((a) => a.color === "azul")?.total_pontos ?? 0,
        total_rp: data.find((a) => a.color === "azul")?.total_rp ?? 0,
        auto_pontos: data.find((a) => a.color === "azul")?.auto_pontos ?? 0,
        color : "azul",
      },
    };
  }, [data]);

  const getRankingPointImages = (alianca: any) => {
    if (!alianca) return [];

    const imagens: number[] = [];

    const total_rp = Number(alianca.total_rp);
    const auto_pontos = Number(alianca.auto_pontos);
    const estacionar = Number(alianca.estacionar);

    const ids =
      alianca.color === "vermelho"
        ? { base: 3, auto: 4, estac: 1 } // 🔴 vermelho
        : { base: 13, auto: 14, estac: 11 }; // 🔵 azul

    if (total_rp === 1 && auto_pontos > 5) imagens.push(ids.auto);
    if (total_rp === 1 && estacionar === 3) imagens.push(ids.estac);
    if (total_rp === 2 && estacionar > 3 && estacionar > 5)
      imagens.push(ids.estac, ids.auto);
    if (total_rp === 3) imagens.push(ids.base, ids.base, ids.base);
    if (total_rp === 4 && estacionar > 3)
      imagens.push(ids.estac, ids.base, ids.base, ids.base);
    if (total_rp === 4 && auto_pontos > 5)
      imagens.push(ids.auto, ids.base, ids.base, ids.base);
    if (total_rp === 5)
      imagens.push(ids.estac, ids.auto, ids.base, ids.base, ids.base);

    return imagens;
  };

const renderWinnerImages = (color: "vermelho" | "azul") => {
  if (!pontosAlianca_Vermelha || !pontosAlianca_Azul) return null;

  const vencedor =
    pontosAlianca_Vermelha.total_pontos > pontosAlianca_Azul.total_pontos
      ? "vermelho"
      : pontosAlianca_Vermelha.total_pontos < pontosAlianca_Azul.total_pontos
      ? "azul"
      : null;

  if (vencedor !== color) return null; // só renderiza na coluna do vencedor

  const imageIds = color === "vermelho" ? [22, 23] : [22, 23];

  return imageIds.map((id, index) => (
    <ImageById
      key={id}
      id={id}
      alt={`Imagem ${color} ${index + 1}`}
      style={{
        width: "50vw",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        aspectRatio: index === 0 ? "2037 / 1011" : "2037 / 319",
      }}
      pasta="winner"
    />
  ));
};

  return (
    <div className={styles.container}>
      <Header title={`Resultado`} />

      {/* Equipes Vermelhas */}
      <div className={styles.equipesRed}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            transform: "translate(0px, 8px)",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        {renderWinnerImages("azul")}
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
                numbers={[numero, 0]}
                teamName={nomeEncontrado || `Time ${numero}`}
                variant="resultado"
              />
            );
          })}

        <div className={styles.rankingPoints}></div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {getRankingPointImages(pontosAlianca_Vermelha).map((id, index) => (
            <ImageById
              key={`rp-vermelho-${index}`}
              id={id}
              alt="Ranking Points"
              style={{
                width: "80px",
                height: "80px",
                aspectRatio: "260 / 260",
              }}
              pasta="rankingpoints"
            />
          ))}
        </div>
      </div>

      {/* Placar e Tabela */}
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
              `${pontosAlianca_Vermelha?.idade_media ?? 0}`,
              "Middle Ages",
              `${pontosAlianca_Azul?.idade_media ?? 0}`,
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
        {renderWinnerImages("azul")}
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
                numbers={[numero, 0]}
                teamName={nomeEncontrado || `Time ${numero}`}
                variant="resultado"
              />
            );
          })}

        <div className={styles.rankingPoints}></div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {getRankingPointImages(pontosAlianca_Azul).map((id, index) => (
            <ImageById
              key={`rp-vermelho-${index}`}
              id={id}
              alt="Ranking Points"
              style={{
                width: "80px",
                height: "80px",
                aspectRatio: "260 / 260",
              }}
              pasta="rankingpoints"
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
