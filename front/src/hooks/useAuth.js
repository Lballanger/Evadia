import { useQuery, useMutation } from 'react-query';
import API from '../api';

const useLogin = useMutation((data) => API.doLogin(data));
const useRegister = useMutation((data) => API.doRegister(data));
const useUser = () => useQuery(['user'], API.getUser());

export default { useLogin, useRegister, useUser };
