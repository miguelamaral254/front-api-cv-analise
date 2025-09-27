import apiClient from './api.service';

const AREAS_ENDPOINT = 'vagas/areas';

/**
 * Busca todas as áreas cadastradas.
 * @returns {Promise<Array>} Uma lista de áreas.
 */
export const getAreas = async () => {
    try {
        const response = await apiClient.get(AREAS_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar áreas:', error);
        throw error;
    }
};

/**
 * Busca uma área específica pelo seu ID.
 * @param {number} id - O ID da área.
 * @returns {Promise<Object>} O objeto da área.
 */
export const getAreaById = async (id) => {
    try {
        const response = await apiClient.get(`${AREAS_ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar área com ID ${id}:`, error);
        throw error;
    }
};

/**
 * Cria uma nova área.
 * @param {Object} areaData - Os dados da nova área (ex: { nome, descricao }).
 * @returns {Promise<Object>} A área recém-criada.
 */
export const createArea = async (areaData) => {
    try {
        const response = await apiClient.post(AREAS_ENDPOINT, areaData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar nova área:', error);
        throw error;
    }
};

/**
 * Atualiza uma área existente.
 * @param {number} id - O ID da área a ser atualizada.
 * @param {Object} areaData - Os dados a serem atualizados.
 * @returns {Promise<Object>} A área atualizada.
 */
export const updateArea = async (id, areaData) => {
    try {
        const response = await apiClient.put(`${AREAS_ENDPOINT}/${id}`, areaData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar área com ID ${id}:`, error);
        throw error;
    }
};

/**
 * Deleta uma área existente.
 * @param {number} id - O ID da área a ser deletada.
 * @returns {Promise<void>}
 */
export const deleteArea = async (id) => {
    try {
        await apiClient.delete(`${AREAS_ENDPOINT}/${id}`);
    } catch (error) {
        console.error(`Erro ao deletar área com ID ${id}:`, error);
        throw error;
    }
};