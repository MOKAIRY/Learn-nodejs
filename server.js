import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  res.end("Hello From The Server!");
});

server.listen(PORT, () => console.log("Server running on port: 8000"));
