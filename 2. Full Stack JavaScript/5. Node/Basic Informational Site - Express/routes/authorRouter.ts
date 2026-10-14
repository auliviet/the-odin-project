import { Router } from "express";
import { getAuthor, getAuthors } from "../controllers/authorController.ts";

export const authorRouter = Router();

authorRouter.get("/", getAuthors);
authorRouter.get("/:authorId", getAuthor);
