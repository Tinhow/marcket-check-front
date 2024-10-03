// src/services/api.ts
import axios, { AxiosInstance } from "axios";
import { setupCache } from "axios-cache-adapter";

// Definindo o tipo para o produto (opcional, mas recomendável)
export interface Product {
  id: number;
  nome_produto: string;
  preco: number;
  image_url: string;
  created_at: string;
  categoria: string;
  supermercado: {
    id: number;
    localizacao: string;
    nome_mercado: string;
    preco: string;
  };
}

// Configura o adaptador de cache
const cache = setupCache({
  maxAge: 15 * 60 * 1000, // Tempo de cache: 15 minutos
  exclude: { query: false }, // Cache também para requisições com parâmetros
});

// Cria a instância do Axios com cache
const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000", // URL base para a API
  adapter: cache.adapter, // Adiciona o adaptador de cache
  timeout: 10000, // Timeout de 10 segundos
  withCredentials: true, // Isso garante que os cookies sejam enviados em todas as requisições
});

// Interceptor de requisições para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; // Usando a notação de ponto
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
