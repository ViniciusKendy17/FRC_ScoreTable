import { Server } from "socket.io";

let io: Server;

export function SetUpWs() {
  if (io) return io;

  io = new Server(3001, {
    cors: {
      origin: "*",
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.sockets.setMaxListeners(20);

  io.on("connection", (socket) => {
    io.on("disconnect", () => {
      console.log("disconnected");
    });
  });

  return io;
}

export function getWS() {
  if (!io) {
    throw new Error("Socket io não foi conectado corretamentes");
  } else {
    return io;
  }
}
