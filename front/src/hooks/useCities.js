import { useQuery } from 'react-query';
import API from '../api';

const useCitiesWithCriteria = (data) =>
  useQuery(['cities', JSON.stringify(data)], API.getCityWithCriteria(data));

export default useCitiesWithCriteria;
