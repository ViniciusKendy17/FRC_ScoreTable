import { Server } from "socket.io";

let io: Server;

export function SetUpWs() {
  if (io) return io;

  io = new Server(3001, {
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cors: {
      origin: "*",
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.sockets.setMaxListeners(10);

  return io;
}

export function getWS() {
  if (!io) {
    throw new Error("Socket io não foi conectado corretamentes");
  } else {
    return io;
  }
}
