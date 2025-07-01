import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import IntroductionSection from "@/components/IntroductionSection";
import FeaturesSection from "@/components/FeaturesSection";
import StepsSection from "@/components/StepsSection";
import PricingSection from "@/components/PricingSection";
import ExclusiveSection from "@/components/ExclusiveSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import NotificationModal from "@/components/NotificationModal";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Notification Modal */}
      <NotificationModal />

      {/* Hero Section with Navigation */}
      <div className="relative">
        <Navigation />
        <HeroSection />
      </div>

      {/* Main Content Sections */}
      <main>
        <IntroductionSection />
        <FeaturesSection />
        <StepsSection />
        <PricingSection />
        <ExclusiveSection />
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
