// src/sections/OurServices.jsx

import React from "react";
import ServiceCard from "../../../components/service/ServiceCard";
import expertConsultationImage from "../../../assets/background/expert-consul.png";

const OurServices = () => {
  return (
    <section className="bg-beige py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-playfair text-center">
          Enhance Your Online
          <br />
          Shopping Experience with
          <br />
          Perfect Palette
        </h2>
        <p className="font-playfair text-teal text-lg mb-12 max-w-3xl mx-auto text-center">
          Discover your personalized color palette, consult with experts, and
          purchase cosmetics directly based on your preferences and
          characteristics.
        </p>
        <div className="flex justify-center">
          <ServiceCard
            title="Expert Consultation"
            price={500000}
            description="Get professional advice from color experts"
            imageUrl={expertConsultationImage}
          />
        </div>
      </div>
    </section>
  );
};

export default OurServices;
