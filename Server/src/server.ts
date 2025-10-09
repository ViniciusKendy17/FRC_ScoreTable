
import express, { type Request, type Response } from "express";

const app = express();

app.get('/hello', (req: Request, res: Response) => {
    res.json("Hello FRC");
})

app.listen(3000, () => console.log("Rodando"))

