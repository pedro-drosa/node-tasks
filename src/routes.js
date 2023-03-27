import { ensureValidObject } from "./utils/ensureValidObject.js";
import { randomUUID } from "node:crypto";
import { Task } from "./entities/Task.js";
import { Database } from "./database/Database.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: "/tasks",
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
];
