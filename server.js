import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    res.write("Request URL: " + req.url + "\n");
    res.write("Request Method: " + req.method + "\n");
    res.end("Hello From The Server!", () =>
      console.log("A Connection Has Been Closed.")
    );
  } else {
    res.end("Sorry, Bad Request", () =>
      console.log("A Bad Connection Has Been Closed.")
    );
  }
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
