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
}
