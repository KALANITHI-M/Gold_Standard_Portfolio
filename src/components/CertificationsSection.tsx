import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, Cloud, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Java SE 17 Developer",
    subtitle: "Oracle Certified Professional",
    issuer: "Oracle Corporation",
    icon: BadgeCheck,
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.22)",
    border: "rgba(245,158,11,0.45)",
    chips: ["Java SE 17", "OCP Certified", "Oracle", "Professional"],
    proofUrl: "https://drive.google.com/file/d/1jG3X4EoGmzXZKTRX1iZMThvMC_8S9lkG/view?usp=sharing",
  },
  {
    title: "Oracle Apex Cloud Developer ",
    subtitle: "Oracle Certified Foundations Associate",
    issuer: "Oracle University",
    icon: Cloud,
    accent: "#ef4444",
    glow: "rgba(239,68,68,0.22)",
    border: "rgba(239,68,68,0.45)",
    chips: ["OCI 2025", "Cloud", "Oracle", "Foundations"],
    proofUrl: "https://drive.google.com/file/d/14H7LYRXJc639NdjCMbQ6qilE-oP_hY1v/view?usp=sharing",
  },
];

const CertificationCard = ({
  certification,
  index,
  reduceMotion,
}: {
  certification: (typeof certifications)[0];
  index: number;
  reduceMotion: boolean;
}) => {
  const Icon = certification.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[28px] border bg-background/80 p-6 sm:p-7 shadow-[0_18px_50px_rgba(0,0,0,0.3)]"
      style={{
        borderColor: certification.border,
        background: "linear-gradient(145deg, hsl(218 45% 9%), hsl(218 45% 5%))",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at top left, ${certification.glow}, transparent 58%)` }}
      />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${certification.accent}, transparent)` }} />

      <div className="relative flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border shadow-[0_0_28px_rgba(0,0,0,0.2)]"
            style={{
              background: `linear-gradient(145deg, ${certification.accent}ff, ${certification.accent}cc)`,
              borderColor: certification.accent,
              boxShadow: `0 0 30px ${certification.glow}`,
            }}
          >
            <Icon className="h-8 w-8 text-white drop-shadow-sm" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-subheading text-xs uppercase tracking-[0.32em]" style={{ color: certification.accent }}>
              {certification.subtitle}
            </p>
            <h3 className="mt-2 text-xl font-heading leading-tight text-foreground sm:text-[1.7rem]">
              {certification.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{certification.issuer}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {certification.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border px-3 py-1 text-[11px] font-subheading uppercase tracking-[0.18em]"
              style={{
                color: certification.accent,
                borderColor: `${certification.accent}44`,
                background: `${certification.accent}10`,
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ borderColor: `${certification.accent}40`, background: `${certification.accent}12` }}>
            <span className="text-xs font-subheading font-bold" style={{ color: certification.accent }}>
              PROOF
            </span>
          </div>

          {certification.proofUrl ? (
            <motion.a
              href={certification.proofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-subheading uppercase tracking-[0.26em] transition-colors"
              style={{
                color: certification.accent,
                borderColor: `${certification.accent}55`,
                background: `linear-gradient(135deg, ${certification.accent}18, rgba(255,255,255,0.03))`,
                boxShadow: `0 0 18px ${certification.glow}`,
              }}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Proof
              <ExternalLink className="h-3.5 w-3.5" />
            </motion.a>
          ) : (
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-subheading uppercase tracking-[0.26em]"
              style={{
                color: certification.accent,
                borderColor: `${certification.accent}35`,
                background: `${certification.accent}10`,
              }}
              title="Add a proof link later"
            >
              View Proof
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const CertificationsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-navy-dark/30 to-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="section-container" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mx-auto mb-16 max-w-3xl"
        >
         

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl md:text-5xl font-heading text-gradient-gold"
          >
            Certifications
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-6 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-primary via-amber-300 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed"
          >
            A curated snapshot of my certifications with direct proof links for verification.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={certification.title}
              certification={certification}
              index={index}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;