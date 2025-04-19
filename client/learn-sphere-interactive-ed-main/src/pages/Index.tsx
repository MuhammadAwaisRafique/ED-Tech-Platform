
import { Layout } from "@/components/layout/Layout";
import { Hero3DSection } from "@/components/landing/Hero3DSection";
import { Features3DSection } from "@/components/landing/Features3DSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { BackgroundScene } from "@/components/landing/BackgroundScene";

const Index = () => {
  return (
    <Layout>
      <BackgroundScene />
      <Hero3DSection />
      <Features3DSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
