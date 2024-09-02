import axios from 'axios';
import RefreshResponse from '../interfaces/refresh-response';
import { navigate } from '../navigation/navigation-service';
import AppStorage from '../utils/storage';

const api = axios.create({
  baseURL: 'https://bsky.social/xrpc'
});

// Adiciona um interceptor para incluir o Bearer token
api.interceptors.request.use(
  async (config) => {
    const { accessJwt } = await AppStorage.getTokens();
    if (accessJwt) {
      config.headers.Authorization = `Bearer ${accessJwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (): Promise<boolean> => {
  const { refreshJwt } = await AppStorage.getTokens();
  console.log('Refreshing token', refreshJwt);
  if (!refreshJwt) {
    return false;
  }

  try {
    const response = await axios.post<RefreshResponse>(
      'https://bsky.social/xrpc/com.atproto.server.refreshSession',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshJwt}`
        }
      }
    );

    if (response.status === 200) {
      const { accessJwt, refreshJwt: newRefreshJwt } = response.data;
      await AppStorage.saveTokens(accessJwt, newRefreshJwt);
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const is401 = error.response?.status === 401;

    if (is401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const success = await refreshAccessToken();
      if (success) {
        const { accessJwt } = await AppStorage.getTokens();
        originalRequest.headers.Authorization = `Bearer ${accessJwt}`;
        return api(originalRequest);
      } else {
        console.log('Erro ao atualizar token, redirecionando para login');
        await AppStorage.clearTokens();
        navigate('Login');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
