const DashboardBanner = ({ title, message }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{message}</p>
    </div>
  );
};

export default DashboardBanner;
