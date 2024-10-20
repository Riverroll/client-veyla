import DashboardBanner from "../../components/common/cards/DashboardBanner";
import Layout from "../../components/common/layouts/LayoutAdmin";
import UserList from "./sections/UserList";
function UsersAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Users Page"
            message="Welcome to the Users Page! Here you can manage and view all user accounts. Feel free to explore user profiles, update details, and monitor user activity. If you have any questions or need assistance, our support team is here to help!"
          />
        </div>
        <div className="px-4">
          <UserList /> {/* Menampilkan daftar pengguna */}
        </div>
      </main>
    </Layout>
  );
}

export default UsersAdmin;
