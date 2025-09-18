import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import { getDataByPathParams } from "./utils/getDataByPathParams.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  if (req.url === "/api" && req.method === "GET") {
    sendJSONResponse(res, 200, destinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const filteredData = getDataByPathParams(req, destinations, "continent");
    sendJSONResponse(res, 200, filteredData);
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    const filteredCountry = getDataByPathParams(req, destinations, "country");
    sendJSONResponse(res, 200, filteredCountry);
  } else {
    sendJSONResponse(res, 200, {
      error: "not Found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
