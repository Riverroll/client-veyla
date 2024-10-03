import DashboardBanner from "../../components/common/cards/DashboardBanner";
import Layout from "../../components/common/layouts/LayoutAdmin";
import ProductList from "./sections/ProductList";

function ProductsAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Products Page"
            message="Welcome to the Products Page. Browse through our extensive collection of products, view detailed information, and manage your inventory seamlessly. For any assistance, our support team is here to help."
          />
        </div>
        <div className="px-4">
          <ProductList />
        </div>
      </main>
    </Layout>
  );
}

export default ProductsAdmin;
