import { ensureValidObject } from "./utils/ensureValidObject.js";
import { randomUUID } from "node:crypto";
import { Task } from "./entities/Task.js";
import { Database } from "./database/Database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      try {
        const taskSchema = { title: "string", description: "string" };
        ensureValidObject(request.body, taskSchema);
        const { title, description } = request.body;
        const task = database.insert(
          "tasks",
          new Task(randomUUID(), title, description)
        );
        response.writeHead(201).end(JSON.stringify(task));
      } catch (error) {
        response.writeHead(400).end(JSON.stringify({ error: error.message }));
      }
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { search } = request.query;
      const filter = search ? { title: search, description: search } : null;
      const tasks = database.select("tasks", filter);
      response.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const [task] = database.select("tasks", { id });
      if (!task) return response.writeHead(404).end();
      database.delete("tasks", id);
      response.writeHead(204).end();
    },
  },
];
