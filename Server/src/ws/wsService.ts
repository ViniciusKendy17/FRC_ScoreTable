import { Alianca } from "../Models/Alianca";
import { getWS } from "./ws";

type Score = {
  azul: { total: number; idade_media: number; pre: number };
  vermelho: { total: number; idade_media: number; pre: number };
};

let scoreSetup = false;

export function SetScores() {
  if (scoreSetup) return;

  scoreSetup = true;

  const io = getWS();

  let scores: Score = {
    azul: {
      total: 0,
      idade_media: 0,
      pre: 0,
    },
    vermelho: {
      total: 0,
      idade_media: 0,
      pre: 0,
    },
  };

  io.on("connection", (socket) => {
    console.log("Juiz conectado:", socket.id);

    socket.emit("score_update", scores);

    socket.on(
      "update_alliance_score",
      (payload: {
        alliance: "vermelho" | "azul";
        total: number;
        score: { idade_media: number; pre: number };
      }) => {
        scores[payload.alliance] = {
          total: payload.total,
          idade_media: payload.score.idade_media,
          pre: payload.score.pre,
        };

        console.log(payload);

        io.emit("score_update", scores);
      }
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
}
