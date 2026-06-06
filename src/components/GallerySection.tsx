import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import gramophoneImg from "@/assets/gallery-gramophone.jpg";
import xtremeImg from "@/assets/gallery-xtreme.jpg";
import thrillscapeImg from "@/assets/gallery-thrillscape.jpg";
import brandActivation1 from "@/assets/gallery-brand-activation-1.jpg";
import brandActivation2 from "@/assets/gallery-brand-activation-2.jpg";
import brandActivation3 from "@/assets/gallery-brand-activation-3.jpg";
import velocityImg from "@/assets/gallery-velocity.jpg";
import domeImg from "@/assets/gallery-dome.jpg";
import horrorImg from "@/assets/gallery-horror.jpg";
import virtualWorldImg from "@/assets/gallery-virtual-world.jpg";
import corporate1 from "@/assets/gallery-corporate-1.jpg";
import corporate2 from "@/assets/gallery-corporate-2.jpg";
import corporate3 from "@/assets/gallery-corporate-3.jpg";
import corporate4 from "@/assets/gallery-corporate-4.jpg";
import corporate5 from "@/assets/gallery-corporate-5.jpg";
import corporate6 from "@/assets/gallery-corporate-6.jpg";
import mallDecor1 from "@/assets/gallery-mall-decor-1.jpg";
import mallDecor2 from "@/assets/gallery-mall-decor-2.jpg";
import mallDecor3 from "@/assets/gallery-mall-decor-3.jpg";
import mallDecor4 from "@/assets/gallery-mall-decor-4.jpg";
import mallDecor5 from "@/assets/gallery-mall-decor-5.jpg";
import mallDecor6 from "@/assets/gallery-mall-decor-6.jpg";
import mallDecor7 from "@/assets/gallery-mall-decor-7.jpg";
import mallDecor8 from "@/assets/gallery-mall-decor-8.jpg";
import mallDecor9 from "@/assets/gallery-mall-decor-9.jpg";
import experiential1 from "@/assets/gallery-experiential-1.jpg";
import experiential2 from "@/assets/gallery-experiential-2.jpg";
import experiential3 from "@/assets/gallery-experiential-3.jpg";
import experiential4 from "@/assets/gallery-experiential-4.jpg";
import experiential5 from "@/assets/gallery-experiential-5.jpg";
import experiential6 from "@/assets/gallery-experiential-6.jpg";
import experiential7 from "@/assets/gallery-experiential-7.jpg";

type Event = {
  name: string;
  cat: string;
  city: string;
  img: string;
  video?: string;
  group: "Experiential" | "Sonar IP" | "Mall Decor" | "Brand Activation" | "Corporate" | "Shorts";
};

const events: Event[] = [
  { name: "Nexus Shanthiniketan - Festival Reflection", cat: "Experiential", city: "Bangalore", img: experiential1, group: "Experiential" },
  { name: "Velocity", cat: "Sonar IP", city: "PAN India", img: velocityImg, group: "Sonar IP" },
  { name: "Thrillscape — Super Ride VR", cat: "Sonar IP", city: "Nexus Malls", img: thrillscapeImg, group: "Sonar IP" },
  { name: "Xtreme Reality", cat: "Sonar IP", city: "PAN India", img: xtremeImg, group: "Sonar IP" },
  { name: "Dome", cat: "Sonar IP", city: "Immersive 360°", img: domeImg, group: "Sonar IP" },
  { name: "Horror Mania", cat: "Sonar IP", city: "Themed Attraction", img: horrorImg, group: "Sonar IP" },
  { name: "Hyper Verse", cat: "Sonar IP", city: "VR Platform", img: virtualWorldImg, group: "Sonar IP" },
  { name: "Nexus Shanthiniketan - Festival Reflection", cat: "Experiential", city: "Bangalore", img: experiential2, group: "Experiential" },
  { name: "Nexus Shanthiniketan - Festival Reflection", cat: "Experiential", city: "Bangalore", img: experiential3, group: "Experiential" },
  { name: "Nexus Koramangala - Summer Beyond the stars", cat: "Experiential", city: "Bangalore", img: experiential4, group: "Experiential" },
  { name: "Nexus westend shipwreck wonders", cat: "Experiential", city: "Pune", img: experiential5, group: "Experiential" },
  { name: "Nexus Vegacity - summer playville", cat: "Experiential", city: "Bangalore", img: experiential6, group: "Experiential" },
  { name: "Nexus whitefield world of illusion", cat: "Experiential", city: "Bangalore", img: experiential7, group: "Experiential" },
  { name: "Nexus Kormangala - Santa", cat: "Mall Decor", city: "Bangalore", img: mallDecor1, group: "Mall Decor" },
  { name: "Forum South - Gramophone", cat: "Mall Decor", city: "Bangalore", img: mallDecor2, group: "Mall Decor" },
  { name: "Reliance Portico - Tradeshow", cat: "Brand Activation", city: "Delhi", img: brandActivation1, group: "Brand Activation" },
  { name: "Continental Coffee - Nexus", cat: "Brand Activation", city: "Hyderabad", img: brandActivation2, group: "Brand Activation" },
  { name: "Shop & Win", cat: "Brand Activation", city: "Hyderabad", img: brandActivation3, group: "Brand Activation" },
  { name: "Pacific Mall - The Royal Frame", cat: "Mall Decor", city: "Delhi", img: mallDecor3, group: "Mall Decor" },
  { name: "Nexus Southcity - Hot Air Balloon", cat: "Mall Decor", city: "Kolkata", img: mallDecor4, group: "Mall Decor" },
  { name: "Inorbit Hubli - Reflection of Joy", cat: "Mall Decor", city: "Hubli", img: mallDecor5, group: "Mall Decor" },
  { name: "Inorbit Vashi - Summer of Affairs", cat: "Mall Decor", city: "Mumbai", img: mallDecor6, group: "Mall Decor" },
  { name: "Nexus Kormangala - Dharayantram", cat: "Mall Decor", city: "Bangalore", img: mallDecor7, group: "Mall Decor" },
    { name: "Inorbit Hyderabad - Reindeer", cat: "Mall Decor", city: "Hyderabad", img: mallDecor8, group: "Mall Decor" },
    { name: "Nexus Shanthiniketan - Majestic Unicorn", cat: "Mall Decor", city: "Bangalore", img: mallDecor9, group: "Mall Decor" },
  { name: "Corporate Event — Vol 1", cat: "Corporate", city: "PAN India", img: corporate1, group: "Corporate" },
  { name: "Corporate Event — Vol 2", cat: "Corporate", city: "PAN India", img: corporate2, group: "Corporate" },
  { name: "Corporate Event — Vol 3", cat: "Corporate", city: "PAN India", img: corporate3, group: "Corporate" },
  { name: "Corporate Event — Vol 4", cat: "Corporate", city: "PAN India", img: corporate4, group: "Corporate" },
  { name: "Corporate Event — Vol 5", cat: "Corporate", city: "PAN India", img: corporate5, group: "Corporate" },
  { name: "Corporate Event — Vol 6", cat: "Corporate", city: "PAN India", img: corporate6, group: "Corporate" },
  { name: "Thrillscape — Short", cat: "Shorts", city: "", img: thrillscapeImg, video: "/shorts/thrillscape.mp4", group: "Shorts" },
  { name: "Shantiniketan — Festive Reflections", cat: "Shorts", city: "", img: thrillscapeImg, video: "/shorts/shantiniketan.mp4", group: "Shorts" },
];

