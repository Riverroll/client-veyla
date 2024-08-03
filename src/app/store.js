import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/user";
import ProductReducer from "../features/products/product";
import CategoriesReducer from "../features/categories/category";
export default configureStore({
  reducer: {
    user: UserReducer,
    products: ProductReducer,
    categories: CategoriesReducer,
  },
});
