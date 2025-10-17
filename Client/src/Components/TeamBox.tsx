import styles from "../Style/Qualificacao.module.css";

interface TeamBoxProps {
  color: "red" | "blue";
  numbers: [number, number, number];
  teamName: string;
  justifyNumbers?: "space-between" | "center"; // nova prop para controlar alinhamento
  widthNumbers?: string;                       // largura opcional para o container dos números
}

export default function TeamBox({
  color,
  numbers,
  teamName,
  justifyNumbers = "space-between",
  widthNumbers = "clamp(445px, 25%, 450px)"
}: TeamBoxProps) {
  return (
    <div className={`${styles.box} ${color === "red" ? styles.red : styles.blue}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: justifyNumbers, // usa a prop
          width: widthNumbers,            // usa a prop
          padding: "0 10px",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <p className={styles.tipografia}>{numbers[0]}</p>
          <p className={styles.tipografia}>{numbers[1]}</p>
        </div>
        <p className={styles.tipografia}>{numbers[2]}</p>
      </div>

      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          padding: "5px",
        }}
      >
        <p
          className={styles.tipografia}
          style={{ color: "black", fontWeight: "bold", fontStyle: "italic" }}
        >
          {teamName}
        </p>
      </div>
    </div>
  );
}
