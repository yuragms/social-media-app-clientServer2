import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5001",
});
// const API = axios.create({
//   baseURL: "https://mongo-socialmedia-app2.herokuapp.com",
// });
export const logIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
