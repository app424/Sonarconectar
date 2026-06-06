import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShowreelSection from "@/components/ShowreelSection";
import ClientLogosSection from "@/components/ClientLogosSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ProcessSection from "@/components/ProcessSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import CareersSection from "@/components/CareersSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SocialSidebar from "@/components/SocialSidebar";
import IntroOverlay from "@/components/IntroOverlay";
import { useContentProtection } from "@/hooks/useContentProtection";

type View = "home" | "services" | "team" | "gallery" | "contact";

const getViewFromHash = (): View => {
  const h = window.location.hash.replace("#", "");
  if (h === "services" || h.startsWith("services-")) return "services";
  if (h === "team") return "team";
  if (h === "gallery") return "gallery";
  if (h === "contact" || h === "careers") return "contact";
  return "home";
};

const Index = () => {
  const [view, setView] = useState<View>(() =>
    typeof window !== "undefined" ? getViewFromHash() : "home"
  );

  useContentProtection();

  const navLockRef = useRef(false);
  const lastEdgeAtRef = useRef(0);

  useEffect(() => {
    const onHash = () => {
      setView(getViewFromHash());
      window.scrollTo({ top: 0, behavior: "auto" });
      // Lock briefly after navigation to avoid accidental chained jumps
      navLockRef.current = true;
      window.setTimeout(() => {
        navLockRef.current = false;
        lastEdgeAtRef.current = 0;
      }, 900);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Auto-navigate to next/previous view when user scrolls past edges
  useEffect(() => {
    const order: View[] = ["home", "services", "team", "gallery", "contact"];

    const goTo = (next: View) => {
      if (navLockRef.current) return;
      navLockRef.current = true;
      window.location.hash = next === "home" ? "" : next;
    };

    const tryNavigate = (direction: 1 | -1) => {
      if (navLockRef.current) return;
      const idx = order.indexOf(view);
      const nextIdx = idx + direction;
      if (nextIdx < 0 || nextIdx >= order.length) return;

      // Require sustained intent at the edge (~250ms) to avoid accidental jumps
      const now = Date.now();
      if (lastEdgeAtRef.current === 0) {
        lastEdgeAtRef.current = now;
        return;
      }
      if (now - lastEdgeAtRef.current < 250) return;
      lastEdgeAtRef.current = 0;
      goTo(order[nextIdx]);
    };

    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    const atTop = () => window.scrollY <= 0;

    const onWheel = (e: WheelEvent) => {
      if (navLockRef.current) return;
      if (e.deltaY > 0 && atBottom()) tryNavigate(1);
      else if (e.deltaY < 0 && atTop()) tryNavigate(-1);
      else lastEdgeAtRef.current = 0;
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (navLockRef.current) return;
      const dy = touchStartY - e.touches[0].clientY;
      if (dy > 0 && atBottom()) tryNavigate(1);
      else if (dy < 0 && atTop()) tryNavigate(-1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [view]);

  return (
    <>
      <Navbar />
      {view === "home" && <IntroOverlay />}
      <SocialSidebar />
      {view === "home" && (
        <>
          <HeroSection />
          <ShowreelSection />
          <ClientLogosSection />
        </>
      )}
      {view === "services" && (
        <div className="pt-20 bg-dark min-h-screen">
          <ServicesSection />
          <WhyChooseSection />
          <ProcessSection />
        </div>
      )}
      {view === "team" && (
        <div className="pt-20 bg-dark min-h-screen">
          <TeamSection />
        </div>
      )}
      {view === "gallery" && (
        <div className="pt-20">
          <GallerySection />
          <TestimonialsSection />
        </div>
      )}
      {view === "contact" && (
        <div className="pt-20 bg-dark min-h-screen">
          <ContactSection />
          <CareersSection />
        </div>
      )}
      <Footer />
      <BackToTop />
    </>
  );
};

export default Index;
