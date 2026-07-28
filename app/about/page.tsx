import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVisionValues from "@/components/about/MissionVisionValues";

import WhyChoose from "@/components/sections/WhyChoose";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";
import Manufacturing from "@/components/about/Manufacturing";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <WhyChoose />
      <Stats />
      <Manufacturing />
      <MissionVisionValues />
      <CTA />
    </>
  );
}