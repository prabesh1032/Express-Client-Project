import CategoriesSection from "@/components/home/categories-section";
import BrandsSection from "@/components/home/brands-section";
import CtaSection from "@/components/home/cta-section";
import FeaturedProductsSection from "@/components/home/featured-products-section";
import HeroSection from "@/components/home/hero-section";
import MarketplaceSection from "@/components/home/marketplace-section";
import TrustBar from "@/components/home/trust-bar";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <TrustBar />
      <CategoriesSection />
      <BrandsSection />
      <FeaturedProductsSection />
      <MarketplaceSection />
      <CtaSection />
    </main>
  );
}
