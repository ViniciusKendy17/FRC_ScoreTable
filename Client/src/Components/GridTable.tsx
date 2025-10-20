import "../Styles/Resultado.css";
import "../Styles/Classificacao.css";

interface GridTableProps {
  rows?: number; 
  columns?: number; 
  data?: (string | number)[][];
  variant?: "resultado" | "classificacao";
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

  // Define a classe conforme o tipo de tabela
  const tableClass =
    variant === "resultado" ? "tipografiaResultado" : "tipografia";

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
