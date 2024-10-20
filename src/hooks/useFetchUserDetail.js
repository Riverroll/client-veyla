import axiosInstance from "../utils/axiosInstance";

// Fungsi untuk mengambil detail pengguna berdasarkan token autentikasi
export const fetchUserDetail = async (token) => {
  try {
    // Melakukan permintaan GET ke endpoint /users/token dengan header Authorization
    const response = await axiosInstance.get("/users/token", {
      headers: {
        Authorization: `Bearer ${token}`, // Menyertakan token dalam header Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};
