import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import sonarLogo from "@/assets/sonar-logo.png";

const stats = [
  { label: "Years", value: 10, suffix: "+" },
  { label: "Brand Partners", value: 150, suffix: "+" },
  { label: "Projects", value: 5000, suffix: "+" },
  { label: "Cities", value: 26, suffix: "" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-heading font-black text-foreground text-4xl md:text-5xl tabular-nums">
      {count.toLocaleString()}
      <span className="text-gold">{suffix}</span>
    </span>
  );
};

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.7], [0.06, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const scrollTo = (id: string) => {
    window.location.hash = id.replace("#", "");
  };

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Backdrop logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ scale: logoScale }}
      >
        <motion.img
          src={sonarLogo}
          alt=""
          className="w-[600px] md:w-[800px] lg:w-[1000px] select-none pointer-events-none"
          style={{ opacity: logoOpacity }}
        />
      </motion.div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 120 }).map((_, i) => {
          const size = Math.random() * 3 + 0.5;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = 2 + Math.random() * 4;
          const isLarge = Math.random() > 0.85;
          const finalSize = isLarge ? size * 2.5 : size;
          const glow = isLarge ? finalSize * 8 : finalSize * 4;
          const spread = isLarge ? finalSize * 2.5 : finalSize;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: finalSize,
                height: finalSize,
                left: `${left}%`,
                top: `${top}%`,
                boxShadow: `0 0 ${glow}px ${spread}px rgba(255,255,255,${isLarge ? 0.9 : 0.7})`,
              }}
              animate={{ opacity: [0, isLarge ? 1 : 0.85, 0], scale: [0.4, isLarge ? 1.8 : 1.5, 0.4] }}
              transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-dark/60 pointer-events-none" />

      {/* Side rails */}
      <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left z-20">
        <span className="font-heading font-bold text-[11px] tracking-[0.4em] uppercase text-foreground/40">
          Est. 2014 — Bangalore
        </span>
      </div>
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right z-20">
        <span className="font-heading font-bold text-[11px] tracking-[0.4em] uppercase text-foreground/40">
          Connecting Dreams
        </span>
      </div>

      {/* Main content */}
      <motion.div className="relative z-10 px-6 md:px-12 max-w-[1400px] w-full" style={{ y: textY }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mf-eyebrow mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-gold" />
          Sonar Conectar — Media & Entertainment
        </motion.p>

        <h1 className="mf-title text-foreground text-[14vw] md:text-[10vw] lg:text-[9rem] xl:text-[10rem] mb-8">
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
              Connecting
            </motion.span>
          </motion.span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-gold italic font-medium"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              style={{ fontFamily: '"Archivo Narrow", sans-serif' }}
            >
              Dreams.
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid md:grid-cols-2 gap-8 md:gap-16 items-end max-w-5xl"
        >
          <p className="font-body text-foreground/70 text-base md:text-lg leading-relaxed">
            Transforming mall spaces and brand experiences across India since 2014 — high-impact experiential events that deliver measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => scrollTo("gallery")} className="mf-btn">
              Explore Our Work
              <span className="ml-3">→</span>
            </button>
            <button onClick={() => scrollTo("services")} className="mf-btn-gold">
              Services
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 w-full border-t border-foreground/10 bg-dark/70 backdrop-blur-sm">
        <div className="px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex flex-col"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="font-heading font-bold text-foreground/50 text-[10px] tracking-[0.3em] uppercase mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
