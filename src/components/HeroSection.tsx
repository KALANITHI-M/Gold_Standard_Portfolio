import { motion } from "framer-motion";
import { ArrowDown, Briefcase, Eye } from "lucide-react";
import { useEffect, useState } from "react";

// ─── Lightweight typewriter sequence ─────────────────────────────────────────
function useTypewriterSequence(words: string[], speed = 55, pause = 900) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "done">("typing");

  useEffect(() => {
    if (phase === "done") return;

    const current = words[wordIndex] ?? "";

    if (phase === "typing") {
      if (text.length < current.length) {
        const timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      }

      const timeout = setTimeout(() => {
        if (wordIndex >= words.length - 1) {
          setPhase("done");
        } else {
          setPhase("pausing");
        }
      }, pause);
      return () => clearTimeout(timeout);
    }

    if (phase === "pausing") {
      const timeout = setTimeout(() => {
        setWordIndex((value) => value + 1);
        setText("");
        setPhase("typing");
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [text, wordIndex, words, speed, pause, phase]);

  return text;
}

// ─── Stat card with spring pop ────────────────────────────────────────────────
const StatCard = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 120, damping: 12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-xl border border-primary/10 bg-white/5 px-4 py-4 text-center relative overflow-hidden cursor-default"
      style={{
        boxShadow: hovered
          ? "0 0 30px hsl(45 93% 47% / 0.25), 0 8px 20px rgba(0,0,0,0.3)"
          : "0 4px 16px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Animated top bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 origin-left"
        style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)" }}
        animate={{ scaleX: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.35 }}
      />
      {/* Inner glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%,hsl(45 93% 47% / 0.08),transparent 70%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.p
        className="text-xl md:text-2xl font-heading text-primary relative z-10"
        animate={hovered ? { scale: 1.08 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {value}
      </motion.p>
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground font-subheading mt-1 relative z-10">
        {label}
      </p>
    </motion.div>
  );
};

// ─── 3D mouse-tracked profile ring ───────────────────────────────────────────
const ProfileRing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 90, damping: 14 }}
      className="order-1 lg:order-2 relative mx-auto lg:mx-0 w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[330px]"
      style={{ perspective: 800 }}
    >
      <div className="relative mx-auto aspect-square w-full rounded-full p-1.5 sm:p-3">
        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-gold/10 blur-2xl" />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px dashed hsl(45 93% 47% / 0.25)", transform: "scale(1.12)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 rounded-full border border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-gold/10" />
        <div className="absolute inset-[5px] sm:inset-[6px] rounded-full border border-white/10 bg-navy-deep/75 shadow-[0_18px_50px_rgba(0,0,0,0.32)]" />

        <div className="absolute inset-3 sm:inset-4 overflow-hidden rounded-full border border-primary/15 bg-navy-deep/80">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-navy-deep/40" />
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
        </div>

        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-primary/15 bg-background/75 px-2.5 py-1 backdrop-blur-md whitespace-nowrap"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-primary/70 font-subheading">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            available for opportunities
          </div>
        </motion.div>

        <motion.div
          className="absolute right-1 bottom-6 hidden sm:flex h-9 w-9 rounded-full bg-primary/10 border border-primary/15 items-center justify-center text-primary shadow-[0_0_20px_rgba(212,175,55,0.18)]"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const roleLine = useTypewriterSequence([
    "Full-Stack Developer",
    "AI & ML Engineer",
    "IoT Innovator",
    "3D & Video Creator",
  ]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Stagger container
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };
  const itemUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-navy-dark" />
      <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      {/* Static ambient marks only */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute left-[8%] top-[14%] h-2 w-2 rounded-full bg-primary/30" />
        <div className="absolute left-[18%] top-[72%] h-1.5 w-1.5 rounded-full bg-gold/25" />
        <div className="absolute left-[68%] top-[18%] h-2 w-2 rounded-full bg-primary/20" />
        <div className="absolute left-[86%] top-[76%] h-2 w-2 rounded-full bg-gold/20" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 section-container w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Left column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 lg:order-1 text-center lg:text-left max-w-3xl"
          >


            {/* Name — letter stagger */}
            <motion.div variants={itemUp}>
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gradient-gold mb-2 leading-[0.95]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 80 }}
              >
                KALANITHI M
              </motion.h1>
            </motion.div>

            {/* Typewriter role line */}
            <motion.div variants={itemUp} className="mb-6 h-8">
              <span className="text-lg md:text-xl font-subheading text-primary tracking-wide">
                {roleLine}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block ml-0.5 w-0.5 h-5 bg-primary align-middle"
                />
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemUp}
              className="text-base md:text-lg font-subheading text-muted-foreground mb-8 tracking-wide max-w-2xl"
            >
              Shaping AI, IoT, and creative digital experiences with a sharp product mindset.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "#projects")}
                className="inline-flex items-center gap-2 rounded-lg text-white px-6 py-3 font-semibold z-50"
                style={{
                  background: "linear-gradient(90deg,#f59e0b,#f97316)",
                  boxShadow: "0 14px 40px rgba(245,158,11,0.28)",
                }}
                whileHover={{
                  y: -3,
                  scale: 1.04,
                  boxShadow: "0 20px 50px rgba(245,158,11,0.42)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Eye size={20} />
                View Work
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-primary font-semibold"
                style={{ background: "transparent" }}
                whileHover={{
                  y: -3,
                  scale: 1.04,
                  boxShadow: "0 18px 38px rgba(245,158,11,0.18)",
                  backgroundColor: "hsl(45 93% 47% / 0.08)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Briefcase size={20} />
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">
              <StatCard value="7+" label="projects" delay={0.55} />
              <StatCard value="AI + IoT" label="focus" delay={0.65} />
              <StatCard value="3D + UI" label="creative edge" delay={0.75} />
            </div>
          </motion.div>

          {/* Right column — profile */}
          <ProfileRing />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
