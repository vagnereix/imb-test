import axios from "axios";

import Cookie from "js-cookie";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const source = axios.CancelToken.source();

api.interceptors.request.use(async (config) => {
  const token = Cookie.get("@");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
