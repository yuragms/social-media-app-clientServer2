import axios from "axios";
// const API = axios.create({
//   baseURL: process.env.NODA_SERVER_URL,
// });
const API = axios.create({
  baseURL: "https://social-mediapp-mongo-noda3.herokuapp.com",
});
export const logIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
