import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Optional: Include cookies if needed
});

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const createUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};