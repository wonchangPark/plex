import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "https://localhost:8080",
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { apiInstance };
