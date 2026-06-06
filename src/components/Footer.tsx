import sonarLogo from "@/assets/sonar-logo.png";

const quickLinks = [
  { label: "Home", target: "home" },
  { label: "Services", target: "services" },
  { label: "Work", target: "gallery" },
  { label: "Reels", target: "showreel" },
  { label: "Contact", target: "contact" },
];

const serviceLinks = [
  { label: "Experiential Decor", slug: "experiential-decor" },
  { label: "Corporate Events", slug: "corporate-events" },
  { label: "Sonar IP", slug: "sonar-ip" },
  { label: "Brand Marketing", slug: "brand-marketing" },
  { label: "Exhibition", slug: "exhibition-and-trade-shows" },
];

const navigateToHash = (target: string) => {
  if (window.location.pathname !== "/") {
    window.location.href = `/#${target}`;
    return;
  }
  window.location.hash = target;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => (
  <footer className="bg-dark border-t border-foreground/10">
    {/* Big CTA band */}
    <div className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto border-b border-foreground/10">
      <p className="mf-eyebrow mb-6 flex items-center gap-3">
        <span className="w-8 h-px bg-gold" /> Ready When You Are
      </p>
      <button
        onClick={() => navigateToHash("contact")}
        className="block text-left mf-title text-foreground text-5xl md:text-7xl lg:text-9xl hover:text-gold transition-colors leading-[0.95] group"
      >
        Let's <span className="italic font-medium text-gold" style={{ fontFamily: '"Archivo Narrow", sans-serif' }}>talk.</span>
        <span className="block mt-4 font-heading font-bold text-xs tracking-[0.3em] uppercase text-foreground/50 group-hover:text-gold transition-colors">
          → Tell Us Your Idea
        </span>
      </button>
    </div>

    {/* Links */}
    <div className="bg-white text-black">
      <div className="px-6 md:px-12 py-16 max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex flex-col items-start gap-4 mb-5">
            <img src={sonarLogo} alt="Sonar Conectar" className="h-24 md:h-28 w-auto" />
            <div>
              <p className="font-heading font-black text-black text-sm tracking-[0.25em] uppercase">
                Sonar Conectar
              </p>
              <p className="font-body text-black/50 text-[10px] tracking-[0.25em] uppercase mt-0.5">
                Media & Entertainment
              </p>
            </div>
          </div>
          <p className="font-body text-black/70 text-sm leading-relaxed max-w-xs">
            Transforming mall spaces and brand experiences across India since 2014.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="mf-eyebrow mb-5 !text-gold">Navigate</p>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.target}>
                <button
                  onClick={() => navigateToHash(l.target)}
                  className="font-heading font-bold text-black/80 text-sm tracking-wider uppercase hover:text-gold transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mf-eyebrow mb-5 !text-gold">Services</p>
          <ul className="space-y-3">
            {serviceLinks.map((l) => (
              <li key={l.slug}>
                <button
                  onClick={() => navigateToHash(`services-${l.slug}`)}
                  className="font-heading font-bold text-black/80 text-sm tracking-wider uppercase hover:text-gold transition-colors text-left"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="mf-eyebrow mb-5 !text-gold">Connect</p>
          <ul className="space-y-3">
            <li>
              <a href="https://www.instagram.com/sonarconectar" target="_blank" rel="noopener noreferrer" className="font-heading font-bold text-black/80 text-sm tracking-wider uppercase hover:text-gold transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/sonar-conectar-media-and-entertainment/" target="_blank" rel="noopener noreferrer" className="font-heading font-bold text-black/80 text-sm tracking-wider uppercase hover:text-gold transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@SonarConectarMediaandEntertain" target="_blank" rel="noopener noreferrer" className="font-heading font-bold text-black/80 text-sm tracking-wider uppercase hover:text-gold transition-colors">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="px-6 md:px-12 py-6 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-body text-black/50 text-xs">© 2025 Sonar Conectar Media & Entertainment.</p>
          <p className="font-body text-black/50 text-xs">Made with ♥ in Bangalore</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
