import apiClient from "./api.service";

const USERS_ENDPOINT = "/users";
const ROLES_ENDPOINT = `${USERS_ENDPOINT}/roles`;

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post(USERS_ENDPOINT, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get(USERS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`${USERS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error;
  }
};

export const updateUserProfile = async (id, profileData) => {
  try {
    const response = await apiClient.put(
      `${USERS_ENDPOINT}/${id}/profile`,
      profileData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error;
  }
};

export const updateUserPassword = async (id, passwordData) => {
  try {
    const response = await apiClient.put(
      `${USERS_ENDPOINT}/${id}/password`,
      passwordData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    throw error;
  }
};

export const updateUserStatus = async (id, isActive) => {
  try {
    const response = await apiClient.put(
      `${USERS_ENDPOINT}/${id}/status`,
      { is_active: isActive }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status do usuário:", error);
    throw error;
  }
};

export const getRoles = async () => {
  try {
    const response = await apiClient.get(ROLES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar roles:", error);
    throw error;
  }
};
export const updateUserRole = async (id, roleData) => {
  try {
    const response = await apiClient.put(
        `${USERS_ENDPOINT}/${id}/role`,
        roleData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar role do usuário:", error);
    throw error;
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await apiClient.post(ROLES_ENDPOINT, roleData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar role:", error);
    throw error;
  }
};

export const updateRole = async (id, roleData) => {
  try {
    const response = await apiClient.put(`${ROLES_ENDPOINT}/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar role:", error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await apiClient.delete(`${ROLES_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir role:", error);
    throw error;
  }
};
