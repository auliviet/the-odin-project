import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { authorRouter } from "./routes/authorRouter.ts";
import { bookRouter } from "./routes/bookRouter.ts";
import requestLogger from "./middleware/logger.ts";
import { ServerError, type NotFoundError } from "./errors/errors.ts";
import path from "node:path";
import { homeRouter } from "./routes/homeRouter.ts";
import { aboutRouter } from "./routes/aboutRouter.ts";
import { contactRouter } from "./routes/contactRouter.ts";

try {
  process.loadEnvFile();
} catch (err) {}

// Create app
const app: Express = express();
const PORT = process.env.PORT ?? 3000;

// Templates
const __dirname = import.meta.dirname;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const links = [
  { link: "/", label: "Home" },
  { link: "authors", label: "Authors" },
  { link: "books", label: "Books" },
  { link: "about", label: "About" },
  { link: "contact", label: "Contact" },
];

// Middleware
app.use(requestLogger);
app.use(express.static("static"));
app.use((req: Request, res: Response, next: NextFunction) => {
  // Set global variables
  res.locals.links = links;
  next();
});

// Routes
app.use("/", homeRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);

// Error handling
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

// Start app
app.listen(PORT, (err: unknown) => {
  if (err) {
    throw err;
  }

  console.log(`Express app running on port ${PORT}`);
});
