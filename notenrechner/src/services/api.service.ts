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

    // Request Interceptor für Authorization Header
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

  // Auth Methoden
  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password });
    this.setToken(response.data.access_token);
    return response.data;
  }

  // Noten Methoden
  async getGrades() {
    const response = await this.api.get('/grades');
    return response.data;
  }

  async createGrade(gradeData: {
    subject: string;
    grade: number;
    date: Date;
    description?: string;
  }) {
    const response = await this.api.post('/grades', gradeData);
    return response.data;
  }
}

export const apiService = new ApiService(); 