import OurStory from "@/components/about/OurStory";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import CTA from "@/components/sections/CTA";
import Manufacturing from "@/components/about/Manufacturing";
import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";

export default function AboutPage() {
  return (
    <>
      <HeaderOffsetSpacer />
      <StickyBreadcrumbBar />

      <OurStory />
      <Manufacturing />
      <MissionVisionValues />
      <CTA />
    </>
  );
}