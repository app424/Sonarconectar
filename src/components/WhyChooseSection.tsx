import { motion } from "framer-motion";

const features = [
  { num: "01", title: "Precision-Led Delivery", desc: "On-time delivery backed by rigorous planning and seamless on-ground execution." },
  { num: "02", title: "Breakthrough Concepts", desc: "Experiential concepts that attract audiences — even with constrained budgets." },
  { num: "03", title: "End-to-End Excellence", desc: "Operational ease, brand consistency, and unforgettable customer experiences." },
  { num: "04", title: "Proven Results", desc: "150+ brands, 5000+ projects, 50% repeat business — measurable ROI every time." },
];

const WhyChooseSection = () => (
  <section className="bg-dark py-24 md:py-32 border-t border-foreground/10">
    <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mf-eyebrow mb-6 flex items-center gap-3"
      >
        <span className="w-8 h-px bg-gold" /> The Sonar Difference
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mf-title text-foreground text-4xl md:text-6xl lg:text-7xl mb-16 max-w-4xl"
      >
        Why work <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>with us.</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="border-t border-foreground/15 pt-6 group"
          >
            <div className="flex items-start gap-6">
              <span className="font-heading font-black text-gold text-sm tracking-widest tabular-nums">
                {f.num}
              </span>
              <div className="flex-1">
                <h3 className="mf-title text-foreground text-2xl md:text-3xl mb-3 group-hover:text-gold transition-colors">
                  {f.title}
                </h3>
                <p className="font-body text-foreground/60 text-base leading-relaxed max-w-md">{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
