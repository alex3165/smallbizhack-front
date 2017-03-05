import { ADD_MERCHANTS } from '../constants';
import { req, api } from '../fetch';

const addMerchants = data => ({
  type: ADD_MERCHANTS,
  payload: data
});

export const getMerchants = (latlng) => dispatch => (
  fetch(req(api(`merchants?${latlng ? `lat=${latlng[1]}&lng=${latlng[0]}`: ''}`)))
    .then(res => res.json())
    .then((data) => dispatch(addMerchants(data)))
);
