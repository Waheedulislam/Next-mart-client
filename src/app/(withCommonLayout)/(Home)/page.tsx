import Category from "@/components/modules/home/Category/Category";
import FeatureProducts from "@/components/modules/home/FeatureProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <FeatureProducts />
      <FlashSale />
    </div>
  );
};

export default HomePage;
