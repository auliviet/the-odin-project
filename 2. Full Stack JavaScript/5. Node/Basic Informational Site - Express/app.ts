import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import fs from "node:fs/promises";
import { authorRouter } from "./routes/authorRouter.ts";
import { bookRouter } from "./routes/bookRouter.ts";
import requestLogger from "./middleware/logger.ts";
import { ServerError, type NotFoundError } from "./errors/errors.ts";

try {
  process.loadEnvFile();
} catch (err) {}

const app: Express = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(requestLogger);
app.use(express.static("static"));
app.use(
  express.static("views", {
    extensions: ["html"],
  }),
);

// Routes
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.use(
  (
    err: NotFoundError | ServerError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.error(err);
    res.statusCode = err.statusCode;
    res.send(err.message);
  },
);

app.listen(PORT, (err: unknown) => {
  if (err) {
    throw err;
  }

  console.log(`Express app running on port ${PORT}`);
});
