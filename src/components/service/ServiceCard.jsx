import React from "react";

const ServiceCard = ({ title, price, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-60 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-navy mb-2">{title}</h3>
        <p className="text-teal font-bold mb-2">Rp {price.toLocaleString()}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
