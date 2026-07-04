import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { ArrowUpRight, Trophy, Award, Medal, Star } from "lucide-react";

const organizerName = "KEC Organizor";

const achievements = [
  {
    title: "1st Prize — Hackathon",
    description:
      "Won first place at Hackatroxix for an innovative HEALTH-O-METER solution that combined IoT sensors with AI-powered health analytics.",
    icon: Award,
    year: "2024–25",
    place: "1st",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
    glowColor: "rgba(245,158,11,0.35)",
    rank: "GOLD",
    organizer: organizerName,
    certificateUrl: "",
  },
  {
    title: "2nd Prize — Vision Reel",
    description:
      "Recognized for outstanding visual storytelling and creative direction in the Vision Reel video competition.",
    icon: Trophy,
    year: "2024",
    place: "2nd",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    glowColor: "rgba(6,182,212,0.3)",
    rank: "SILVER",
    organizer: organizerName,
    certificateUrl: "",
  },
  {
    title: "3rd Prize — Aventrix Web Dev",
    description:
      "Awarded for an innovative web development solution at the Aventrix technical competition.",
    icon: Medal,
    year: "2024",
    place: "3rd",
    color: "#ef4444",
    gradient: "linear-gradient(135deg,#ef4444,#f43f5e)",
    glowColor: "rgba(239,68,68,0.3)",
    rank: "BRONZE",
    organizer: organizerName,
    certificateUrl: "jh",
  },
  {
    title: "Best Reels Creator",
    description:
      "Recognized for exceptional short-form video content creation and social media engagement.",
    icon: Star,
    year: "2023",
    place: "🏅",
    color: "#a855f7",
    gradient: "linear-gradient(135deg,#a855f7,#ec4899)",
    glowColor: "rgba(168,85,247,0.3)",
    rank: "SPECIAL",
    organizer: organizerName,
    certificateUrl: "https://drive.google.com/file/d/1-mIJhL2x5H3OE-8boZhUO9_GNmRuqGGo/view?usp=sharing",
  },
];

