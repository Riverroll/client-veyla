import DashboardBanner from "../../components/common/cards/DashboardBanner";
import Layout from "../../components/common/layouts/LayoutAdmin";

import ProductList from "./sections/ProductList";

function DashboardAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Welcome back, Admin!"
            message="We're excited to see you again. Dive into your dashboard to manage users, track orders, and oversee product inventory. If you have any questions or need assistance, our support team is here to help."
          />
        </div>
        <div>
          <ProductList />
        </div>
      </main>
    </Layout>
  );
}

export default DashboardAdmin;
