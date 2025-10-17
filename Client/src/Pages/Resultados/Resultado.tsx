import styles from "../../Styles/Resultado.module.css";
import ImageById from "../../Components/ImageById"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import TeamBox from "../../Components/TeamBox";
import Placar from "../../Components/Placar";
import GridTable from "../../Components/GridTable";

export default function Resultado() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.equipesRed}>

      <div style={{ display: "flex", justifyContent: "center", gap: "5px", flexDirection: "column", alignItems: "center"}}>
        <ImageById id={22} alt="Imagem 1" style={{ width: "100%", height: "100%", maxWidth: "300px", aspectRatio: "2037 / 1011" }} pasta="winner" />
        <ImageById id={23} alt="Imagem 2" style={{ width: "100%", maxWidth: "300px", aspectRatio: "2037 / 319" }} pasta="winner" />
      </div>

        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />
        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />
        <TeamBox color="red" numbers={[40009, 4096, 1]} teamName="Team Teste" />

        <div className={`${styles.rankingPoints}`}></div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", gap:"10px"}}>
          <ImageById id={1} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
          <ImageById id={4} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
          <ImageById id={2} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
          <ImageById id={3} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
          <ImageById id={3} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
        </div>
      </div>
      <div className={styles.placarContainer}>
        <Placar className={styles.placar} variant="winner" scoreLeft={120} scoreRight={125} />
          <GridTable
          data={[
            ["A1", "B1", "C1"],
            ["A2", "B2", "C2"],
            ["A3", "B3", "C3"],
            ["A4", "B4", "C4"],
              ]}
            />
      </div>
      <div className={styles.equipesBlue}>

        <div style={{ display: "flex", justifyContent: "center", gap: "5px", flexDirection: "column", alignItems: "center"}}>
          <ImageById id={22} alt="Imagem 1" style={{ width: "100%", height: "100%", maxWidth: "300px", aspectRatio: "2037 / 1011" }} pasta="winner" />
          <ImageById id={23} alt="Imagem 2" style={{ width: "100%", maxWidth: "300px", aspectRatio: "2037 / 319" }} pasta="winner" />
        </div>
        
        <TeamBox color="blue" numbers={[40009, 4096, 1]} teamName="Team Teste" />
        <TeamBox color="blue" numbers={[40009, 4096, 1]} teamName="Team Teste" />
        <TeamBox color="blue" numbers={[40009, 4096, 1]} teamName="Team Teste" />

        <div className={`${styles.rankingPoints}`}/>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", gap:"10px"}}>
          <ImageById id={11} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
          <ImageById id={14} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
          <ImageById id={12} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
          <ImageById id={13} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
          <ImageById id={13} alt="Ranking Points" style={{ width: "65px", height: "65px", aspectRatio: "260 / 260"}} pasta="rankingpoints"/>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
