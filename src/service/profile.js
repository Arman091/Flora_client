import { api } from "./api-methods.js";
export const signUp = async (data) => {
  const response = await api.post("/signup", data);
  return response;
};

export const login = async (data) => {
  const response = await api.post("/login", data);
  return response;
};

