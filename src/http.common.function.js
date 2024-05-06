import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8002/api",
});

export default http;

