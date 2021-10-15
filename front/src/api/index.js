/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const LOCAL_REFRESH_KEY = 'ON_DEMENAGE:REFRESH_TOKEN';

const instance = axios.create({
  baseURL: 'http://134.122.95.34/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.defaults.headers.authorization = `Bearer ${
//   localStorage.getItem(LOCAL_REFRESH_KEY) || null
// }`;

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

const cityToFavorites = async (codeInsee, boolean) =>
  instance.post(`/search/city/${codeInsee}/check?boolean=${boolean}`);

const getUser = async () => instance.get('/user');

const getUserFavorites = async () => {
  const { data } = await instance.get('/user/bookmarks');
  return data;
};

const updateUser = async (params) => {
  const { data } = await instance.patch('/user', params);
  return data;
};

const deleteUser = async () => {
  const { data } = await instance.delete('/user');
  return data;
};

const forgotPassword = async (params) =>
  instance.post('/auth/forgot-password', params);

const sendNewPassword = async (params, token) =>
  instance.post('/auth/new-password', params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

const doRegister = async (params) => {
  try {
    const { data } = await instance.post('/auth/register', params);
    instance.defaults.headers.authorization = `Bearer ${data.accessToken}`;
    localStorage.setItem(LOCAL_REFRESH_KEY, data.refreshToken);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const doLogin = async (params) => {
  try {
    const { data } = await instance.post('/auth/login', params);
    instance.defaults.headers.authorization = `Bearer ${data.accessToken}`;
    localStorage.setItem(LOCAL_REFRESH_KEY, data.refreshToken);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const doLogout = async () => {
  try {
    const { data } = await instance.post('/auth/logout');
    instance.defaults.headers.authorization = `Bearer null`;
    localStorage.removeItem(LOCAL_REFRESH_KEY);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const doContact = async (params) => {
  try {
    const { data } = await instance.post('/messages', params);
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
      const refreshToken = localStorage.getItem(LOCAL_REFRESH_KEY);
      if (refreshToken && refreshToken !== '') {
        instance.defaults.headers.common.authorization = `Bearer ${refreshToken}`;
        try {
          const { data } = await instance.post('/auth/refresh-token');
          instance.defaults.headers.common.authorization = `Bearer ${data.accessToken}`;
          originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
        } catch (error) {
          localStorage.removeItem(LOCAL_REFRESH_KEY);
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
  cityToFavorites,
  getUser,
  getUserFavorites,
  updateUser,
  deleteUser,
  forgotPassword,
  sendNewPassword,
  doLogin,
  doRegister,
  doLogout,
  doContact,
};
