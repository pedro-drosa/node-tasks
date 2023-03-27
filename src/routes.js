export const routes = [
  {
    method: "POST",
    path: "/tasks",
    handler: (request, response) => {
      response.writeHead(201).end("Save");
    },
  },
];
