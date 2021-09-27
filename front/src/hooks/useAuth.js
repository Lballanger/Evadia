import { useQuery, useMutation } from 'react-query';
import API from '../api';

// eslint-disable-next-line no-shadow
export const useLogin = (data) => useMutation((data) => API.doLogin(data));
export const useRegister = (data) =>
  // eslint-disable-next-line no-shadow
  useMutation((data) => API.doRegister(data));
export const useUser = () =>
  useQuery(['user'], () => API.getUser(), {
    onError: (err) => {
      throw err;
    },
  });

export default { useLogin, useRegister, useUser };
