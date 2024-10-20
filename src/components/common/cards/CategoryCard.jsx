const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
      <img
        src={category.category_image} // Gambar kategori yang diambil dari properti category_image
        alt={category.category_name} // Alt text untuk gambar
        className="w-full h-48 object-cover rounded-t-lg" // Gaya gambar
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{category.category_name}</h2>{" "}
        {/* Nama kategori dengan ukuran dan ketebalan font */}
      </div>
    </div>
  );
};

export default CategoryCard;
