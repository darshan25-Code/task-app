import axios from "axios";

const API = axios.create({
   baseURL: "https://task-app-mgo0.onrender.com/api",
  withCredentials: true,
});

export default API;