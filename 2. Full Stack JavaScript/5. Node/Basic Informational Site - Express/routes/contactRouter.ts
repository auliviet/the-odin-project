import { Router, type Request, type Response } from "express";

export const contactRouter = Router();

contactRouter.get("/", (req: Request, res: Response) => {
  res.render("contact");
});
