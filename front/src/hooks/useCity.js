import { useQuery } from 'react-query';
import API from '../api';

const useCity = (data) =>
  useQuery(['city', JSON.stringify(data)], API.getCity(data));
const useRandomCity = () => useQuery('randomCity', API.getRandomCity);

export default { useCity, useRandomCity };
