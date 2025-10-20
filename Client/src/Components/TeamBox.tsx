import "../Styles/TeamBox.css"; // ← Importa o CSS global

interface TeamBoxProps {
  color: "red" | "blue";
  numbers: [number, number, number];
  teamName: string;
  justifyNumbers?: "space-between" | "center";
  widthNumbers?: string;
}

export default function TeamBox({
  color,
  numbers,
  teamName,
  justifyNumbers = "space-between",
  widthNumbers = "clamp(445px, 25%, 450px)",
}: TeamBoxProps) {
  return (
    <div className={`box ${color}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: justifyNumbers,
          width: widthNumbers,
          padding: "0 10px",
          maxWidth: "800px",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <p className="tipografia">{numbers[0]}</p>
        </div>
        <p className="tipografia">{numbers[2]}</p>
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
          className="tipografia"
          style={{ color: "black", fontWeight: "bold", fontStyle: "italic" }}
        >
          {teamName}
        </p>
      </div>
    </div>
  );
}
