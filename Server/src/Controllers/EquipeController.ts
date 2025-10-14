import { Request, Response } from "express";
import { Equipe } from "../Models/Equipe";
import { Prisma, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function GetTeams(req: Request, res: Response) {}

export async function UpdateScore(req: Request, res: Response) {}

export async function GetRanking(res: Response) {}
