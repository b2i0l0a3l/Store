import BackgroundEffects from "@/Features/Landing/Components/BackgroundEffects";
import LandingNav from "@/Features/Landing/Components/LandingNav";
import HeroSection from "@/Features/Landing/Components/HeroSection";
import PreviewSection from "@/Features/Landing/Components/PreviewSection";
import StatsSection from "@/Features/Landing/Components/StatsSection";
import FeaturesSection from "@/Features/Landing/Components/FeaturesSection";
import CTASection from "@/Features/Landing/Components/CTASection";
import FooterSection from "@/Features/Landing/Components/FooterSection";

export default function LandingPage() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      <BackgroundEffects />
      <LandingNav />
      <HeroSection />
      <PreviewSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
