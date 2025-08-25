import apiClient from './api.service';

const VAGAS_ENDPOINT = '/vagas';

export const getVagas = async () => {
  try {
    const response = await apiClient.get(VAGAS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    throw error;
  }
};

export const getVagaById = async (id) => {
  try {
    const response = await apiClient.get(`${VAGAS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vaga por ID:', error);
    throw error;
  }
};

// Exemplo para um endpoint POST
export const createVaga = async (vagaData) => {
  try {
    const response = await apiClient.post(VAGAS_ENDPOINT, vagaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar nova vaga:', error);
    throw error;
  }
};