import Footer from "../../Components/Footer";
import Header from "../../Components/HeaderPages";
import TeamBox from "../../Components/TeamBox";
import styles from "../../Styles/Qualificacao.module.css";
import Placar from '../../Components/Placar';
import { useEffect, useState } from 'react';

export default function Qualificacao() {

  const endpoint = 'http://172.25.10.13:3000/frc/';
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
      <Header title="Qualificatoria" />

      <div className={styles.equipesRed}>
        <TeamBox color="red" numbers={[40009, 1]} teamName="Team Teste" variant="qualificatoria"/>
        <TeamBox color="red" numbers={[40009, 1]} teamName="Team Teste" variant="qualificatoria"/>
        <TeamBox color="red" numbers={[40009, 1]} teamName="Team Teste" variant="qualificatoria"/>
      </div>

      <div className={styles.containerPlacar}>
       <Placar className={styles.placar}/>
      </div>

      <div className={styles.equipesBlue}>
        <TeamBox
          color="blue"
          numbers={[40009,  1]}
          teamName="Team Teste"
          variant="qualificatoria"
        />
        <TeamBox
          color="blue"
          numbers={[40009,  1]}
          teamName="Team Teste"
          variant="qualificatoria"
        />
        <TeamBox
          color="blue"
          numbers={[40009,  1]}
          teamName="Team Teste"
          variant="qualificatoria"
        />
      </div>

      <Footer text="FRC Score Table" />
    </div>
  );
}
