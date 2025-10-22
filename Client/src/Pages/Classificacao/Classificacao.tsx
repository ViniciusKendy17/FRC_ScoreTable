import Footer from '../../Components/Footer';
import GridTable from '../../Components/GridTable';
import Header from '../../Components/HeaderPages'
import styles from '../../styles/Classificacao.module.css'; // ← import direto do CSS global
import { useEffect, useState } from 'react';

export default function Classificacao() {
  const endpoint = 'http://172.25.10.14:3000/frc/';
  const [rankingData, setRankingData] = useState<any[]>([]);

  const getRanking = async () => {
    try {
      const response = await fetch(endpoint + "ranking");
      if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

      const json = await response.json();
      const sorted = ranking(json.ranking);
      setRankingData(sorted);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Falha ao buscar ranking:", error.message);
      } else {
        console.error("Falha ao buscar ranking:", String(error));
      }
    }
  };

  const ranking = (data: any[]) => {
    return [...data].sort((a, b) => {
      const rpA = Number(a.total_rp);
      const rpB = Number(b.total_rp);

      if (rpA !== rpB) return rpB - rpA;
      const scoreA = Number(a.ranking_score);
      const scoreB = Number(b.ranking_score);
      return scoreB - scoreA;
    });
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
            rows={6}
            columns={6}
            data={[
              ['Rank', 'Team', 'Ranking \nScore', 'AVG\nMatch', 'Record\n(W-L-T)', 'Total Ranking\nPoints'],
              ...rankingData.map((team, index) => [
                index + 1,
                team.numero_equipe,
                team.ranking_score,
                team.match_score,
                `${team.vitorias}-${team.derrotas}-${team.empates}`,
                team.ranking_score
              ])
            ]}
          />
        </div>
      </div>
      <Footer text="FRC Score Table" />
    </div>
  );
}
