import http from './http';

export const bannerGetByTypeApi = (params, config) => (
  http.post('/banner/adminGetByType', params, { ...config })
);

export const imageUploadApi = (params, config) => (
  http.post('/image/upload', params, { ...config })
);

export const bannerListApi = (params, config) => (
  http.post('/banner/list', params, { ...config })
);

export const bannerDeleteApi = (params, config) => (
  http.post('/banner/delete', params, { ...config })
);

export const bannerSubmitApi = (params, config) => (
  http.post('/banner/submit', params, { ...config })
);


