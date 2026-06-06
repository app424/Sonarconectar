import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "We listen to your requirements, find references, and research thoroughly." },
  { num: "02", title: "AI Concept & Design", desc: "Every idea is developed from scratch with multiple thinking hats." },
  { num: "03", title: "3D Visualisation", desc: "Full concept demo with presentations and 3D models." },
  { num: "04", title: "On-Ground Execution", desc: "Experienced engineers ensure end-to-end support. Quality. Safety first." },
  { num: "05", title: "Event Day", desc: "All effort and time put into action. Smooth delivery, remarkable result." },
];

const ProcessSection = () => (
  <section className="bg-dark py-24 md:py-32 border-t border-foreground/10">
    <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mf-eyebrow mb-6 flex items-center gap-3"
      >
        <span className="w-8 h-px bg-gold" /> How We Work
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mf-title text-foreground text-4xl md:text-6xl lg:text-7xl mb-16 max-w-4xl"
      >
        From dream <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>to reality.</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-foreground/10 border border-foreground/10">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-dark p-6 md:p-8 group hover:bg-dark-alt transition-colors"
          >
            <span className="font-heading font-black text-gold text-xs tracking-widest tabular-nums">
              {s.num}
            </span>
            <h3 className="mf-title text-foreground text-xl md:text-2xl mt-4 mb-3 group-hover:text-gold transition-colors">
              {s.title}
            </h3>
            <p className="font-body text-foreground/60 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
