import axios from 'axios';

const IBGE_API_BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

export const getEstados = async () => {
  try {
    const response = await axios.get(`${IBGE_API_BASE_URL}/estados?orderBy=nome`);
    return response.data.map(estado => ({
      value: estado.sigla,
      label: estado.nome,
    }));
  } catch (error) {
    console.error('Erro ao buscar estados do IBGE:', error);
    throw error;
  }
};

export const getCidadesPorEstado = async (uf) => {
  if (!uf) return [];
  try {
    const response = await axios.get(`${IBGE_API_BASE_URL}/estados/${uf}/municipios`);
    return response.data.map(cidade => ({
      value: cidade.nome,
      label: cidade.nome,
    }));
  } catch (error) {
    console.error(`Erro ao buscar cidades para o estado ${uf}:`, error);
    throw error;
  }
};