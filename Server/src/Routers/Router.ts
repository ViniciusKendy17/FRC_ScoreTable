import express, { Request, Response } from "express";
import { GetRanking, GetTeams } from "../Controllers/EquipeController";
import { GetAllMatches, NewMatch } from "../Controllers/PartidaController";

const router = express.Router();

//All posts
router.post("/match/new", NewMatch);

//All gets
router.get("/teams", GetTeams);
router.get("/matches", GetAllMatches);
router.get("/ranking", GetRanking);

//All updates


//All deletes

export default router;
