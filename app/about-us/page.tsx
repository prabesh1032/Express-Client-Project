import AboutHero from "@/components/about/about-hero";
import MakersSection from "@/components/about/makers-section";
import StorySection from "@/components/about/story-section";
import ValuesSection from "@/components/about/values-section";
import CtaSection from "@/components/home/cta-section";

export default function AboutPage() {
  return <main className="overflow-hidden"><AboutHero /><StorySection /><ValuesSection /><MakersSection /><CtaSection /></main>;
}
