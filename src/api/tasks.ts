import endpoints from "../utils/endpoints";
import { Task } from "src/types/tasks";
import axiosInstance from "../utils/axios";

export const createTask = async (taskData: Task) => {
  const URL = endpoints.tasks.create;
  const { data } = await axiosInstance.post(URL, taskData);

  return data;
};

export const updateTask = async (
  taskId: string,
  updatedDate: Partial<Task>
) => {
  const URL = endpoints.tasks.update.replace(":id", taskId);
  const { data } = await axiosInstance.put(URL, updatedDate);

  return data;
};

export const deleteTask = async (taskId: string) => {
  const URL = endpoints.tasks.delete.replace(":id", taskId);
  const { data } = await axiosInstance.delete(URL);

  return data;
};

export const getAllTasks = async () => {
  const URL = endpoints.tasks.getAll;
  const { data } = await axiosInstance.get(URL);

  return data;
};

export const getTaskData = async (taskId: string) => {
  const URL = endpoints.tasks.getById.replace(":id", taskId);
  const { data } = await axiosInstance.get(URL);

  return data;
};
