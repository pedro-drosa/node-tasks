export class Database {
  #tables = {};

  insert(table, data) {
    if (Array.isArray(this.#tables[table])) {
      this.#tables[table].push(data);
    } else {
      this.#tables[table] = [data];
    }
    return data;
  }

  select(table) {
    return this.#tables[table] ?? [];
  }
}
