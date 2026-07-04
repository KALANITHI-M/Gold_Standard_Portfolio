import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import {
  Code,
  Server,
  Brain,
  Cpu,
  Box,
  Video,
  Layout,
  Database,
  Zap,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    color: "#06b6d4",
    gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    skills: ["React", "TypeScript", "HTML/CSS", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "#22c55e",
    gradient: "linear-gradient(135deg,#22c55e,#10b981)",
    skills: ["Node.js", "Python", "FastAPI", "Express", "PostgreSQL"],
  },
  {
    title: "AI & ML",
    icon: Brain,
    color: "#a855f7",
    gradient: "linear-gradient(135deg,#a855f7,#ec4899)",
    skills: ["NLP", "Classification", "Dataset Building", "TensorFlow", "Scikit-learn"],
  },
  {
    title: "IoT",
    icon: Cpu,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
    skills: ["ESP32", "Sensors", "GPIO", "Voice Output", "Arduino"],
  },
  {
    title: "3D & Animation",
    icon: Box,
    color: "#ef4444",
    gradient: "linear-gradient(135deg,#ef4444,#f97316)",
    skills: ["Blender", "GLB Models", "Keyframe Animation", "Rigging", "Texturing"],
  },
  {
    title: "Video Editing",
    icon: Video,
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
    skills: ["CapCut", "After Effects", "Canva", "Motion Graphics", "Color Grading"],
  },
];

// Animated skill tag with stagger
const SkillTag = ({
  skill,
  index,
  color,
  isCardHovered,
}: {
  skill: string;
  index: number;
  color: string;
  isCardHovered: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      whileHover={{ x: 4, scale: 1.04 }}
      className="flex items-center gap-3 group/tag cursor-default"
    >
      <motion.div
        className="shrink-0 rounded-full"
        style={{ background: color, width: 7, height: 7 }}
        animate={
          isCardHovered
            ? { scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }
            : { scale: 1, opacity: 0.7 }
        }
        transition={{ duration: 1, repeat: isCardHovered ? Infinity : 0, delay: index * 0.1 }}
      />
      <span className="text-sm font-subheading" style={{ color: "hsl(45 30% 65%)" }}>
        {skill}
      </span>
      <motion.div
        className="h-px flex-1 opacity-0 group-hover/tag:opacity-100"
        style={{ background: `linear-gradient(90deg,${color}50,transparent)` }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

// Single skill card
const SkillCard = ({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) => {
  const Icon = category.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const isCardInView = useInView(cardRef, { margin: "-5% 0px -5% 0px", once: false });
  // On mobile: auto-glow when card scrolls into view
  const isActive = hovered || (isMobile && isCardInView);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-6, 6]);
  const sx = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const sy = useSpring(rotateY, { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  // Stagger direction alternates
  const enterFrom = index % 2 === 0 ? { opacity: 0, x: -40 } : { opacity: 0, x: 40 };

  return (
    <motion.div
      initial={{ ...enterFrom, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 100, damping: 14 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: isMobile ? 0 : sx,
          rotateY: isMobile ? 0 : sy,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
      >
        {/* Glow halo */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: category.color + "18",
            boxShadow: `0 0 40px ${category.color}35`,
            transform: "scale(1.04)",
            filter: "blur(10px)",
          }}
        />

        <div
          className="relative rounded-2xl p-6 h-full overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(218 45% 9%), hsl(218 45% 5%))",
            border: `1px solid ${isActive ? category.color + "50" : "hsl(45 93% 47% / 0.1)"}`,
            transition: "border-color 0.35s ease",
          }}
        >
          {/* Animated gradient top bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5 origin-left"
            style={{ background: category.gradient }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
          />

          {/* Spotlight shimmer */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.03) 50%,transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            animate={hovered ? { backgroundPosition: ["200% 0", "-200% 0"] } : {}}
            transition={{ duration: 0.7 }}
          />

          {/* Header row */}
          <div className="flex items-center gap-4 mb-6">
            {/* Icon with zoom-in + orbit ring */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ border: `1px solid ${category.color}40` }}
                animate={
                  hovered
                    ? { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }
                    : { scale: 1, opacity: 0 }
                }
                transition={{ duration: 1.2, repeat: hovered ? Infinity : 0 }}
              />
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${category.color}18`, border: `1px solid ${category.color}30` }}
                animate={hovered ? { scale: 1.1, rotate: [0, 8, -8, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="w-6 h-6" style={{ color: category.color }} />
              </motion.div>
            </div>

            <motion.h3
              className="text-xl font-heading"
              style={{ color: category.color }}
              animate={hovered ? { letterSpacing: "0.04em" } : { letterSpacing: "0em" }}
              transition={{ duration: 0.3 }}
            >
              {category.title}
            </motion.h3>

            {/* Floating dot indicator */}
            <motion.div
              className="ml-auto w-2 h-2 rounded-full"
              style={{ background: category.color }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            />
          </div>

          {/* Skills list */}
          <div className="space-y-3">
            {category.skills.map((skill, si) => (
              <SkillTag
                key={skill}
                skill={skill}
                index={si}
                color={category.color}
                isCardHovered={hovered}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background ambient */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle,hsl(45 93% 47% / 0.04),transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs uppercase tracking-[0.35em] text-primary/70 font-subheading"
          >
            Toolkit
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-5xl font-heading text-gradient-gold mb-5"
          >
            Skills & Expertise
          </motion.h2>

          {/* Animated bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            className="h-1 w-28 mx-auto rounded-full origin-center"
            style={{ background: "linear-gradient(90deg,#f59e0b,#f97316,#ef4444,#a855f7,#06b6d4)" }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
