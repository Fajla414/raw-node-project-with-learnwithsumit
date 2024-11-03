/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul api to moniitor up or down time of user defined links
 * author : Fajla Rabby
 * Date: 02/11/2024
 */

// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// appp object - mdule scaffolding
const app = {};

// configuration
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () =>
    console.log(`listening to port ${app.config.port}`)
  );
};

app.handleReqRes = handleReqRes;

// start the server
app.createServer();
