import http from './http';

export const bannerGetByTypeApi = (params, config) => (
  http.post('/banner/adminGetByType', params, { ...config })
);

export const imageUploadApi = (params, config) => (
  http.post('/image/upload', params, { ...config })
);


