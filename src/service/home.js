import http from './http/index';
import $axios from './http/main';

export const bannerAdminGetByTypeApi = (params, config) => (
  http.post('/banner/adminGetByType', params, { ...config })
);

export const imageUploadApi = (params, config) => (
  http.post('/image/upload', params, { ...config })
);

export const imageUploadFileApi = (params, config) => (
  $axios.post('/image/uploadFile', params, { ...config })
);

export const bannerListApi = (params, config) => (
  http.post('/banner/list', params, { ...config })
);

export const bannerBatchDeleteApi = (params, config) => (
  http.post('/banner/batchDelete', params, { ...config })
);

export const bannerSubmitApi = (params, config) => (
  http.post('/banner/submit', params, { ...config })
);

export const bannerUpdateApi = (params, config) => (
  http.post('/banner/update', params, { ...config })
);



