import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

type Score = {
  azul: number;
  vermelho: number;
};

export default function TesteJuiz() {
  const [scores, SetScores] = useState<Score>({ azul: 0, vermelho: 0 });

  const sc = useMemo(() => io("http://localhost:3001"), []);

  useEffect(() => {
    const handleUpdate = (data: Score) => {
      SetScores(data);
    };

    sc.on("score_update", handleUpdate);

    return () => {
      sc.off("score_update", handleUpdate); // remove listener corretamente
    };
  }, []);
  console.log(scores);

  return (
    <>
      <p>{scores.azul}</p>
      <p>{scores.vermelho}</p>
    </>
  );
}
