import React from "react";
import heroImage from "../../../assets/background/photo-banner.jpg";

function Hero() {
  return (
    <div className="bg-beige min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-4">
          Discover Your Perfect
          <br />
          Color Palette Today
        </h1>
        <p className="font-playfair justify-center text-teal text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Enhance your online shopping experience with personalized color
          analysis. Find the perfect shades that suit your unique style and
          complexion.
        </p>

        <div className="mb-8">
          <img
            src={heroImage}
            alt="Color palette samples"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
