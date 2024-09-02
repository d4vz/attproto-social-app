import LoginResponse from '../interfaces/login-respons';
import api from './api';

class AuthService {
  async login(identifier: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/com.atproto.server.createSession', {
      identifier,
      password,
      authFactorToken: ''
    });
    return response.data as LoginResponse;
  }
}

export default new AuthService();
