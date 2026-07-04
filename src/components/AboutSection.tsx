import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code2, Brain, Cpu, Clapperboard, Award, Sparkles, Zap, Globe } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

const roles = [
  {
    icon: Code2,
    title: "Full-Stack",
    desc: "React · Node.js · Python",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.35)",
    gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    delay: 0,
  },
  {
    icon: Brain,
    title: "AI & ML",
    desc: "NLP · Classification · Datasets",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.35)",
    gradient: "linear-gradient(135deg,#a855f7,#ec4899)",
    delay: 0.08,
  },
  {
    icon: Cpu,
    title: "IoT",
    desc: "ESP32 · Sensors · GPIO",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.35)",
    gradient: "linear-gradient(135deg,#22c55e,#16a34a)",
    delay: 0.16,
  },
  {
    icon: Clapperboard,
    title: "3D & Video",
    desc: "Blender · After Effects",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    gradient: "linear-gradient(135deg,#f59e0b,#ef4444)",
    delay: 0.24,
  },
];

// Floating orb
const FloatingOrb = ({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(40px)" }}
    animate={{ y: [0, -20, 0], opacity: [0.15, 0.35, 0.15], scale: [1, 1.15, 1] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

// 3D Tilt Card for roles
const RoleCard = ({ role, index }: { role: typeof roles[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springConfig = { stiffness: 200, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const isCardInView = useInView(cardRef, { margin: "-5% 0px -5% 0px", once: false });
  // On mobile: auto-glow when card scrolls into view
  const isActive = hovered || (isMobile && isCardInView);
  const Icon = role.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 + role.delay, type: "spring", stiffness: 120, damping: 14 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: isMobile ? 0 : springRotateX,
          rotateY: isMobile ? 0 : springRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer"
      >
        {/* Glow backdrop */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: role.glow, filter: "blur(20px)", transform: "scale(1.1)" }}
        />

        {/* Card body */}
        <div
          className="relative rounded-2xl p-6 text-center overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(218 45% 9%), hsl(218 45% 5%))",
            border: `1px solid ${isActive ? role.color + "60" : "hsl(45 93% 47% / 0.1)"}`,
            transition: "border-color 0.3s ease",
            boxShadow: isActive ? `0 20px 60px ${role.glow}` : "0 12px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: role.gradient }} />

          {/* Orbiting ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ border: `1px solid ${role.color}20` }}
            animate={isActive ? { scale: [1, 1.04, 1], opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Icon container with pulse */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: role.color + "20" }}
              animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] } : { scale: 1, opacity: 0.4 }}
              transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
            />
            <motion.div
              className="relative w-full h-full rounded-2xl flex items-center justify-center"
              style={{ background: `${role.color}15`, border: `1px solid ${role.color}30` }}
              animate={isActive ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-7 h-7" style={{ color: role.color }} />
            </motion.div>
          </div>

          <motion.h3
            className="text-xl font-heading mb-1"
            style={{ color: role.color }}
            animate={isActive ? { scale: 1.05 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {role.title}
          </motion.h3>
          <p className="text-xs text-muted-foreground font-subheading tracking-wide">{role.desc}</p>

          {/* Shimmer sweep on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            animate={isActive ? { backgroundPosition: ["200% 0", "-200% 0"] } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Animated counter number
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: 10, suffix: "+", label: "Projects Built" },
    { value: 3, suffix: " Prizes", label: "Competitions Won" },
    { value: 4, suffix: " Domains", label: "Expertise Areas" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Floating ambient orbs */}
      <FloatingOrb x="5%" y="10%" size={300} color="rgba(245,158,11,0.08)" delay={0} />
      <FloatingOrb x="75%" y="60%" size={250} color="rgba(6,182,212,0.06)" delay={2} />
      <FloatingOrb x="45%" y="80%" size={200} color="rgba(168,85,247,0.05)" delay={4} />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="section-container" ref={ref}>

        {/* Section Header with letter stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs uppercase tracking-[0.35em] text-primary/70 font-subheading"
          >
            Profile
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-5xl font-heading text-gradient-gold mb-6"
          >
            About Me
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-0.5 w-32 mx-auto mb-6 rounded-full origin-center"
            style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-base text-muted-foreground font-body leading-relaxed"
          >
            A developer who blends product thinking, technical execution, and visual creativity across software, AI, and interactive media.
          </motion.p>
        </motion.div>

        {/* Bio card with slide-in + glowing border */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 80 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative rounded-2xl p-8 md:p-10 overflow-hidden group"
            style={{
              background: "linear-gradient(145deg, hsl(218 45% 9%), hsl(218 45% 5%))",
              border: "1px solid hsl(45 93% 47% / 0.15)",
            }}
          >
            {/* Animated top border */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg,#f59e0b,#f97316,#f59e0b)", backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 0", "200% 0", "0% 0"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Corner sparkle accents */}
            <motion.div
              className="absolute top-3 right-3"
              animate={{ rotate: 360, opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary/40" />
            </motion.div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-body">
              I'm a passionate{" "}
              <motion.span
                className="text-primary font-semibold"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Full-Stack Developer
              </motion.span>{" "}
              with expertise spanning AI, Machine Learning, IoT systems, and creative 3D animation.
              I specialize in building intelligent applications that bridge cutting-edge technology
              with beautiful, intuitive interfaces. From developing NLP-powered solutions and
              ESP32-based IoT devices to crafting stunning Blender animations, I bring a unique
              blend of technical depth and creative vision to every project.
            </p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-4 border-t border-primary/10 pt-6"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-heading text-primary font-bold">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground font-subheading mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Role Cards - 3D tilt */}
        <div className="mb-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center text-xs uppercase tracking-[0.3em] text-primary/50 font-subheading mb-6"
          >
            What I Do
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roles.map((role, i) => (
              <RoleCard key={role.title} role={role} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
