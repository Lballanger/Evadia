import axios from 'axios';

export const GET_CITIES = 'GET_CITIES';

export const getCities = () => (dispatch) =>
  axios.get('http://134.122.95.34/api/search/random').then((res) => {
    dispatch({ type: GET_CITIES, payload: res.data });
  });
