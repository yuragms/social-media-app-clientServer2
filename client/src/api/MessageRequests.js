import axios from "axios";
// const API = axios.create({
//   baseURL: "https://mongo-socialmedia-app2.herokuapp.com",
// });
const API = axios.create({
  baseURL: process.env.NODA_SERVER_URL,
});
export const getMessages = (id) => API.get(`/messages/${id}`);
export const addMessage = (data) => API.post("messages/", data);
