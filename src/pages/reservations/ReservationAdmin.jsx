import DashboardBanner from "../../components/common/cards/DashboardBanner";
import Layout from "../../components/common/layouts/LayoutAdmin";
import ReservationList from "./sections/ReservationList";
function ReservationAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Reservation Page"
            message="Welcome to the Reservation Page! Here you can manage and view all table reservations. Feel free to explore reservation details, update bookings, and monitor upcoming reservations. If you need any assistance or have questions, our support team is always available to help!"
          />
        </div>
        <div className="px-4">
          <ReservationList />
        </div>
      </main>
    </Layout>
  );
}

export default ReservationAdmin;
