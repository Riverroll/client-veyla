import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id // Mencari index item berdasarkan ID
      );
      if (itemIndex >= 0) {
        // Jika item sudah ada di keranjang, tingkatkan kuantitasnya
        state.items[itemIndex].quantity += 1;
      } else {
        // Jika item belum ada, tambahkan item baru dengan kuantitas 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Reducer untuk menghapus item dari keranjang
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    // Reducer untuk mengosongkan keranjang
    clearCart: (state) => {
      state.items = []; // Mengatur items menjadi array kosong
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
