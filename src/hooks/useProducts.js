import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/product";

function useProducts() {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari Redux
  const products = useSelector((state) => state.products.products); // Mengambil data produk dari Redux store
  const productStatus = useSelector((state) => state.products.status); // Mengambil status pengambilan produk dari Redux store
  const error = useSelector((state) => state.products.error); // Mengambil error jika ada dari Redux store

  // useEffect untuk mengambil data produk ketika status adalah "idle"
  useEffect(() => {
    if (productStatus === "idle") {
      // Mengecek jika status pengambilan produk adalah "idle"
      dispatch(fetchProducts()); // Memanggil action fetchProducts untuk mengambil data produk
    }
  }, [productStatus, dispatch]); // Menjalankan efek ini ketika productStatus atau dispatch berubah

  // Mengembalikan data yang relevan untuk digunakan di komponen lain
  return { products, productStatus, error };
}

export default useProducts;
