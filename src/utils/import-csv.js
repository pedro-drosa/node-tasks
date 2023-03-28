import { parse } from "csv-parse";
import { createReadStream } from "fs";

const APP_BASE_URL = "http://localhost";
const APP_PORT = 8080;

(async () => {
  const csvPath = new URL("../uploads/tasks.csv", import.meta.url);
  const stream = createReadStream(csvPath);
  const csvParse = parse({ delimiter: ",", skipEmptyLines: true, fromLine: 2 });
  const lines = stream.pipe(csvParse);
  for await (const line of lines) {
    const [title, description] = line;
    await fetch(`${APP_BASE_URL}:${APP_PORT}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
  }
})();
