import PageHero from "@/components/layout/PageHero";
import OurStory from "@/components/about/OurStory";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import CTA from "@/components/sections/CTA";
import Manufacturing from "@/components/about/Manufacturing";

export default function AboutPage() {
  return (
    <>
      
<PageHero
  eyebrow="ABOUT US"
  title="Engineering Commercial Kitchens"
  background="/hero/hero.jpg"
/>

      <OurStory />
      <Manufacturing />
      <MissionVisionValues />
      <CTA />
    </>
  );
}