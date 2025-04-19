import Footer from "@/components/ui/footer";
import Hero from "@/components/ui/hero";
import Navbar from "@/components/ui/navbar";
import PopularCategories from "@/components/ui/popular-categories";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PopularCategories />
      <Footer />
    </div>
  );
}
