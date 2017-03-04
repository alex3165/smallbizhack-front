export const api = endpoint => `http://localhost:8081/${endpoint}`;

export const req = (url, method = 'GET', body) => new Request(url, {
  method,
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8'
  }),
  body
});
