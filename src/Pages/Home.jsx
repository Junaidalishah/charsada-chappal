import Hero from "../components/hero";
import Navbar from "../components/Navbar";
import TopSelling from "../components/TopSelling";
import HeritageSection from "../components/HeritageSection";
import WhyChooseUs from "../components/WhyChooseUs";
import CtaBanner from "../components/CtaBanner";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <TopSelling />
      <HeritageSection />
      <WhyChooseUs />
      <CtaBanner />
      <Footer />
    </div>
  );
}

export default Home;
