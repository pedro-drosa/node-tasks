import { createServer } from "node:http";
import { routes } from "./routes.js";
import { json } from "./middlewares/json.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const APP_PORT = 8080;
const APP_BASE_URL = "http://localhost";

const server = createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);
  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });
  if (route) {
    const routeParams = url.match(route.path);
    const { query, ...params } = routeParams.groups;
    request.params = params;
    request.query = query ? extractQueryParams(query) : {};
    return route.handler(request, response);
  }
  response.writeHead(404).end();
});

server.listen(APP_PORT, () => {
  console.log(`Server started on: ${APP_BASE_URL}:${APP_PORT}`);
});
