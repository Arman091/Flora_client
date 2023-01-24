import axios from "axios";
const URL = "https://floralcart.onrender.com";

export const authenticateSignUp = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log("Signup Error:-", error);
  }
};

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    console.log("Login Error:-", error);
    return error.response;
  }
};
