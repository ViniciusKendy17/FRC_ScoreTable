 import Footer from '../../Components/Footer';
import GridTable from '../../Components/GridTable';
import Header from '../../Components/HeaderPages';
import styles from '../../styles/Classificacao.module.css';
import { useEffect, useState } from 'react';

type Equipe = {
  numero_equipe: number;
  nome: string;
  total_rp: string | number;
  ranking_score: string | number;
  match_score: string | number;
  vitorias: string | number;
  derrotas: string | number;
  empates: string | number;
};

type EquipeComPosicao = Equipe & { posicao: number };

export default function Classificacao() {
  const endpoint = 'http://192.168.0.100:3000/frc/';
  const [rankingData, setRankingData] = useState<EquipeComPosicao[]>([]);

  // 🔹 Função principal de ordenação com critérios múltiplos
  const calcularRanking = (equipes: Equipe[]) => {
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

    // adiciona posição
    return ordenado.map((team, index) => ({
      ...team,
      posicao: index + 1,
    }));
  };

  // 🔹 Busca o ranking no servidor
  const getRanking = async () => {
    try {
      const response = await fetch(endpoint + "ranking");
      if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

      const json = await response.json();
      const sorted = calcularRanking(json.ranking);
      setRankingData(sorted);
      console.log(sorted)
    } catch (error) {
      if (error instanceof Error) {
        console.error("Falha ao buscar ranking:", error.message);
      } else {
        console.error("Falha ao buscar ranking:", String(error));
      }
    }
  };

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <div className={styles.container}>
      <Header title="Classificação" />
      <div className={styles.content}>
        <div className={styles.containerTable}>
          <GridTable
            variant="classificacao"
            rows={rankingData.length + 1}
            columns={6}
            data={[
              ['Rank', 'Team', 'Ranking\nScore', 'AVG\nMatch', 'Record\n(W-L-T)', 'Total\nRanking Points'],
              ...rankingData.map((team) => [
                team.posicao,
                `${team.numero_equipe}`,
                team.ranking_score,
                team.match_score,
                `${team.vitorias}-${team.derrotas}-${team.empates}`,
                team.total_rp
              ])
            ]}
          />
        </div>
      </div>
      <Footer text="FRC Score Table" />
    </div>
  );
}