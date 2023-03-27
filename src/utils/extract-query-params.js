export function extractQueryParams(rawQuery) {
  return rawQuery
    .substring(1)
    .split("&")
    .reduce((queryParams, params) => {
      const [key, value] = params.split("=");
      queryParams[key] = value;
      return queryParams;
    }, {});
}
