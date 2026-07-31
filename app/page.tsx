import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Categories from "@/components/sections/Categories";
import Industries from "@/components/sections/Industries";
import WhyChoose from "@/components/sections/WhyChoose";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Projects from "@/components/sections/Projects";
import CTA from "@/components/sections/CTA";
import Clients from "@/components/sections/Clients";

export default function Home() {
  return (
    <>
  <Hero />
  <Clients />
  <About />
  <Categories />
  <Industries />
  <WhyChoose />
  <FeaturedProducts />
  <Projects />
  <CTA />
</>
  );
}