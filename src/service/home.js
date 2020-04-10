import http from './http';

export const exchangeApi = (params, config) => (
  http.get('/exchange', params, { ...config })
);

export const weatherApi = (params, config) => (
  http.get('/data/sk/101210101.html', params, { ...config })
);

