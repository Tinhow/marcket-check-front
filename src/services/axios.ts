// src/services/axios.ts
import axios, { AxiosRequestConfig } from "axios";

// Configurar o interceptor de requisições
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
