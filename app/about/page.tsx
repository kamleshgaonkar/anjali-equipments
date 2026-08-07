import PageHero from "@/components/layout/PageHero";
import OurStory from "@/components/about/OurStory";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import CTA from "@/components/sections/CTA";
import Manufacturing from "@/components/about/Manufacturing";

export default function AboutPage() {
  return (
    <>
      
<PageHero
  title="About Us"
  />

      <OurStory />
      <Manufacturing />
      <MissionVisionValues />
      <CTA />
    </>
  );
}