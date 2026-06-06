import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sonarLogo from "@/assets/sonar-logo.png";
import NavLoader from "@/components/NavLoader";

const navLinks = [
  { label: "About", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Work", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const getActiveFromHash = () => {
  const h = (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "") || "home";
  if (h === "careers" || h === "contact") return "contact";
  if (h === "showreel") return "showreel";
  if (h === "services" || h.startsWith("services-")) return "services";
  if (h === "team") return "team";
  if (h === "gallery") return "gallery";
  return "home";
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(getActiveFromHash());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onHash = () => setActiveSection(getActiveFromHash());
    window.addEventListener("scroll", onScroll);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const targetId = href.replace("#", "");
    setLoading(true);
    window.setTimeout(() => {
      window.location.hash = targetId;
    }, 400);
    window.setTimeout(() => setLoading(false), 900);
  };

  const isActive = (href: string) => {
    const id = href.replace("#", "");
    if (id === "services" && activeSection === "services") return true;
    if (id === "team" && activeSection === "team") return true;
    if (id === "gallery" && activeSection === "gallery") return true;
    if (id === "contact" && activeSection === "contact") return true;
    if (id === "showreel" && activeSection === "showreel") return true;
    return false;
  };

  return (
    <>
      <NavLoader show={loading} />
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-dark/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Left: logo */}
          <button onClick={() => handleClick("#home")} className="flex items-center group">
            <img src={sonarLogo} alt="Sonar Conectar" className="h-20 md:h-28 w-auto" />
          </button>

          {/* Center: nav links */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className={`relative font-heading font-bold text-[11px] tracking-[0.25em] uppercase py-1 transition-colors ${
                  isActive(link.href) ? "text-gold" : "text-foreground hover:text-gold"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <span className="font-heading font-bold text-[11px] tracking-[0.25em] uppercase text-foreground/60">
              EN
            </span>
            <button
              onClick={() => handleClick("#contact")}
              className="px-5 py-2.5 border border-foreground text-foreground font-heading font-bold text-[11px] tracking-[0.25em] uppercase hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-40 bg-dark flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                onClick={() => handleClick(link.href)}
                className="font-heading font-black text-3xl tracking-[0.15em] uppercase text-foreground hover:text-gold transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => handleClick("#contact")}
              className="mt-4 px-7 py-3 border border-gold text-gold font-heading font-bold text-xs tracking-[0.25em] uppercase"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
