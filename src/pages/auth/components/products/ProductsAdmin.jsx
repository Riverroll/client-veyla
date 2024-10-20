import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutAdmin";
import ProductList from "./sections/ProductList";
function ProductsAdmin() {
  return (
    <Layout>
      {" "}
      {/* Menggunakan Layout untuk membungkus konten admin */}
      <main className="flex flex-col gap-4 ">
        {" "}
        {/* Menggunakan Flexbox untuk tata letak */}
        <div className="p-4">
          <DashboardBanner
            title="Products Page"
            message="Hello! We're glad to have you here. Explore our wide range of products and manage your orders easily. If you need any help, feel free to reach out to our support team."
          />
        </div>
        <div className="px-4">
          <ProductList /> {/* Komponen untuk menampilkan daftar produk */}
        </div>
      </main>
    </Layout>
  );
}

export default ProductsAdmin;
