import DashboardBanner from "../../components/common/cards/DashboardBanner";
import Layout from "../../components/common/layouts/LayoutAdmin";
import TransactionList from "./sections/TransactionList";
function TransactionsAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Transactions Page"
            message="Welcome to the Transactions Page! Here, you can view and manage all transactions occurring on the platform. Use this section to monitor transaction history, check payment statuses, and perform financial analysis. This page is designed to help you manage transactions efficiently and effectively. If you have any questions or need assistance, our support team is here to help."
          />
        </div>
        <div className="px-4">
          <TransactionList />
        </div>
      </main>
    </Layout>
  );
}

export default TransactionsAdmin;
