import api from './api';

export const getBoards = async () => {
  const { data } = await api.get('/boards');
  return data.data;
};

export const getBoardById = async (id) => {
  const { data } = await api.get(`/boards/${id}`);
  return data.data;
};

export const createBoard = async (title, description) => {
  const { data } = await api.post('/boards', { title, description });
  return data.data;
};

export const deleteBoard = async (id) => {
  const { data } = await api.delete(`/boards/${id}`);
  return data;
};
