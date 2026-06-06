import { motion } from "framer-motion";
import amitImage from "@/assets/team-amit.jpeg";
import anubhavImage from "@/assets/team-anubhav.jpeg";
import sandhyaImage from "@/assets/team-sandhya.png";

const team = [
  {
    name: "Amit Sharma",
    role: "Founder & CEO",
    image: amitImage,
    bio: "With 11 years of experience shaping live experiences and brand storytelling, Amit founded Sonar Conectar with a singular vision — to connect dreams with reality through the power of immersive moments. From intimate brand launches to large-scale concerts and IPs, he has led the creation of unforgettable experiences for 600+ global brands across India and beyond. His sharp instinct for culture, relentless pursuit of craft, and ability to turn bold ideas into tangible cultural moments are the driving force behind every story Sonar Conectar tells.",
  },
  {
    name: "Anubhav Sharma",
    role: "CFO & COO",
    image: anubhavImage,
    bio: "With 11 years of experience steering finance and operations across the live experience industry, Anubhav is the backbone of Sonar Conectar's growth story. As CFO & COO, he architects the financial discipline and operational frameworks that allow bold creative ideas to scale into flawlessly executed realities. From budgeting 600+ global brand activations to building the systems that power large-scale concerts, IPs, and brand launches, his sharp commercial mind and obsession with detail ensure every moment is delivered on time, on budget, and beyond expectation.",
  },
  {
    name: "Sandhya Sharma",
    role: "Director of CS & Sales",
    image: sandhyaImage,
    bio: "With 11 years of experience building lasting client partnerships across the live experience and brand activation space, Sandhya leads Client Success & Sales at Sonar Conectar with empathy, intent, and unwavering precision. She is the bridge between bold ideas and the brands that bring them to life — translating ambition into trust, and trust into long-term collaboration. From onboarding global brands to nurturing partnerships through 600+ activations, concerts, and IPs, her instinct for people and her sharp commercial mind ensure every client journey with Sonar Conectar feels as crafted as the experiences we create.",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="bg-dark text-foreground py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="font-heading text-gold text-[11px] tracking-[0.4em] uppercase font-bold">
            — Our Team
          </span>
          <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tight mt-4">
            The Minds Behind The Magic
          </h2>
        </div>

        {/* Members */}
        <div className="space-y-16">
          {team.map((m, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center ${
                  reverse ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="md:col-span-5 [direction:ltr]">
                  <div className="border border-gold/60 p-2">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full aspect-[3/4] object-cover object-top"
                    />
                  </div>
                </div>

                {/* Text inside outlined frame */}
                <div className="md:col-span-7 [direction:ltr]">
                  <div className="border border-foreground/30 p-8 md:p-10">
                    <h3 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-wide text-gold">
                      {m.name}
                    </h3>
                    <p className="font-heading text-[11px] tracking-[0.3em] uppercase text-foreground/60 mt-2">
                      {m.role}
                    </p>
                    <div className="w-12 h-px bg-gold my-5" />
                    <p className="font-body text-foreground/80 leading-relaxed text-sm md:text-base">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
