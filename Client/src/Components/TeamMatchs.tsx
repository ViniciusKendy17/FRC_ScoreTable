import styles from "../styles/Partida.module.css";

type TeamMatchsProps = {
  leftTeams: number[]; // deixamos opcional
  rightTeams: number[]; // idem
};

export default function TeamMatchs({
  leftTeams = [],
  rightTeams = [],
}: TeamMatchsProps) {
  return (
    <div className={styles.containerEquipes}>
      <div className={styles.equipeBox}>
        {leftTeams ? (
          leftTeams?.map((team, index) => (
            <p key={`left-${index}`} className={styles.tipografiaEquipes}>
              {team}
            </p>
          ))
        ) : (
          <p className={styles.tipografiaEquipes}>--</p> // mostra algo vazio
        )}
      </div>

      <div className={styles.equipeBox}>
        {rightTeams ? (
          rightTeams.map((team, index) => (
            <p key={`right-${index}`} className={styles.tipografiaEquipes}>
              {team}
            </p>
          ))
        ) : (
          <p className={styles.tipografiaEquipes}>--</p>
        )}
      </div>
    </div>
  );
}
