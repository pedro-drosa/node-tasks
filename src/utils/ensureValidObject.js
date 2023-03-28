export function ensureValidObject(body, schema) {
  const schemaKeys = Object.keys(schema);
  const bodyKeys = Object.keys(body);
  if (!bodyKeys.length) throw new Error(`${schemaKeys} are required`);
  for (const key of schemaKeys) {
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
