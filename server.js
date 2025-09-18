import http from "node:http";
import { getDataFromDB } from "./database/db.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destination = await getDataFromDB();

  if (req.url === "/api" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    res.write("This is from the server\n");
    res.write("Request URL: " + req.url + "\n");
    res.write("Request Method: " + req.method + "\n");
    res.write("Request Status Code: " + req.statusCode + "\n");
    res.write("Requested Data:\n");

    res.end(JSON.stringify(destination), () => {
      console.log("A Request Has Been Ended");
    });
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const continent = req.url.split("/").pop();
    const filteredData = destination.filter((destination) => {
      return (
        destination.continent.toLocaleLowerCase() ===
        continent.toLocaleLowerCase()
      );
    });
    res.end(JSON.stringify(filteredData));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        error: "not Found",
        message: "The requested route does not exist",
      }),
      () => {
        console.log("A Bad Request Has Been Ended");
      }
    );
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
