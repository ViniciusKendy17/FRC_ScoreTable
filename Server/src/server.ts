
import express, { type Request, type Response } from "express";
import { Cor } from "./Models/Alianca";
import { type Alianca } from "./Models/Alianca";
const app = express();

app.get('/hello', (req: Request, res: Response) => {
    res.json("Hello FRC");
})


app.listen(3000, () => {
    console.log("Rodando")
})

