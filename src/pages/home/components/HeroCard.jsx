import React from "react";

const HeroCard = () => {
  return (
    <div className="bg-navy text-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-0 md:w-1/3">
          Revolutionize Your Online Shopping Experience with Perfect Palette
        </h2>
        <p className="font-playfair md:w-2/3 text-sm md:text-base lg:text-lg">
          At Perfect Palette, we believe that every individual deserves a
          personalized online shopping experience. Our web-based e-commerce
          solution is designed to provide you with a tailored color analysis,
          ensuring that you find the perfect shades that complement your unique
          preferences and characteristics. With our innovative web application,
          you can consult with experts without leaving the comfort of your home,
          and confidently purchase cosmetics that match your personalized color
          palette. Say goodbye to the hassle of choosing the wrong shade and
          hello to a seamless shopping experience that is all about you.
        </p>
      </div>
    </div>
  );
};

export default HeroCard;
