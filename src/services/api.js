import axios from "axios";

const API = axios.create({
  baseURL: "https://travel-backend.onrender.com/api"


});

export default API;
