import { Router, type Request, type Response } from "express";

export const homeRouter = Router();

homeRouter.get("/", (req: Request, res: Response) => {
  res.render("index");
});
