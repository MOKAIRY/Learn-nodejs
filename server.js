import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import { getDataByPathParams } from "./utils/getDataByPathParams.js";
import { getDataByQueryParams } from "./utils/getDataByQueryParams.js";
const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObj.searchParams);

  if (urlObj.pathname === "/api" && req.method === "GET") {
    let filteredDestination = getDataByQueryParams(destinations, queryObj);
    sendJSONResponse(res, 200, filteredDestination);
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
