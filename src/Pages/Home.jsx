import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TopSelling from "../components/TopSelling";
import HeritageSection from "../components/HeritageSection";
import WhyChooseUs from "../components/WhyChooseUs";
import CtaBanner from "../components/CtaBanner";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Seo from "../seo/Seo";
import useProducts from "../hooks/useProducts";
import {
  graph,
  organizationSchema,
  websiteSchema,
  faqSchema,
  itemListSchema,
} from "../seo/schema.js";

function Home() {
  const products = useProducts();

  return (
    <div>
      <Seo
        path="/"
        jsonLd={graph(
          organizationSchema(),
          websiteSchema(),
          itemListSchema(products, "Top selling Charsadda chappals"),
          faqSchema(),
        )}
      />
      <Navbar />
      <main>
        <Hero />
        <TopSelling />
        <HeritageSection />
        <WhyChooseUs />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
