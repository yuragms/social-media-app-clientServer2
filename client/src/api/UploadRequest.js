import axios from "axios";
// const API = axios.create({
//   baseURL: "https://mongo-socialmedia-app2.herokuapp.com",
// });
const API = axios.create({
  baseURL: "http://localhost:5001",
});

export const uploadImage = (data) => API.post("/upload", data);
export const uploadPost = (data) => API.post("/posts", data);
