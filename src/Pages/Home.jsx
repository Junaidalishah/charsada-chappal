import Hero from "../components/hero";
import Navbar from "../components/Navbar";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CtaBanner from "../components/CtaBanner";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </div>
  );
}

export default Home;
