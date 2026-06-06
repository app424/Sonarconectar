import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Sonar Conectar's team is exceptional and innovative. They truly comprehend the necessity of the hour and execute precisely based on their visualisation.",
    name: "Mr. Allauddin",
    role: "Head Marketing Manager, Forum Shantiniketan, Bangalore",
  },
  {
    quote: "Their event management experience guaranteed our event ran smoothly, and the support on event day was remarkable.",
    name: "Nikesh Juikar",
    role: "HOH, Bangalore",
  },
  {
    quote: "For anything and everything, Sonar Conectar makes it happen. Their experiential campaigns generated 2+ crore in measurable ROI.",
    name: "Asif Hizaj",
    role: "Marketing Manager, Purvankara Ltd",
  },
  {
    quote: "Their World's Largest Gramophone installation at Forum South Bengaluru became a landmark — recognised by the International Book of Records.",
    name: "Client",
    role: "Forum South Bengaluru",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-dark py-24 md:py-32 border-t border-foreground/10">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mf-eyebrow mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-gold" /> Testimonials
        </motion.p>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="mf-title text-foreground text-3xl md:text-4xl lg:text-5xl">
              What clients <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>say.</span>
            </h2>
          </div>

          <div className="md:col-span-8 min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-display text-foreground text-2xl md:text-3xl lg:text-4xl leading-snug font-medium mb-8">
                  "{testimonials[current].quote}"
                </p>
                <div className="flex items-center gap-4 border-t border-foreground/10 pt-5">
                  <span className="font-heading font-black text-gold text-sm tracking-widest tabular-nums">
                    0{current + 1}/0{testimonials.length}
                  </span>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-foreground text-sm tracking-wider uppercase">
                      {testimonials[current].name}
                    </p>
                    <p className="font-body text-foreground/50 text-xs mt-1">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="relative w-12 h-px overflow-hidden bg-foreground/15"
                  aria-label={`Testimonial ${i + 1}`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gold"
                    initial={false}
                    animate={{ scaleX: i === current ? 1 : 0 }}
                    transition={{ duration: i === current ? 5.5 : 0.3 }}
                    style={{ originX: 0 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
