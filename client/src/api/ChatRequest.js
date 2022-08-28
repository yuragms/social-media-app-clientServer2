import axios from "axios";
const API = axios.create({
  baseURL: "https://mongo-socialmedia-app2.herokuapp.com",
});
export const userChats = (id) => API.get(`/chat/${id}`);
