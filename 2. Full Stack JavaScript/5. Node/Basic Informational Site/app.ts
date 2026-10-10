import { createServer } from "node:http";
import fs from "node:fs/promises";

const hostname = "localhost";
const port = 8080;
const routes: Record<string, string> = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact.html",
  "/styles.css": "styles.css",
};

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", `http://${hostname}`);

  let response;

  try {
    const file = routes[pathname];
    response = await serve(file);
    res.setHeader(
      "Content-Type",
      file.endsWith(".css") ? "text/css" : "text/html; charset=utf-8",
    );
  } catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    response = await serve("/404.html");
  }

  res.end(response);
});

async function serve(url: string | undefined) {
  const filepath = "www/" + url;
  return await fs.readFile(filepath);
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
