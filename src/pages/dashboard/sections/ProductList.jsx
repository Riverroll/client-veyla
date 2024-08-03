import ProductCard from "../../../components/common/cards/ProductCard";
import useProducts from "../../../hooks/useProducts";

function ProductList() {
  const { products, productStatus, error } = useProducts();

  if (productStatus === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (productStatus === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
