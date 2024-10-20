import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8001/api/categories", {
        headers: {
          // Menambahkan header untuk otorisasi
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], // Array untuk menyimpan kategori
    status: "idle", // Status pengambilan data (idle, loading, succeeded, failed)
    error: null, // Menyimpan pesan kesalahan jika ada
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading"; // Mengubah status menjadi loading saat pengambilan data dimulai
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mengubah status menjadi succeeded saat data berhasil diambil
        state.categories = action.payload; // Menyimpan kategori yang diambil ke state
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed"; // Mengubah status menjadi failed jika ada kesalahan
        state.error = action.payload; // Menyimpan pesan kesalahan
      });
  },
});

export default categoriesSlice.reducer;
