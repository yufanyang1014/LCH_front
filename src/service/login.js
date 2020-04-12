import http from './http';

export const userLoginApi = (params, config) => (
  http.post('/user/login', params, { ...config })
);


