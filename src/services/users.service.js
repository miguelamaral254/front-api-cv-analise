import apiClient from './api.service';

const USERS_ENDPOINT = '/users';

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post(USERS_ENDPOINT, userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get(USERS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
    try {
      const response = await apiClient.get(`${USERS_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  };