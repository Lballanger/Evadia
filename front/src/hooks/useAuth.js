import { useQuery, useMutation } from 'react-query';
import API from '../api';

export const useLogin = (data) => useMutation((data) => API.doLogin(data));
export const useRegister = (data) => useMutation((data) => API.doRegister(data));
export const useUser = () => useQuery(['user'], () => API.getUser());

export default { useLogin, useRegister, useUser };
