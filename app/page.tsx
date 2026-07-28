import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Industries from "@/components/sections/Industries";
import Categories from "@/components/sections/Categories";
import WhyChoose from "@/components/sections/WhyChoose";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Projects from "@/components/sections/Projects";
import CTA from "@/components/sections/CTA";
import Clients from "@/components/sections/Clients";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Industries />
      <Categories />
      <WhyChoose />
      <FeaturedProducts />
      <Projects />
      <Clients />
      <CTA />
    </>
  );
}