import { Request, Response } from "express";
import { Alianca, Cor } from "../Models/Alianca";
import { hasValues } from "../Services/GenericServices";



export async function UpdateAlianceScore(req: Request, res: Response) {
  const alianca: Alianca = req.body;

  if (!hasValues(alianca)) {
    return res.status(400).json({ msg: "Preencha todos os valores" });
  }
}
