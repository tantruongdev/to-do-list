import { get, patch } from "../utils/request";

export const getTaskList = async (userId) => {
  const result = await get(`users/${userId}/todos`);
  return result;
};

export const updateTaskStatus = async (id, options) => {
  const result = await patch(`todos/${id}`, options);
  return result;
};
