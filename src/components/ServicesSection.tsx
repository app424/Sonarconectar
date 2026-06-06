import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const services = [
  {
    num: "01",
    title: "Experiential Decor",
    short: "Mall · Display · Outdoor · Thematic",
    desc: "Transforming spaces into lifestyle experiences through creative decor for malls, exhibitions, and brand environments.",
    details: {
      intro: "We design immersive environments that transform ordinary spaces into unforgettable lifestyle experiences. Every installation is crafted to engage shoppers, captivate audiences, and amplify brand presence.",
      offerings: [
        "Mall Decor — Seasons, redesigned. Festive takeovers, thematic builds, and mall-wide transformations.",
        "Display Installations — Built to be remembered. Large-format sculptural, kinetic, and interactive installations.",
        "Outdoor Decor — The city becomes the canvas. Façade dressing, plaza activations, and streetscape design.",
        "Themed Environments — Concept first. Crafted everywhere. Immersive builds for launches, campaigns, and cultural moments.",
        "Visual Merchandising — Retail, restaged. Window displays and in-store storytelling that turn browsers into buyers.",
      ],
      highlight: "Flagship: World's Largest Gramophone & Blue Magical Santa installations.",
    },
  },
  {
    num: "02",
    title: "Corporate Events",
    short: "Annual Days · Launches · MICE · Trade Shows",
    desc: "Large or small, we deliver indelible and momentous corporate events end-to-end.",
    details: {
      intro: "We design corporate events that strengthen culture, celebrate milestones, and drive business outcomes — from intimate leadership offsites to large-format conferences and launches.",
      offerings: [
        "Annual & Family Days — Culture-building days that bring employees, families, and leadership together",
        "Rewards & Recognition — Award nights and gala evenings that celebrate performance in style",
        "Product Launches — High-impact reveals built on storytelling, stagecraft, and showmanship",
        "Trade Shows & MICE — End-to-end planning, logistics, and delegate management at scale",
        "Stalls & Booth Design — Custom-built brand environments for trade shows and industry events",
      ],
      highlight: "Trusted by leading brands for flawless, large-format corporate experiences.",
    },
  },
  {
    num: "03",
    title: "Sonar IP",
    short: "Velocity · Thrillscape · Dome · Horror Mania",
    desc: "Our signature experiential IPs — immersive, ticketed attractions designed to engage audiences at scale.",
    details: {
      intro: "Sonar's proprietary IPs are high-impact, repeatable experiences engineered to draw crowds and build brand affinity across malls, events, and activations. Each format is proven on the ground — not pitched on a slide.",
      offerings: [
        "Velocity — Racing, reimagined. High-octane motion and AR experience.",
        "Thrillscape — Step into the game. Multi-zone VR adventure park.",
        "Dome — 360° in every direction. Immersive projection environment.",
        "Horror Mania — Walk in. Run out. Themed haunted walk-through attraction.",
        "Xtreme Reality — Where real meets rendered. Mixed-reality experience zone.",
        "Virtual World — Worlds without limits. Next-gen VR exploration platform.",
      ],
      highlight: "Proven IPs deployed across India's leading malls and venues.",
    },
  },
  {
    num: "04",
    title: "Brand Marketing",
    short: "Activations · Roadshows · Pop-ups · Launches",
    desc: "Strategic brand activations and marketing consultation to leave lasting impressions.",
    details: {
      intro: "Strategy meets spectacle. We craft activations and campaigns that put your brand in front of the right audiences, in the right moments.",
      offerings: [
        "Brand Activations — Experiential campaigns that drive recall and conversion",
        "Roadshows — Multi-city tours with consistent brand storytelling",
        "Pop-ups — Limited-time installations that create buzz and footfall",
        "Store Launches — Memorable openings that anchor your retail presence",
        "Pan-India Campaigns — Coordinated rollouts across geographies and audiences",
      ],
      highlight: "Strategic consultation paired with on-ground execution at scale.",
    },
  },
  {
    num: "05",
    title: "Exhibition & Trade Shows",
    short: "Stall · Fabrication · Experiential Zones",
    desc: "End-to-end exhibition solutions — stall design, fabrication, logistics, and experiential zones.",
    details: {
      intro: "From concept to teardown, we deliver exhibition presence that stops traffic and starts conversations on the show floor.",
      offerings: [
        "Stall Design — Architectural concepts tailored to your brand language",
        "Fabrication — In-house production with quality control end-to-end",
        "Experiential Zones — Interactive installations and demo spaces",
        "Event Conceptualisation — Full theme, narrative, and engagement strategy",
        "Logistics & Setup — On-site management across cities and venues",
      ],
      highlight: "Turnkey exhibition partner trusted across industries.",
    },
  },
];

const ServicesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const checkHashForService = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash.startsWith("services-")) return;
      const slug = hash.replace("services-", "");
      const idx = services.findIndex((s) => slugify(s.title) === slug);
      if (idx >= 0) {
        setExpanded(idx);
        setTimeout(() => {
          const el = document.getElementById(`service-${slug}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      }
    };
    checkHashForService();
    window.addEventListener("hashchange", checkHashForService);
    return () => window.removeEventListener("hashchange", checkHashForService);
  }, []);

  return (
    <section id="services" className="bg-dark">
      {/* Intro band */}
      <div className="px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mf-eyebrow mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-gold" /> Who We Are
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mf-title text-foreground text-5xl md:text-7xl lg:text-8xl max-w-5xl mb-12"
        >
          A leading force in <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>experiential</span> events & decor.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
          <p className="font-body text-foreground/70 text-base md:text-lg leading-relaxed">
            Since 2014, Sonar Conectar has transformed mall spaces and brand experiences across India. We specialise in high-impact experiential events, immersive décor, and customer-engagement activations that deliver measurable business outcomes.
          </p>
          <p className="font-body text-foreground/70 text-base md:text-lg leading-relaxed">
            150+ brands, 26 cities, 5000+ projects.<br />Backed by a 48-member expert team, recognised by EDCA and Times Awards, and trusted with 50% repeat business — creativity you can measure.
          </p>
        </div>
      </div>

      {/* Services list — large rows (white band) */}
      <div className="bg-white text-black border-t border-black/10">
        <div className="px-6 md:px-12 pt-16 pb-8 max-w-[1400px] mx-auto">
          <p className="mf-eyebrow mb-3 flex items-center gap-3 !text-gold">
            <span className="w-8 h-px bg-gold" /> What We Do
          </p>
          <h3 className="mf-title text-black text-4xl md:text-6xl">Services</h3>
        </div>

        <div className="max-w-[1400px] mx-auto">
          {services.map((s, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={s.title}
                id={`service-${slugify(s.title)}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="border-t border-black/10 last:border-b"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full text-left px-6 md:px-12 py-8 md:py-10 group flex items-center gap-6 md:gap-10 hover:bg-black/[0.03] transition-colors"
                >
                  <span className="font-heading font-black text-black/40 text-sm md:text-base tracking-widest tabular-nums w-8">
                    {s.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="mf-title text-black text-2xl md:text-4xl lg:text-5xl group-hover:text-gold transition-colors">
                      {s.title}
                    </h4>
                    <p className="font-body text-black/60 text-xs md:text-sm tracking-wider uppercase mt-2">
                      {s.short}
                    </p>
                  </div>
                  <span className={`text-black/60 text-2xl md:text-3xl transition-all duration-300 ${isOpen ? "rotate-45 text-gold" : "group-hover:text-gold"}`}>
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-12 pb-10 md:pb-14 grid md:grid-cols-12 gap-8">
                        <div className="md:col-span-4 md:col-start-2">
                          <p className="mf-eyebrow mb-3 !text-gold">Overview</p>
                          <p className="font-body text-black/80 text-base leading-relaxed">
                            {s.details.intro}
                          </p>
                          <p className="font-body text-gold text-sm italic mt-6 leading-relaxed">
                            {s.details.highlight}
                          </p>
                        </div>
                        <div className="md:col-span-6">
                          <p className="mf-eyebrow mb-3 !text-gold">What We Offer</p>
                          <ul className="space-y-3">
                            {s.details.offerings.map((o) => (
                              <li key={o} className="font-body text-black/70 text-sm md:text-base flex gap-4 border-b border-black/10 pb-3">
                                <span className="text-gold mt-1">→</span>
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
