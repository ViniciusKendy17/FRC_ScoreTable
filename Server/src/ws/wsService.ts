import { Alianca } from "../Models/Alianca";
import { getWS } from "./ws";

type Score = {
  azul: number;
  vermelho: number;
};

const matches: Record<number, Score> = {};

let scoreSetup = false;

export function SetScores() {
  if (scoreSetup) return;

  scoreSetup = true;

  const io = getWS();

  let scores: Score = {
    azul: 0,
    vermelho: 0,
  };

  io.on("connection", (socket) => {
    console.log("Juiz conectado:", socket.id);

    socket.emit("score_update", scores);

    socket.on(
      "update_alliance_score",
      (payload: {
        alliance: "vermelho" | "azul";
        total: number;
        score: Alianca;
      }) => {
        scores[payload.alliance] = payload.total;

        console.log(payload);

        io.emit("score_update", scores);
      }
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
}
