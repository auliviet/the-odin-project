import { Router } from "express";
import getAuthor from "../controllers/authorController.ts";

export const authorRouter = Router();

authorRouter.get("/", (req, res) => res.send("All authors"));
authorRouter.get("/:authorId", getAuthor);
