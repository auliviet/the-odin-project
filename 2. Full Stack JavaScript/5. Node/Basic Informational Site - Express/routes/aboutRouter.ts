import { Router, type Request, type Response } from "express";

export const aboutRouter = Router();

aboutRouter.get("/", (req: Request, res: Response) => {
  res.render("about");
});
