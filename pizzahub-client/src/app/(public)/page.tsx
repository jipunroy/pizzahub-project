
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import PremiumCTA from "@/components/home/PremiumCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedMenu />
        <Categories />
        <WhyChooseUs />
        <HowItWorks />
        <PremiumCTA />
      </main>

      <Footer />
    </>
  );
}
