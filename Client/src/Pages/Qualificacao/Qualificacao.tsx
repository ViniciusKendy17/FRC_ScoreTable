import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import TeamBox from "../../Components/TeamBox";
import styles from "../../Styles/Qualificacao.module.css";
import Placar from '../../Components/Placar';

export default function Qualificacao() {
  return (
    <div className={styles.container}>
      <Header title="Qualificatoria" />

      <div className={styles.equipesRed}>
        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />
        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />
        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />
      </div>

      <div className={styles.containerPlacar}>
       <Placar className={styles.placar}/>
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
