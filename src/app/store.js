import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/user";
import ProductReducer from "../features/products/product";
import CategoriesReducer from "../features/categories/category";
import CartReducer from "../features/cart/cart";

export default configureStore({
  reducer: {
    user: UserReducer, // Reducer untuk manajemen data pengguna
    products: ProductReducer, // Reducer untuk manajemen data produk
    categories: CategoriesReducer, // Reducer untuk manajemen data kategori
    cart: CartReducer, // Reducer untuk manajemen data keranjang belanja
  },
});
