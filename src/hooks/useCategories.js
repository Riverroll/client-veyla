import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/category";

const useCategories = () => {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari Redux
  // Mengambil data kategori, status, dan error dari Redux store
  const { categories, status, error } = useSelector(
    (state) => state.categories // Mengakses state kategori di Redux
  );

  // Menggunakan useEffect untuk melakukan fetch kategori ketika status adalah 'idle'
  useEffect(() => {
    if (status === "idle") {
      // Memeriksa apakah status fetching kategori adalah 'idle'
      dispatch(fetchCategories()); // Mengirimkan action untuk mengambil kategori
    }
  }, [status, dispatch]); // Efek ini dijalankan setiap kali status atau dispatch berubah

  // Mengembalikan kategori, status, dan error untuk digunakan di komponen lain
  return { categories, status, error };
};

export default useCategories;
