import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import introVideo from "@/assets/intro.mp4";

const INTRO_KEY = "introPlayed";

const IntroOverlay = () => {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const close = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-x-0 bottom-0 top-20 z-40 bg-dark"
        >
          <button
            onClick={close}
            aria-label="Close intro video"
            className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-dark/80 hover:bg-gold hover:text-dark text-foreground border border-gold/40 backdrop-blur-sm transition-all font-body text-xs tracking-wider uppercase"
          >
            Skip <X className="w-4 h-4" />
          </button>
          <div className="w-full h-full flex flex-col items-center justify-center bg-dark px-6 text-center">
            <p className="mf-eyebrow mb-6 flex items-center gap-3 text-gold">
              <span className="w-8 h-px bg-gold" /> Sonar Conectar
            </p>
            <h1 className="mf-title text-foreground text-5xl md:text-7xl lg:text-8xl tracking-tight">
              Showreel <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>coming soon.</span>
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
