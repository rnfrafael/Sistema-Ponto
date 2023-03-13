import axios from "axios";

export default axios.create({
  baseURL: "https://ponto-server.rafonte.dev",
  headers: {
    "Content-type": "application/json",
  },
});
