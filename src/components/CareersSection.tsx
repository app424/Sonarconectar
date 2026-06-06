import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Briefcase, MapPin, Clock, Loader2 } from "lucide-react";

type Role = {
  department: string;
  location: string;
  position: string;
  experience: string;
};

const emptyForm = { fullName: "", phone: "", email: "", city: "" };

const CareersSection = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [applyRole, setApplyRole] = useState<Role | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleOpen = async () => {
    setOpen(true);
    if (roles.length > 0) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("get-open-roles");
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed to load roles");
      setRoles(data.roles || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  const openApply = (role: Role) => {
    setApplyRole(role);
    setForm(emptyForm);
    setErrors({});
    setSubmitted(false);
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!form.fullName.trim()) newErrors.fullName = true;
    if (!form.phone.trim()) newErrors.phone = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = true;
    if (!form.city.trim()) newErrors.city = true;
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitError("");
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-application", {
        body: {
          ...form,
          position: applyRole?.position,
          department: applyRole?.department,
        },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Submission failed");
      setSubmitted(true);
      setForm(emptyForm);
      setTimeout(() => {
        setApplyRole(null);
        setSubmitted(false);
      }, 2200);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b ${
      errors[field] ? "border-red-500" : "border-foreground/25"
    } px-0 py-3 font-body text-foreground text-base focus:outline-none focus:border-gold transition-colors placeholder:text-foreground/45`;

  return (
    <section id="careers" className="bg-dark border-t border-foreground/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8 items-end"
      >
        <div className="md:col-span-7">
          <p className="mf-eyebrow mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-gold" /> Careers
          </p>
          <h2 className="mf-title text-foreground text-4xl md:text-6xl lg:text-7xl">
            Join the Sonar{" "}
            <span
              className="text-gold italic font-medium"
              style={{ fontFamily: '"Archivo Narrow", sans-serif' }}
            >
              family.
            </span>
          </h2>
        </div>
        <div className="md:col-span-5 md:pb-3">
          <p className="font-body text-foreground/70 text-base leading-relaxed mb-6">
            We're always looking for passionate, creative minds. Send your portfolio to{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info@sonarconectar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              info@sonarconectar.com
            </a>
          </p>
          <button onClick={handleOpen} className="mf-btn-gold">
            View Open Roles →
          </button>
        </div>
      </motion.div>

      {/* Roles list */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl bg-dark border-gold/30 text-foreground max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mf-title text-3xl md:text-4xl text-foreground">
              Open <span className="text-gold">Roles</span>
            </DialogTitle>
            <p className="font-body text-foreground/60 text-sm mt-2">
              Current opportunities at Sonar Conectar
            </p>
          </DialogHeader>

          <div className="mt-6">
            {loading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
              </div>
            )}
            {error && !loading && (
              <p className="text-center text-red-400 py-8 font-body">{error}</p>
            )}
            {!loading && !error && roles.length === 0 && (
              <p className="text-center text-foreground/60 py-8 font-body">
                No open roles at the moment.
              </p>
            )}

            <AnimatePresence>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {roles.map((role, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border border-gold/40 bg-black/40 p-6 hover:border-gold transition-colors group"
                  >
                    <p className="mf-eyebrow text-gold text-xs mb-3 flex items-center gap-2">
                      <Briefcase className="w-3 h-3" />
                      {role.department}
                    </p>
                    <h3
                      className="text-foreground text-xl font-bold uppercase tracking-wide mb-4 leading-tight"
                      style={{ fontFamily: "Archivo, sans-serif" }}
                    >
                      {role.position}
                    </h3>
                    <div className="space-y-2 mb-5 font-body text-sm text-foreground/70">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold/70" />
                        <span className="capitalize">{role.location}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold/70" />
                        {role.experience} {role.experience.toLowerCase() !== "fresher" && "yrs exp"}
                      </p>
                    </div>
                    <button
                      onClick={() => openApply(role)}
                      className="inline-block text-gold text-xs uppercase tracking-[0.2em] border-b border-gold/40 hover:border-gold pb-1 transition-colors"
                    >
                      Apply Now →
                    </button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply form */}
      <Dialog open={!!applyRole} onOpenChange={(o) => !o && setApplyRole(null)}>
        <DialogContent className="max-w-lg bg-dark border-gold/30 text-foreground">
          <DialogHeader>
            <DialogTitle
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "Archivo, sans-serif" }}
            >
              Apply Now
            </DialogTitle>
            {applyRole && (
              <p className="font-body text-foreground/60 text-sm mt-1">
                {applyRole.position} — {applyRole.department}
              </p>
            )}
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label className="block font-body text-foreground/80 text-sm mb-1">Full Name*</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={inputClass("fullName")}
              />
            </div>
            <div>
              <label className="block font-body text-foreground/80 text-sm mb-1">Phone no.*</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass("phone")}
              />
            </div>
            <div>
              <label className="block font-body text-foreground/80 text-sm mb-1">Email*</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass("email")}
              />
            </div>
            <div>
              <label className="block font-body text-foreground/80 text-sm mb-1">City*</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={inputClass("city")}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-full bg-gold text-dark font-heading font-bold text-sm tracking-wide hover:bg-gold/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            {submitted && (
              <p className="font-heading font-bold text-gold text-xs tracking-widest uppercase">
                ✓ Application submitted — thank you!
              </p>
            )}
            {submitError && <p className="font-body text-red-400 text-sm">{submitError}</p>}
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CareersSection;
