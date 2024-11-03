const { StringDecoder } = require("string_decoder");
const url = require("url");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/NotFoundHandler");
const routes = require("../routes");

const handler = {};

handler.handleReqRes = (req, res) => {
  //request handle
  // get the url and  parse it
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmdPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStrignObject = parseUrl.query;
  const headersObject = req.headers;

  const requestProperties = {
    parseUrl,
    path,
    trimmdPath,
    method,
    queryStrignObject,
    headersObject,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[trimmdPath]
    ? routes[trimmdPath]
    : notFoundHandler;

  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};

    const payloadString = JSON.stringify(payload);

    // return the final response
    res.writeHead(statusCode);
    res.end(payloadString);
  });

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
    // response handle
    res.end("Hello programmer");
  });
};

module.exports = handler;
