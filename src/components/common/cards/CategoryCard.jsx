const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
      <img
        src={category.category_image}
        alt={category.category_name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{category.category_name}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
