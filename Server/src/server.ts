import express, { type Request, type Response } from "express";
import { Server } from "socket.io";
const app = express();

app.get("/hello", (req: Request, res: Response) => {
  res.json("Hello FRC");
});

const io = new Server(3001, {
  cors: {
    origin: ["http://localhost:5173"],
    allowedHeaders: ["*"],
    credentials: true
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

app.listen(3000, () => {
  console.log("Rodando");
});
