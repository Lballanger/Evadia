/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://134.122.95.34/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getRandomCity = async () => {
  const { data } = await instance.get('/search/random');
  return data;
};

const getCity = async (params) => {
  const { data } = await instance.post('/search/city', params);
  return data;
};

const getCityByInsee = async (codeInsee) => {
  const { data } = await instance.get(`/search/city/${codeInsee}`);
  return data;
};

const getCityWithCriteria = async (params) =>
  instance.post('/search/criteria', params);

const getUser = async () => instance.get('/user');

const updateUser = async (params) => {
  const { data } = await instance.patch('/user', params);
  return data;
};

const deleteUser = async () => {
  const { data } = await instance.delete('/user');
  return data;
};

const forgotPassword = async (params) =>
  instance.post('/user/forgot-password', params);

const doRegister = async (params) => {
  try {
    const { data } = await instance.post('/auth/register', params);
    instance.defaults.headers.authorization = `Bearer ${data.accessToken}`;
    localStorage.setItem('ON_DEMENAGE:REFRESH_TOKEN', data.refreshToken);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const doLogin = async (params) => {
  try {
    const { data } = await instance.post('/auth/login', params);
    instance.defaults.headers.authorization = `Bearer ${data.accessToken}`;
    localStorage.setItem('ON_DEMENAGE:REFRESH_TOKEN', data.refreshToken);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

instance.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line consistent-return
  async (error) => {
    const originalRequest = error.config;
    if (
      error.config.url !== '/auth/refresh-token' &&
      error.response.status === 401 &&
      originalRequest._retry !== true
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('ON_DEMENAGE:REFRESH_TOKEN');
      if (refreshToken && refreshToken !== '') {
        instance.defaults.headers.common.authorization = `Bearer ${refreshToken}`;
        try {
          const { data } = await instance.post('/auth/refresh-token');
          instance.defaults.headers.common.authorization = `Bearer ${data.accessToken}`;
          originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
        } catch (error) {
          localStorage.removeItem('ON_DEMENAGE:REFRESH_TOKEN');
        }
        return instance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default {
  getRandomCity,
  getCity,
  getCityByInsee,
  getCityWithCriteria,
  getUser,
  updateUser,
  deleteUser,
  forgotPassword,
  doLogin,
  doRegister,
};
