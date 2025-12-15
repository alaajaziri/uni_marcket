import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000", // your backend URL
});

// Optional: add token automatically if you ever use auth
api.interceptors.request.use((config) => {
    // Example:
    // config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
});

export default api;