const categories = ["All", "Sonar IP", "Experiential", "Mall Decor", "Brand Activation", "Corporate", "Shorts"] as const;

const GallerySection = () => {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<Event | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? events : events.filter((e) => e.group === filter)),
    [filter]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="bg-dark">
      <div className="px-6 md:px-12 pt-24 md:pt-32 pb-12 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mf-eyebrow mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-gold" /> Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mf-title text-foreground text-5xl md:text-7xl lg:text-8xl mb-12"
        >
          Events that left <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>a mark.</span>
        </motion.h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-b border-foreground/10 py-4">
          {categories.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative font-heading font-bold text-[11px] tracking-[0.25em] uppercase transition-colors ${
                  active ? "text-gold" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-width grid */}
      <div className="px-3 md:px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((e, i) => (
              <motion.div
                key={`${e.name}-${e.img}`}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.45 }}
                onClick={() => setLightbox(e)}
                className="relative group overflow-hidden aspect-[4/3] cursor-zoom-in bg-dark-alt"
              >
                {e.video ? (
                  <video
                    src={e.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={(ev) => ev.preventDefault()}
                    onMouseEnter={(ev) => (ev.currentTarget as HTMLVideoElement).play().catch(() => {})}
                    onMouseLeave={(ev) => { const v = ev.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 pointer-events-none"
                  />
                ) : (
                  <img
                    src={e.img}
                    alt={e.name}
                    draggable={false}
                    onContextMenu={(ev) => ev.preventDefault()}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 select-none pointer-events-none"
                    loading="lazy"
                  />
                )}
                {/* Default subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Transparent overlay catches right-click save attempts */}
                <div className="absolute inset-0 z-10" onContextMenu={(ev) => ev.preventDefault()} />
                {/* Always-visible bottom title */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="font-heading font-bold text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                    {e.cat}
                  </p>
                  <h3 className="mf-title text-foreground text-xl md:text-2xl leading-tight">
                    {e.name}
                  </h3>
                  <p className="font-body text-foreground/60 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {e.city} →
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button
              onClick={(ev) => { ev.stopPropagation(); setLightbox(null); }}
              aria-label="Close"
              className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 flex items-center justify-center border border-foreground/30 text-foreground hover:bg-gold hover:text-dark hover:border-gold transition-colors"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(ev) => ev.stopPropagation()}
              className="relative max-w-[1400px] w-full max-h-[90vh] flex flex-col items-center"
            >
              {lightbox.video ? (
                <video
                  src={lightbox.video}
                  controls
                  autoPlay
                  playsInline
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  onContextMenu={(ev) => ev.preventDefault()}
                  className="max-h-[80vh] w-auto max-w-full object-contain bg-black"
                />
              ) : (
                <img
                  src={lightbox.img}
                  alt={lightbox.name}
                  draggable={false}
                  onContextMenu={(ev) => ev.preventDefault()}
                  className="max-h-[80vh] w-auto max-w-full object-contain select-none"
                />
              )}
              <div className="mt-4 text-center">
                <p className="font-heading font-bold text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                  {lightbox.cat}
                </p>
                <h3 className="mf-title text-foreground text-2xl md:text-3xl">
                  {lightbox.name}
                </h3>
                <p className="font-body text-foreground/60 text-xs mt-1">{lightbox.city}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
