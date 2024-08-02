import Categories from "./sections/Categories";
import Hero from "./sections/Hero";
import HeroCard from "./components/HeroCard";
import OurServices from "./sections/OurService";
import SeasonalPalettes from "./sections/SeasonalPalletes";

function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <div className="bg-beige container mx-auto px-4 py-12">
        <HeroCard />
        <OurServices />
        <SeasonalPalettes />
      </div>
    </div>
  );
}

export default Home;
