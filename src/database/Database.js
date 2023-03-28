import { readFile, writeFile } from "node:fs/promises";
const databasePath = new URL("../../db.json", import.meta.url);

export class Database {
  #tables = {};

  constructor() {
    readFile(databasePath, "utf8")
      .then((data) => (this.#tables = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  #persist() {
    writeFile(databasePath, JSON.stringify(this.#tables));
  }

  insert(table, data) {
    if (Array.isArray(this.#tables[table])) {
      this.#tables[table].push(data);
    } else {
      this.#tables[table] = [data];
    }
    this.#persist();
    return data;
  }

  select(table, search) {
    let data = this.#tables[table] ?? [];
    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }
    return data;
  }

  delete(table, id) {
    const rowIndex = this.#tables[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#tables[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const rowIndex = this.#tables[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#tables[table][rowIndex] = data;
      this.#persist();
    }
  }
}
