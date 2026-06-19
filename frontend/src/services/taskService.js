import api from './api';

export const createTask = async (taskData) => {
  const { data } = await api.post('/tasks', taskData);
  return data.data;
};

export const updateTask = async (id, updates) => {
  const { data } = await api.put(`/tasks/${id}`, updates);
  return data.data;
};

export const reorderTasks = async (tasks) => {
  const { data } = await api.put('/tasks/reorder', { tasks });
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
