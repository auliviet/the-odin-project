import { Router } from "express";
import { getBook, getBooks } from "../controllers/bookController.ts";

export const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:bookId", getBook);
