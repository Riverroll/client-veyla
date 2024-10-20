import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category, search }, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8001/api/products", {
        params: {
          // Mengatur parameter untuk permintaan
          categoryId: category || "", // Jika category ada, gunakan, jika tidak, gunakan string kosong
          search: search || "", // Jika search ada, gunakan, jika tidak, gunakan string kosong
        },

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const response = await axios.post(
      "http://localhost:8000/api/products", // URL untuk menambahkan produk
      productData, // Data produk yang akan ditambahkan
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Array untuk menyimpan produk
    status: "idle", // Status pengambilan data (idle, loading, succeeded, failed)
    error: null, // Menyimpan pesan kesalahan jika ada
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"; // Mengubah status menjadi loading saat pengambilan data dimulai
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mengubah status menjadi succeeded saat data berhasil diambil
        state.products = action.payload; // Menyimpan produk yang diambil ke state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"; // Mengubah status menjadi failed jika ada kesalahan
        state.error = action.error.message; // Menyimpan pesan kesalahan
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); // Menambahkan produk baru ke state
      });
  },
});

export default productSlice.reducer;
