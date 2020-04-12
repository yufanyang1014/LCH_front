import http from './http';

export const bannerGetByTypeApi = (params, config) => (
  http.post('/banner/getByType', params, { ...config })
);


