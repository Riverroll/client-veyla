import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cart/cart";

const ProductCard = ({ product }) => {
  const location = useLocation(); // Mendapatkan informasi lokasi saat ini
  const isAdmin = location.pathname.includes("admin"); // Memeriksa apakah pengguna saat ini adalah admin
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch untuk mengirim aksi ke Redux store

  // Fungsi untuk menambahkan produk ke keranjang
  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Mengirim aksi addToCart dengan produk yang dipilih
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={product.product_image}
        alt={product.product_name}
        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{product.product_name}</h2>
        <p className="text-lg text-green-600 mb-2">
          IDR {product.product_price}
        </p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="mt-4">
          <span className="text-sm font-semibold text-gray-800">
            {product.Category.category_name}
          </span>
        </div>
        <div className="mt-4 flex space-x-2">
          {!isAdmin && (
            <button
              onClick={handleAddToCart}
              className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200"
            >
              Add to Cart
            </button>
          )}
          {isAdmin && (
            <>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
