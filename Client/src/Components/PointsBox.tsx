import styles from "../Style/Partida.module.css";

interface PointsBoxProps {
  colorClass: "red" | "red1" | "blue" | "blue1"; // agora inclui blue1
  pointsText: string;
  transform?: string;
}

export default function PointsBox({ colorClass, pointsText, transform }: PointsBoxProps) {
  const boxClass =
    colorClass === "red"
      ? styles.red
      : colorClass === "red1"
      ? styles.red1
      : colorClass === "blue"
      ? styles.blue
      : styles.blue1; 

  return (
    <div className={`${styles.box} ${boxClass}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            transform: transform || "translate(20px, 8.5px)",
          }}
        >
          <p className={styles.tipografia}>{pointsText}</p>
        </div>
      </div>
    </div>
  );
}
