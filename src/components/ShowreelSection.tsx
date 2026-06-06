import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const DEFAULT_VIDEO_ID = "QQSedSamgXU";
const FRONT_DRIVE_ID = "1NSaNRvHhbWxo-H1R6d62_4OEAHQ7dDdJ";

type SonarSource = {
  name: string;
  driveId?: string;
};

const SONAR_SOURCES: SonarSource[] = [
  { name: "Velocity", driveId: "1fkldY-_-m5epKqPMio5OdI8ed8c3aSz6" },
  { name: "Thrillscape", driveId: "1_MHxwPrc76rGmGvM6uuEVK9Rmo1r2hfS" },
  { name: "Dome" },
  { name: "Horror Mania", driveId: "1cZSYtaTKxfvKgVi7Lrm8UjFzssTRMqmO" },
  { name: "Xtreme Reality", driveId: "1-m7H_BwKvm9zBqtXo2dX-Wpp2pBy37sH" },
  { name: "Virtual World" },
];

type ActiveSource =
  | { type: "youtube"; id: string; label: string }
  | { type: "drive"; id: string; label: string };

const ShowreelSection = () => {
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<ActiveSource>({
    type: "drive",
    id: FRONT_DRIVE_ID,
    label: "Showreel",
  });

  const selectSonar = (s: SonarSource) => {
    if (!s.driveId) return;
    setActive({ type: "drive", id: s.driveId, label: s.name });
    setPlaying(true);
  };

  const playerSrc =
    active.type === "youtube"
      ? `https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`
      : `https://drive.google.com/file/d/${active.id}/preview`;

  return (
    <section id="showreel" className="bg-dark py-24 md:py-32 border-t border-foreground/10">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mf-eyebrow mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-gold" /> Reels — {active.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mf-title text-foreground text-4xl md:text-6xl lg:text-7xl mb-12"
        >
          Experiences <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>in motion.</span>
        </motion.h2>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-video overflow-hidden bg-dark-alt mb-10"
        >
          {playing ? (
            <iframe
              key={`${active.type}-${active.id}`}
              src={playerSrc}
              title={`Sonar Conectar — ${active.label}`}
              allow="accelerated-encoding; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play showreel"
              className="group absolute inset-0 w-full h-full cursor-pointer"
            >
              <img
                src={`https://drive.google.com/thumbnail?id=${FRONT_DRIVE_ID}&sz=w1600`}
                alt="Sonar Conectar showreel preview"
                loading="lazy"
                draggable={false}
                onContextMenu={(ev) => ev.preventDefault()}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105 select-none"
              />
              <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-28 h-28 border border-foreground/40 rounded-full group-hover:border-gold group-hover:scale-110 transition-all duration-500" />
                  <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-foreground text-dark group-hover:bg-gold transition-all duration-300">
                    <Play className="w-7 h-7 ml-1" fill="currentColor" />
                  </span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6">
                <p className="font-heading font-bold text-foreground text-[10px] tracking-[0.3em] uppercase">
                  Forum South - Gramophone, Bangalore
                </p>
              </div>
            </button>
          )}
        </motion.div>

        {/* Sonar IP tabs */}
        <p className="mf-eyebrow mb-4">Sonar IP — Pick a Reel</p>
        <div className="grid grid-cols-2 md:grid-cols-6 border-t border-l border-foreground/10">
          {SONAR_SOURCES.map((s) => {
            const enabled = !!s.driveId;
            const isActive = active.type === "drive" && active.id === s.driveId;
            return (
              <button
                key={s.name}
                onClick={() => selectSonar(s)}
                disabled={!enabled}
                className={`px-4 py-5 font-heading font-bold text-[11px] tracking-[0.25em] uppercase border-r border-b border-foreground/10 transition-colors ${
                  isActive
                    ? "bg-gold text-dark"
                    : enabled
                    ? "text-foreground/80 hover:bg-foreground/5 hover:text-gold"
                    : "text-foreground/25 cursor-not-allowed"
                }`}
              >
                {s.name}
                {!enabled && <span className="block text-[8px] text-foreground/30 mt-1">Soon</span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;
