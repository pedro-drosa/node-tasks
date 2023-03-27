export const routes = [
  {
    method: "POST",
    path: "/tasks",
    handler: (request, response) => {
      const { title, description } = request.body;
      response
        .writeHead(201, { "Content-Type": "application/json" })
        .end(JSON.stringify({ title, description }));
    },
  },
];
