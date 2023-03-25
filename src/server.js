import { createServer } from "node:http";

const APP_PORT = 8080;
const APP_BASE_URL = "http://localhost";

const server = createServer((request, response) => {
  response.writeHead(404).end();
});

server.listen(APP_PORT, () => {
  console.log(`Server started on: ${APP_BASE_URL}:${APP_PORT}`);
});
