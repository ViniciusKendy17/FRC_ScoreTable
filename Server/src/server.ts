import express, { type Request, type Response } from "express";
import { Server } from "socket.io";
import { getWS, SetUpWs } from "./ws/ws";
import { SetScores } from "./ws/wsService";
import router from "./Routers/Router";
import cors from "cors"
const app = express();

app.use(express.json())
app.use(cors())

app.get("/hello", (req: Request, res: Response) => {
  res.json("Hello FRC");
});

//WebSocket setup
SetUpWs();
SetScores();

//Base Router
app.use('/frc/', router);

app.listen(3000, "0.0.0.0", () => {
  console.log("Rodando");
});
