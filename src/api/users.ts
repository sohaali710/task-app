import endpoints from "../utils/endpoints";
import axiosInstance from "../utils/axios";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const URL = endpoints.users.register;
  const { data } = await axiosInstance.post(URL, userData);

  return data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const URL = endpoints.users.login;
  const { data } = await axiosInstance.post(URL, credentials);

  return data;
};

export const getUserData = async () => {
  const URL = endpoints.users.getUserData;
  const { data } = await axiosInstance.get(URL);

  return data;
};
