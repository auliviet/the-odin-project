import { Router } from "express";
import getBook from "../controllers/bookController.ts";

export const bookRouter = Router();

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.get("/:bookId", getBook);
