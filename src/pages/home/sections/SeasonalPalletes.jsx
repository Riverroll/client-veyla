// src/sections/SeasonalPalettes.jsx

import React from "react";
import ServiceCard from "../../../components/service/ServiceCard";

// Asumsikan Anda memiliki gambar-gambar ini di folder assets
import autumnImage from "../../../assets/background/autumn-palette.png";
import springImage from "../../../assets/background/spring-palette.png";
import summerImage from "../../../assets/background/summer-palette.png";
import winterImage from "../../../assets/background/winter-palette.png";

const palettes = [
  {
    title: "AUTUMN PALETTE",
    price: 2000000,
    description:
      "Enhance your natural beauty with warm, earthy tones perfect for autumn.",
    imageUrl: autumnImage,
  },
  {
    title: "SPRING PALETTE",
    price: 2000000,
    description:
      "Brighten your look with fresh, vibrant colors ideal for spring.",
    imageUrl: springImage,
  },
  {
    title: "SUMMER PALETTE",
    price: 2000000,
    description: "Cool, soft hues to complement your summer glow.",
    imageUrl: summerImage,
  },
  {
    title: "WINTER PALETTE",
    price: 2000000,
    description: "Bold, striking shades to make a statement in winter.",
    imageUrl: winterImage,
  },
];

const SeasonalPalettes = () => {
  return (
    <section className="bg-beige py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {palettes.map((palette, index) => (
            <ServiceCard
              key={index}
              title={palette.title}
              price={palette.price}
              description={palette.description}
              imageUrl={palette.imageUrl}
            />
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-playfair">
            Discover Your Color
            <br />
            Personalized Cosmetics
          </h2>
          <p className="text-teal text-lg mb-8 max-w-2xl mx-auto">
            Enhance your online shopping experience with personalized color
            consultations and cosmetics.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SeasonalPalettes;
