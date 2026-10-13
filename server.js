const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  let requestedPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (requestedPath === "/") requestedPath = "/index.html";

  // Prevent requests from escaping the project folder.
  const filePath = path.resolve(PUBLIC_DIR, "." + requestedPath);
  if (!filePath.startsWith(PUBLIC_DIR + path.sep) && filePath !== path.join(PUBLIC_DIR, "index.html")) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("403 Forbidden");
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      const status = error.code === "ENOENT" ? 404 : 500;
      res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(status === 404 ? "404 - File Not Found" : "500 - Server Error");
    }

    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "X-Content-Type-Options": "nosniff"
    });
    res.end(content);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`FoodBridge is running at http://localhost:${PORT}`);
});
