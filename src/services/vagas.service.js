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

export const createVaga = async (vagaData) => {
  try {
    const response = await apiClient.post(VAGAS_ENDPOINT, vagaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar nova vaga:', error);
    throw error;
  }
};

export const updateVaga = async (id, vagaData) => {
  try {
    const response = await apiClient.put(`${VAGAS_ENDPOINT}/${id}`, vagaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error);
    throw error;
  }
};
export const finalizeVaga = async (id, finalizadoPorId) => {
  try {
    const payload = {
      finalizado_por: finalizadoPorId
    };
    await apiClient.post(`${VAGAS_ENDPOINT}/${id}/finalizar`, payload);
  } catch (error) {
    console.error('Erro ao finalizar vaga:', error);
    throw error;
  }
};
export const analyzeVaga = async (id, topCandidates) => {
  try {
    const requestBody = { top_candidatos: topCandidates };
    const response = await apiClient.post(`${VAGAS_ENDPOINT}/${id}/analisar`, requestBody);
    return response.data;
  } catch (error) {
    console.error('Erro ao analisar vaga:', error);
    throw error;
  }
};