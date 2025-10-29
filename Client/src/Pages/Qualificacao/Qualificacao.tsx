import Footer from "../../Components/Footer";
import Header from "../../Components/HeaderPages";
import TeamBox from "../../Components/TeamBox";
import styles from "../../Styles/Qualificacao.module.css";
import Placar from "../../Components/Placar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Alianca {
  id: number;
  color: "azul" | "vermelho";
  time1: number;
  time2: number;
  partida_id: number;
  total_pontos: number;
}

interface TeamInfo {
  id: number;
  nome: string;
}

interface RankingInfo {
  numero_equipe: number;
  nome: string;
  total_rp: string | number;
  ranking_score: string | number;
  match_score: string | number;
  vitorias: string | number;
  derrotas: string | number;
  empates: string | number;
  posicao?: number;
}

export default function Qualificacao() {
  const { id } = useParams<{ id: string }>();
  const endpoint = "http://192.168.0.104:3000/frc/";
  const [data, setData] = useState<Alianca[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState<TeamInfo[]>([]);
  const [numero_partida, setNumeroPartida] = useState<number | null>(null);
  const [ranking, setRanking] = useState<RankingInfo[]>([]);
  const navigate = useNavigate();

  // 🔹 Função para ordenar o ranking com critérios múltiplos
  const calcularRanking = (equipes: RankingInfo[]) => {
    const ordenado = [...equipes].sort((a, b) => {
      const rpA = Number(a.total_rp);
      const rpB = Number(b.total_rp);
      if (rpB !== rpA) return rpB - rpA;

      const rsA = Number(a.ranking_score);
      const rsB = Number(b.ranking_score);
      if (rsB !== rsA) return rsB - rsA;

      const msA = Number(a.match_score);
      const msB = Number(b.match_score);
      if (msB !== msA) return msB - msA;

      const vitA = Number(a.vitorias);
      const vitB = Number(b.vitorias);
      return vitB - vitA;
    });

    return ordenado.map((t, i) => ({ ...t, posicao: i + 1 }));
  };

  const getRanking = async () => {
    try {
      const res = await fetch(`${endpoint}ranking`);
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const json = await res.json();
      const sorted = calcularRanking(json.ranking);
      setRanking(sorted);
    } catch (err) {
      console.error("Erro ao buscar ranking:", err);
    }
  };

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
    } catch (error) {
      console.error("Erro ao buscar nomes dos times:", error);
    }
  };

  const getNumeroPartida = async () => {
    try {
      const response = await fetch(`${endpoint}matches`);
      if (!response.ok) throw new Error(`Erro ${response.status}`);
      const json = await response.json();

      const partidaEncontrada = json.partidas.find(
        (p: any) => p.id.toString() === id
      );
      const numero = partidaEncontrada?.numero_partida ?? null;

      setNumeroPartida(numero);
    } catch (error) {
      console.error("Erro ao buscar partida:", error);
    }
  };

  useEffect(() => {
    const getMatch = async () => {
      try {
        const response = await fetch(`${endpoint}match/${id}/alliances`);
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        const json = await response.json();
        setData(json.aliancas || []);
      } catch (error) {
        console.error("Erro ao buscar partida:", error);
      } finally {
        setLoading(false);
      }
    };

    getRanking();
    getNomes();
    getNumeroPartida();
    if (id) getMatch();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        navigate(`/partida/${Number(id)}/placar`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, id]);

  if (loading) return <p>Carregando...</p>;
  if (!Array.isArray(data) || data.length === 0)
    return <p>Nenhum dado encontrado.</p>;

  // 🧠 Função para buscar a posição no ranking pelo número do time
  const getPosicao = (numeroEquipe: number): number => {
    return ranking.find((r) => r.numero_equipe === numeroEquipe)?.posicao ?? 0;
  };

  return (
    <div className={styles.container}>
      <Header title={`Qualificatória #${numero_partida}`} />

      {/* 🟥 Equipes Vermelhas */}
      <div className={`${styles.equipesRed} ${styles.equipesRedBox}`}>
        {data
          .filter((t) => t.color === "vermelho")
          .flatMap((t) => [t.time1, t.time2])
          .map((numero, i) => {
            const nomeEncontrado =
              nome.find((team) => team.id === numero)?.nome || `Time ${numero}`;
            const posicao = getPosicao(numero);

            return (
              <TeamBox
                key={`red-${i}`}
                color="red"
                numbers={[numero, posicao]}
                teamName={nomeEncontrado}
                variant="qualificatoria"
              />
            );
          })}
      </div>

      {/* 🟨 Placar */}
      <div className={styles.containerPlacar}>
        <Placar className={styles.placar} />
      </div>

      {/* 🟦 Equipes Azuis */}
      <div className={`${styles.equipesBlue} ${styles.equipesBlueBox}`}>
        {data
          .filter((t) => t.color === "azul")
          .flatMap((t) => [t.time1, t.time2])
          .map((numero, i) => {
            const nomeEncontrado =
              nome.find((team) => team.id === numero)?.nome || `Time ${numero}`;
            const posicao = getPosicao(numero);

            return (
              <TeamBox
                key={`blue-${i}`}
                color="blue"
                numbers={[numero, posicao]}
                teamName={nomeEncontrado}
                variant="qualificatoria"
              />
            );
          })}
      </div>

      <Footer text="FRC Score Table" />
    </div>
  );
}
