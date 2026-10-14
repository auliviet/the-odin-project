import express, { type Express, type Request, type Response } from "express";
import fs from "node:fs/promises";

try {
  process.loadEnvFile();
} catch (err) {}

const app: Express = express();
const PORT = process.env.PORT ?? 3000;

app.get("/", async (req, res) => {
  await serve(res, "www/index.html");
});

app.get("/about", async (req, res) => {
  await serve(res, "www/about.html");
});

app.get("/contact", async (req, res) => {
  await serve(res, "www/contact.html");
});

app.get("/styles.css", async (req, res) => {
  await serve(res, "www/styles.css", "text/css; charset=utf-8");
});

app.get("/{*splat}", async (req, res) => {
  res.statusCode = 404;
  await serve(res, "www/404.html");
});

app.listen(PORT, (err: unknown) => {
  if (err) {
    throw err;
  }

  console.log(`Express app running on port ${PORT}`);
});

async function serve(res: Response, url: string, contentType?: string) {
  if (contentType) res.setHeader("Content-Type", contentType);

  try {
    const data = await fs.readFile(url);
    res.end(data);
  } catch (err: unknown) {
    throw err;
  }
}
