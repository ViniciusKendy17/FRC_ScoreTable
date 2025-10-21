import { getWS } from "./ws";

type Score = {
  azul: number;
  vermelho: number;
};

export function SetScores() {
  const io = getWS();

  let scores: Score = {
    azul: 0,
    vermelho: 0,
  };

  io.on("connection", (socket) => {
    // console.log("Juiz conectado:", socket.id);

    // socket.emit("score_update", scores);

    socket.on(
      "update_alliance_score",
      (payload: { alliance: "vermelho" | "azul"; total: number }) => {
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
