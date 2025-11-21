import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

type Score = {
  azul: number;
  vermelho: number;
};

export default function TesteJuiz() {
  const [scores, SetScores] = useState<Score>({ azul: 0, vermelho: 0 });
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Cria a conexão apenas uma vez
    socketRef.current = io("http://10.100.10.58:3001", {
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket!", socket.id);
    });

    socket.on("score_update", (data: Score) => {
      SetScores(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <p>Azul: {scores.azul}</p>
      <p>Vermelho: {scores.vermelho}</p>
    </>
  );
}
