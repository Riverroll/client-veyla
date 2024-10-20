import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/products/product";
import useCategories from "../../../hooks/useCategories";
import ProductCard from "../../../components/common/cards/ProductCard";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function ProductList() {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari Redux
  const { products, productStatus, error } = useSelector(
    // Mengambil produk, status, dan error dari state Redux
    (state) => state.products
  );
  const { categories, status: categoriesStatus } = useCategories(); // Mengambil kategori dan status dari hook useCategories

  const query = useQuery(); // Mendapatkan parameter query dari URL
  const initialCategoryId = query.get("categoryId") || ""; // Mengambil categoryId dari query atau mengatur ke string kosong

  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId); // State untuk menyimpan kategori yang dipilih
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan istilah pencarian

  // Mengambil produk setiap kali selectedCategory atau searchTerm berubah
  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, search: searchTerm }));
  }, [selectedCategory, searchTerm, dispatch]);

  // Mengatur selectedCategory berdasarkan initialCategoryId
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(initialCategoryId);
    }
  }, [initialCategoryId]);

  // Menampilkan loading saat produk sedang diambil
  if (productStatus === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }

  // Menampilkan pesan error jika pengambilan produk gagal
  if (productStatus === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded ml-2"
        >
          <option value="">All Categories</option>
          {categoriesStatus === "succeeded" &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
