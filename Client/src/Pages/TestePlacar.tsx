import { useEffect, useState, type ChangeEvent } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { io, Socket } from "socket.io-client";

const sc = io("http://10.100.10.58:3001");

interface Scores {
  bola: number;
  boia: number;
  total: number;
}

export default function TestePlacar() {
  const [score, SetScore] = useState<Scores>({ boia: 0, bola: 0, total: 0 });

  useEffect(() => {
    SetScore((prev) => ({ ...prev, total: prev.boia + prev.bola }));
    sc.emit("up_score", score.boia + score.bola);
  }, [score.bola, score.boia]);

  useEffect(() => {
    sc.on("score_update", (novoScore: { bola: number; boia: number }) => {
      SetScore((prev) => ({
        ...prev,
        ...novoScore,
        total: novoScore.bola + novoScore.boia,
      }));
    });

    return () => {
      sc.off("score_update");
    };
  }, []);

  return (
    <>
      <input
        type="number"
        value={score.bola}
        onChange={(e) =>
          SetScore((prev) => ({ ...prev, bola: Number(e.target.value) }))
        }
      />

      <input
        type="number"
        value={score.boia}
        onChange={(e) =>
          SetScore((prev) => ({ ...prev, boia: Number(e.target.value) }))
        }
      />
    </>
  );
}
