import apiClient from './api.service';

const TALENTOS_ENDPOINT = '/talentos';

export const getTalentos = async () => {
  try {
    const response = await apiClient.get(TALENTOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar talentos:', error);
    throw error;
  }
};

export const getTalentoById = async (id) => {
  try {
    const response = await apiClient.get(`${TALENTOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar talento por ID:', error);
    throw error;
  }
};
export const inscreverTalento = async (talentoData) => {
  try {
    const response = await apiClient.post(TALENTOS_ENDPOINT, talentoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao inscrever talento:', error);
    throw error;
  }
};

export const getTalentosByVagaId = async (vagaId) => {
  try {
    const response = await apiClient.get(`${TALENTOS_ENDPOINT}/vaga/${vagaId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar talentos para a vaga ${vagaId}:`, error);
    throw error;
  }
};
export const addComment = async (talentoId, commentData) => {
  try {
    const response = await apiClient.post(`/talentos/${talentoId}/comentarios`, commentData);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await apiClient.delete(`/talentos/comentarios/${commentId}`);
  } catch (error) {
    console.error('Erro ao excluir comentário:', error);
    throw error;
  }
};

export const reprovarCandidato = async (talentoId) => {
  try {
    const response = await apiClient.patch(`${TALENTOS_ENDPOINT}/${talentoId}/status`, { ativo: false });
    return response.data;
  } catch (error) {
    console.error(`Erro ao reprovar candidato ${talentoId}:`, error);
    throw error;
  }
};