// Trophy pop: bouncy zoom reveal + floating icon
const AchievementCard = ({
  achievement,
  index,
  reduceMotion,
}: {
  achievement: (typeof achievements)[0];
  index: number;
  reduceMotion: boolean;
}) => {
  const Icon = achievement.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const isCardInView = useInView(cardRef, { margin: "-5% 0px -5% 0px", once: false });
  // On mobile: auto-glow when card scrolls into view
  const isActive = hovered || (isMobile && isCardInView);
  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Alternating entrance: odd from left, even from right
  const xInit = index % 2 === 0 ? -60 : 60;

  return (
    <motion.div
      initial={{ opacity: 0, x: xInit, scale: 0.85 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        type: "spring",
        stiffness: 90,
        damping: 14,
      }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full cursor-pointer"
      >
        {/* Glow aura */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={reduceMotion ? undefined : { opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: achievement.glowColor,
            filter: "blur(22px)",
            transform: "scale(1.1)",
          }}
        />

        {/* Card */}
        <div
          className="relative rounded-2xl p-6 sm:p-8 h-full overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(218 45% 9%), hsl(218 45% 5%))",
            border: `1px solid ${isActive ? achievement.color + "55" : "hsl(45 93% 47% / 0.1)"}`,
            transition: "border-color 0.35s ease",
            boxShadow: isActive
              ? `0 24px 60px ${achievement.glowColor}, inset 0 1px 0 ${achievement.color}20`
              : "0 12px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* Animated gradient top bar */}
          <motion.div
            className="absolute top-0 left-0 h-0.5 origin-left"
            style={{ right: 0, background: achievement.gradient }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.12 + 0.25, ease: "easeOut" }}
          />

          {/* Shimmer on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(110deg,transparent 35%,rgba(255,255,255,0.04) 50%,transparent 65%)",
              backgroundSize: "200% 100%",
            }}
            animate={reduceMotion ? undefined : (isActive ? { backgroundPosition: ["200% 0", "-200% 0"] } : {})}
            transition={{ duration: 0.7 }}
          />

          {/* Rank badge (top-right corner) */}
          <motion.div
            className="absolute top-4 right-4"
            animate={isActive ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-subheading font-bold tracking-widest"
              style={{
                background: `${achievement.color}18`,
                border: `1px solid ${achievement.color}40`,
                color: achievement.color,
              }}
            >
              {achievement.rank}
            </span>
          </motion.div>

          {/* Icon + Title row */}
          <div className="flex items-start gap-4 mb-5 pr-16">
            {/* Animated icon wrapper */}
            <div className="relative shrink-0">
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1px solid ${achievement.color}50` }}
                animate={reduceMotion ? undefined : (isActive ? { scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] } : { scale: 1, opacity: 0 })}
                transition={{ duration: 1.4, repeat: isActive && !reduceMotion ? Infinity : 0 }}
              />
              {/* Second ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1px solid ${achievement.color}30` }}
                animate={reduceMotion ? undefined : (isActive ? { scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] } : { scale: 1, opacity: 0 })}
                transition={{ duration: 1.4, repeat: isActive && !reduceMotion ? Infinity : 0, delay: 0.3 }}
              />

              <motion.div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${achievement.color}18`, border: `1px solid ${achievement.color}30` }}
                animate={reduceMotion ? undefined : (isActive ? { rotate: [0, -8, 8, -4, 4, 0], scale: 1.12 } : { rotate: 0, scale: 1 })}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-6 h-6" style={{ color: achievement.color }} />
              </motion.div>
            </div>

            <div className="min-w-0">
              <motion.h3
                className="text-lg md:text-xl font-heading leading-tight"
                style={{ color: achievement.color }}
                animate={reduceMotion ? undefined : (isActive ? { x: 4 } : { x: 0 })}
                transition={{ duration: 0.3 }}
              >
                {achievement.title}
              </motion.h3>
              <span
                className="text-[11px] font-subheading tracking-widest uppercase mt-1 block"
                style={{ color: achievement.color + "80" }}
              >
                Recognition {index + 1}
              </span>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px mb-4"
            style={{ background: `linear-gradient(90deg,${achievement.color}30,transparent)` }}
            animate={reduceMotion ? undefined : (isActive ? { opacity: 1 } : { opacity: 0.5 })}
            transition={{ duration: 0.3 }}
          />

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
            {achievement.description}
          </p>

          {/* Year badge bottom */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <motion.div
              className="flex flex-col items-start gap-1"
              animate={reduceMotion ? undefined : (isActive ? { opacity: 1, x: 0 } : { opacity: 0.5, x: -4 })}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: achievement.color + "20", border: `1px solid ${achievement.color}30` }}
                  animate={reduceMotion ? undefined : { rotate: isActive ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-[8px]" style={{ color: achievement.color }}>★</span>
                </motion.div>
                <span
                  className="text-xs font-subheading font-semibold tracking-wider"
                  style={{ color: achievement.color }}
                >
                  {achievement.year}
                </span>
              </div>
              <motion.span
                className="inline-flex items-center rounded-full border px-3 py-1 text-[9px] uppercase tracking-[0.28em] font-subheading"
                style={{
                  color: achievement.color,
                  borderColor: `${achievement.color}55`,
                  background: `linear-gradient(135deg, ${achievement.color}22, rgba(255,255,255,0.03))`,
                  textShadow: `0 0 12px ${achievement.color}66`,
                  boxShadow: `0 0 18px ${achievement.color}1f, inset 0 0 12px ${achievement.color}12`,
                }}
                animate={reduceMotion ? undefined : (isActive ? { scale: 1.04, boxShadow: `0 0 24px ${achievement.color}2f, inset 0 0 14px ${achievement.color}18` } : { scale: 1 })}
                transition={{ duration: 0.35 }}
              >
                {achievement.organizer}
              </motion.span>
            </motion.div>

            {achievement.certificateUrl ? (
              <div className="flex flex-col items-end gap-1">
                <motion.a
                  href={achievement.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent px-4 py-2 text-[10px] uppercase tracking-[0.25em] font-subheading text-primary transition-colors duration-300 shadow-[0_0_24px_rgba(245,158,11,0.12)] hover:border-primary/60 hover:bg-primary/20 hover:text-primary"
                  whileHover={{ y: -1, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Proof</span>
                  <ArrowUpRight className="h-3 w-3" />
                </motion.a>
              </div>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-background/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] font-subheading text-muted-foreground/60"
                title="Add a proof link to enable this button"
              >
                View Proof
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="achievements"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-navy-dark/40 to-background"
    >
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: "20%",
          left: "-10%",
          background: "radial-gradient(circle,rgba(245,158,11,0.07),transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          top: "40%",
          right: "-8%",
          background: "radial-gradient(circle,rgba(168,85,247,0.06),transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs uppercase tracking-[0.35em] text-primary/70 font-subheading"
          >
            Recognition
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-5xl font-heading text-gradient-gold mb-5"
          >
            Achievements
          </motion.h2>

          {/* Trophy emoji bounce */}
          <motion.div
            className="text-3xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <span>🏆</span>
          </motion.div>

          {/* Rainbow underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="h-0.5 w-28 mx-auto rounded-full origin-center mb-6"
            style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444,#a855f7,#06b6d4)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm md:text-base text-muted-foreground font-body leading-relaxed"
          >
            A concise look at the awards and recognitions that reflect both technical work and creative output.
          </motion.p>
        </motion.div>

        {/* Achievement cards */}
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={achievement.title} achievement={achievement} index={index} reduceMotion={!!reduceMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
