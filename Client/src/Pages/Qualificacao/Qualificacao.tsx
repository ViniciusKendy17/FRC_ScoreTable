import Footer from "../../Components/Footer";
import Header from "../../Components/HeaderPages";
import TeamBox from "../../Components/TeamBox";
import styles from "../../Styles/Qualificacao.module.css";
import Placar from "../../Components/Placar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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


export default function Qualificacao() {
  const { id } = useParams<{ id: string }>();
  const endpoint = "http://172.25.10.13:3000/frc/";

  const [data, setData] = useState<Alianca[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState<any[]>([]);
  const [numero_partida, setNumeroPartida] = useState<number | null>(null);

<<<<<<< HEAD
  const endpoint = 'http://172.25.10.13:3000/frc/';
  const [data, setData] = useState<any[]>([]);

  const getMatches = async () => {
=======
  const getNomes = async () => {
>>>>>>> 4460994f9b49d0415b67b5a00baa92d85ca9d8d9
    try {
      const response = await fetch(`${endpoint}teams`);
      if (!response.ok) throw new Error(`Erro ${response.status}`);
      const json = await response.json();
      const teamNames: TeamInfo[] = json.equipes.map((team: any) => ({
        id: team.numero_equipe,
        nome: team.nome
      }));
      setNome(teamNames)
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

    getNomes();
    getNumeroPartida();

    if (id) getMatch();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!Array.isArray(data) || data.length === 0)
    return <p>Nenhum dado encontrado.</p>;

  return (
    <div className={styles.container}>
      <Header title={`Qualificatória #${numero_partida}`} />

      <div className={` ${styles.equipesRed} ${styles.equipesRedBox}`}>
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
                numbers={[numero, 0, ]}
                teamName={nomeEncontrado || `Time ${numero}`}
                variant="qualificatoria"
              />
            );
          })}
      </div>

      <div className={styles.containerPlacar}>
        <Placar className={styles.placar} />
      </div>

      <div className={`${styles.equipesBlue} ${styles.equipesBlueBox}`}>
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
                variant="qualificatoria"
              />
            );
          })}
      </div>

      <Footer text="FRC Score Table" />
    </div>
  );
}
