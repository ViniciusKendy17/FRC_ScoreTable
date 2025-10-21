import React from "react";
import styles from "../Styles/Partida.module.css";

interface TeamMatchsProps {
  leftTeams: number[];  // Ex: [9991, 9992, 9993]
  rightTeams: number[]; // Ex: [9994, 9995, 9996]
}

export default function TeamMatchs({ leftTeams, rightTeams }: TeamMatchsProps) {
  return (
      <div className={styles.containerEquipes}>
        <div className={styles.equipeBox}>
          {leftTeams.map((team, index) => (
            <p key={`left-${index}`} className={styles.tipografiaEquipes}>
              {team}
            </p>
          ))}
        </div>

        <div className={styles.equipeBox}>
          {rightTeams.map((team, index) => (
            <p key={`right-${index}`} className={styles.tipografiaEquipes}>
              {team}
            </p>
          ))}
        </div>
      </div>
  );
}
