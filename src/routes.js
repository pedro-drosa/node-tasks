import { ensureValidObject } from "./utils/ensureValidObject.js";

export const routes = [
  {
    method: "POST",
    path: "/tasks",
    handler: (request, response) => {
      try {
        const taskSchema = { title: "string", description: "string" };
        ensureValidObject(request.body, taskSchema);
        const { title, description } = request.body;
        response.writeHead(201).end(JSON.stringify({ title, description }));
      } catch (error) {
        response.writeHead(400).end(JSON.stringify({ error: error.message }));
      }
    },
  },
];
