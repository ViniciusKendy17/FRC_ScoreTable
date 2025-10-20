import "../Styles/Partida.css"; // ← usando CSS global

interface TeamMatchsProps {
  leftTeams: number[];  // Ex: [9991, 9992, 9993]
  rightTeams: number[]; // Ex: [9994, 9995, 9996]
}

export default function TeamMatchs({ leftTeams, rightTeams }: TeamMatchsProps) {
  return (
    <div className="containerEquipes">
      <div className="equipeBox">
        {leftTeams.map((team, index) => (
          <p key={`left-${index}`} className="tipografiaEquipes">
            {team}
          </p>
        ))}
      </div>

      <div className="equipeBox">
        {rightTeams.map((team, index) => (
          <p key={`right-${index}`} className="tipografiaEquipes">
            {team}
          </p>
        ))}
      </div>
    </div>
  );
}
