const DashboardBanner = ({ title, message }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>{" "}
      {/* Judul banner dengan gaya font */}
      <p className="text-white">{message}</p>{" "}
      {/* Pesan banner yang ditampilkan */}
    </div>
  );
};

export default DashboardBanner;
