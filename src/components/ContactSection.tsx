import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const serviceOptions = [
  "Experiential Decor",
  "Corporate Events",
  "Social Events",
  "Virtual Events",
  "Brand Marketing",
  "Exhibition",
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", message: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = true;
    if (!form.phone.trim()) newErrors.phone = true;
    if (!form.service) newErrors.service = true;
    if (!form.message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setErrorMsg("");
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-contact", { body: form });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Submission failed");
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b ${
      errors[field] ? "border-red-500" : "border-foreground/20"
    } px-0 py-4 font-body text-foreground text-base focus:outline-none focus:border-gold transition-colors placeholder:text-foreground/35`;

  return (
    <section id="contact" className="bg-dark border-t border-foreground/10">
      <div className="px-6 md:px-12 pt-24 md:pt-32 pb-24 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mf-eyebrow mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-gold" /> Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mf-title text-foreground text-5xl md:text-7xl lg:text-8xl mb-16"
        >
          Let's create something <span className="text-gold italic font-medium" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>unforgettable.</span>
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-10"
          >
            <div>
              <p className="mf-eyebrow mb-3">Phone</p>
              <a href="tel:+918884416839" className="font-heading font-bold text-foreground text-xl md:text-2xl tracking-tight hover:text-gold transition-colors">
                +91 88844 16839
              </a>
            </div>
            <div>
              <p className="mf-eyebrow mb-3">Email</p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@sonarconectar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-bold text-foreground text-xl md:text-2xl tracking-tight hover:text-gold transition-colors break-all"
              >
                info@sonarconectar.com
              </a>
            </div>
            <div>
              <p className="mf-eyebrow mb-3">Studio</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=988%2C+3rd+A+Cross+Rd%2C+HRBR+Layout+1st+Block%2C+HRBR+Layout%2C+Kalyan+Nagar%2C+Bengaluru%2C+Karnataka+560043"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-foreground/80 text-base leading-relaxed hover:text-gold transition-colors block"
              >
                988, 3rd A Cross Rd, HRBR Layout 1st Block,
                <br />
                Kalyan Nagar, Bengaluru, Karnataka 560043
              </a>
            </div>
            <div>
              <p className="mf-eyebrow mb-4">Follow</p>
              <div className="flex gap-3">
                {[
                  { label: "Instagram", short: "IG", href: "https://www.instagram.com/sonarconectar" },
                  { label: "LinkedIn", short: "IN", href: "https://www.linkedin.com/company/sonar-conectar-media-and-entertainment/" },
                  { label: "Facebook", short: "FB", href: "https://www.facebook.com/sonarconectar" },
                  { label: "YouTube", short: "YT", href: "https://www.youtube.com/@SonarConectarMediaandEntertain" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-heading font-bold text-[10px] tracking-widest text-foreground/70 hover:bg-gold hover:border-gold hover:text-dark transition-all"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid md:grid-cols-2 gap-x-6">
                <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass("name")} />
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass("email")} />
                <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass("phone")} />
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass("date")} />
              </div>
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputClass("service")}>
                <option value="" disabled>Service Required</option>
                {serviceOptions.map((o) => (
                  <option key={o} value={o} className="bg-dark text-foreground">{o}</option>
                ))}
              </select>
              <textarea placeholder="Tell us about your project" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass("message") + " resize-none"} />

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-10 py-4 border border-gold bg-gold text-dark font-heading font-bold text-xs tracking-[0.25em] uppercase hover:bg-transparent hover:text-gold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message →"}
                </button>
              </div>

              {submitted && (
                <p className="font-heading font-bold text-gold text-xs tracking-widest uppercase pt-4">
                  ✓ Thank you — we'll be in touch shortly.
                </p>
              )}
              {errorMsg && (
                <p className="font-body text-red-500 text-sm pt-4">{errorMsg}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
