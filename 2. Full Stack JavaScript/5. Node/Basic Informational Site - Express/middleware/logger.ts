import type { NextFunction, Request, Response } from "express";

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log("Requested URL:", req.url);
  console.log("Requested params:", req.params);
  next();
}
