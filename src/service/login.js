import http from './http';

export const userLoginApi = (params, config) => (
  http.post('/admin/loginPassword', params, { ...config })
);


