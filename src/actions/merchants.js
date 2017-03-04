import { ADD_MERCHANTS } from '../constants/merchants';

const api = endpoint => `http://localhost:8081/${endpoint}`;

const req = (url, method = 'GET', body) => new Request(url, {
  method,
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8'
  }),
  body
});

const addMerchants = data => ({
  type: ADD_MERCHANTS,
  payload: data
});

export const getMerchants = (latlng) => dispatch => (
  fetch(req(api('merchants')))
    .then(res => res.json())
    .then((data) => dispatch(addMerchants(data)))
);
