import styles from "../styles/Resultado.module.css";
import stylesClassificaco from "../styles/Classificacao.module.css";

interface GridTableProps {
  rows?: number; 
  columns?: number; 
  data?: (string | number)[][];
  variant?: "resultado" | "classificacao"; // novo parâmetro
}

export default function GridTable({
  rows = 4,
  columns = 3,
  data,
  variant = "resultado",
}: GridTableProps) {
  const tableData = data || Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => "")
  );

  // Escolhe a classe baseada no variant
  const tableClass =
    variant === "resultado"
      ? styles.tipografiaResultado
      : stylesClassificaco.tipografia;

  return (
    <table className={tableClass}>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
