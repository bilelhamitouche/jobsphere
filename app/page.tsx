import Footer from "@/components/ui/footer";
import Hero from "@/components/ui/hero";
import Navbar from "@/components/ui/navbar";
import NextSteps from "@/components/ui/next-steps";
import PopularCategories from "@/components/ui/popular-categories";
import Testimonials from "@/components/ui/testimonials";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PopularCategories />
      <Testimonials />
      <NextSteps />
      <Footer />
    </div>
  );
}
