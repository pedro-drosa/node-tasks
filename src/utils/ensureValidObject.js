export function ensureValidObject(body, schema) {
  if (!body) throw new Error("Title and description are required");
  const bodyKeys = Object.keys(body);
  for (const key of Object.keys(schema)) {
    if (!bodyKeys.includes(key)) {
      throw new Error(`Field '${key}' is required`);
    }
  }
  for (const key of bodyKeys) {
    if (typeof body[key] !== schema[key]) {
      throw new Error(
        `Invalid type for field '${key}'. Expected '${schema[key]}'`
      );
    }
  }
}
