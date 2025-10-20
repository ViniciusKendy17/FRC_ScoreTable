import "../Styles/Partida.css"; // ← agora é CSS global

interface PointsBoxProps {
  colorClass: "redpartida" | "red1" | "bluepartida" | "blue1";
  pointsText: string;
  transform?: string;
}

export default function PointsBox({
  colorClass,
  pointsText,
  transform,
}: PointsBoxProps) {
  return (
    <div className={`box ${colorClass}`}>
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
          <p className="tipografiaPartida">{pointsText}</p>
        </div>
      </div>
    </div>
  );
}
