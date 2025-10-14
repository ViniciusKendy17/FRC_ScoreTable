import { getWS } from "./ws";

export function SetScores() {
  const io = getWS();

  let score = "e";

  io.on("connection", (socket) => {
    socket.on("up_score", (new_score) => {
      score = new_score;
      io.emit("score_update", score);
    });

    

  });
}
