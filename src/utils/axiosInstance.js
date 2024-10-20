import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api", // URL dasar untuk semua permintaan
  headers: {
    "Content-Type": "application/json", // Mengatur header konten menjadi JSON
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Mengambil token dari localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Menambahkan token ke header permintaan
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
