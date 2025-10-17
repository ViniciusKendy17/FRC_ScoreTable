import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import TeamBox from "../../Components/TeamBox";
import styles from "../../Style/Qualificacao.module.css";
import Placar from "../../Components/Placar";
import { useEffect, useState } from "react";

export default function Qualificacao() {
  const endpoint = "http://172.25.10.14:3000/frc/";
  const [data, setData] = useState<any[]>([]);

  const getMatches = async () => {
    try {
      const response = await fetch(endpoint + "matches");
      if (!response.ok)
        throw new Error(`Erro na requisição: ${response.status}`);

      const json = await response.json();
      setData(json); // <-- atualiza o estado
      console.log(json);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Falha ao buscar matches:", error.message);
      } else {
        console.error("Falha ao buscar matches:", String(error));
      }
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div className={styles.container}>
      <Header
        title="Qualificatoria"
        pesquisa={""}
        SetPesquisa={undefined}
        showpesquisa={false}
        id_partida={0}
      />

      <div className={styles.equipesRed}>
        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />
        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />
        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />
      </div>

      <div className={styles.containerPlacar}>
        <Placar className={styles.placar} />
      </div>

      <div className={styles.equipesBlue}>
        <TeamBox
          color="blue"
          numbers={[40009, 4096, 1]}
          teamName="Team Teste"
        />
        <TeamBox
          color="blue"
          numbers={[40009, 4096, 1]}
          teamName="Team Teste"
        />
        <TeamBox
          color="blue"
          numbers={[40009, 4096, 1]}
          teamName="Team Teste"
        />
      </div>

      <Footer text="FRC Score Table" />
    </div>
  );
}
