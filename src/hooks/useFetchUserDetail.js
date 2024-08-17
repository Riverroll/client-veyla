import axiosInstance from "../utils/axiosInstance";

export const fetchUserDetail = async (token) => {
  try {
    const response = await axiosInstance.get("/users/token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};
