import apiClient from './api.service';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/token', { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};