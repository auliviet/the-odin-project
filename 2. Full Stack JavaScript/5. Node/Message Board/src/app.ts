import express, {
  Router,
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { messageRouter } from "./routes/messages.ts";
import { userRouter } from "./routes/users.ts";
import { ErrorNotFound } from "./errors/customErrors.ts";

// Load environment variables
try {
  process.loadEnvFile();
} catch (err) {}

// Create app
const app: Express = express();
const PORT = process.env.PORT ?? 3000;
const BASE_PATH = process.env.BASE_PATH ?? "";
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(BASE_PATH, express.static("static"));

// Routes
const appRouter = Router();
appRouter.use("/", messageRouter);
appRouter.use("/users", userRouter);
appRouter.get("/{*splat}", (req, res) => {
  throw new ErrorNotFound("Page not found");
});
app.use(BASE_PATH, appRouter);

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .render("error", { statusCode: err.statusCode, message: err.message });
});

// Start app
app.listen(PORT, (err: unknown) => {
  if (err) {
    throw err;
  }

  console.log(`Express app running on port ${PORT}`);
});
