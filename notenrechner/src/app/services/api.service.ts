import axios, { AxiosInstance } from 'axios';

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password });
    this.setToken(response.data.access_token);
    return response.data;
  }

  async getGrades() {
    const response = await this.api.get('/grades');
    return response.data;
  }
}

export const apiService = new ApiService(); 