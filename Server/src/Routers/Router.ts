import express, { Request, Response } from "express";
import { GetRanking, GetTeams } from "../Controllers/EquipeController";
import {
  DeleteMatch,
  EditMatch,
  EndJudgeScores,
  EndMatch,
  GetAllMatches,
  NewMatch,
} from "../Controllers/PartidaController";

const router = express.Router();

//All posts
router.post("/match/new", NewMatch);

//All gets
router.get("/teams", GetTeams);
router.get("/matches", GetAllMatches);
router.get("/ranking", GetRanking);

//All updates
router.patch("/match/edit/:match_id", EditMatch);
router.patch("/match/judge/end/:match_id", EndJudgeScores);
router.patch("/match/end/:match_id", EndMatch);

//All deletes
router.delete("/match/delete/:match_id", DeleteMatch);

export default router;
