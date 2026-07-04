import { motion, useInView, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Layers, Flame } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

const projects = [
  {
    title: "Random Meal Generator",
    description: "AI-powered meal suggestion app featuring recipe recommendations based on available ingredients with intuitive interface.",
    tools: ["React", "API Integration", "Tailwind CSS"],
    accentColor: "#f59e0b",
    accentGlow: "rgba(245,158,11,0.3)",
    gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
    githubLink: "https://github.com/KALANITHI-M/Recipe_Finder.git",
    liveLink: "",
  },
  {
    title: "Contact Manager",
    description: "A web-based application to store, manage, search, and update contacts with secure data handling and user-friendly interface.",
    tools: ["React", "Tailwind CSS", "Twilio", "Node.js", "MongoDB"],
    accentColor: "#22c55e",
    accentGlow: "rgba(34,197,94,0.28)",
    gradient: "linear-gradient(135deg,#22c55e,#10b981)",
    githubLink: "https://github.com/KALANITHI-M/Contact_Manager.git",
    liveLink: "",
  },
  {
    title: "Auto Pill Dispenser",
    description: "ESP32-powered IoT device with scheduled dispensing, voice notifications, and mobile app integration.",
    tools: ["ESP32", "IoT", "Python", "Voice Output"],
    accentColor: "#06b6d4",
    accentGlow: "rgba(6,182,212,0.28)",
    gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    githubLink: "",
    liveLink: "",
  },
  {
    title: "CC & Seminar Hall Booking System",
    description: "A web-based booking platform that allows students to request computer center and seminar hall reservations, faculty to approve requests, and admins to manage hall assignments efficiently.",
    tools: ["Flask", "React", "SQLite", "Python", "REST API", "Tailwind CSS"],
    accentColor: "#8b5cf6",
    accentGlow: "rgba(139,92,246,0.28)",
    gradient: "linear-gradient(135deg,#8b5cf6,#6366f1)",
    githubLink: "",
    liveLink: "",
  },
  {
    title: "Resume Parser",
    description: "NLP/ML-powered resume parsing tool with skill extraction, experience classification, and scoring system.",
    tools: ["Python", "NLP", "Machine Learning", "FastAPI"],
    accentColor: "#ef4444",
    accentGlow: "rgba(239,68,68,0.28)",
    gradient: "linear-gradient(135deg,#ef4444,#f43f5e)",
    githubLink: "",
    liveLink: "",
  },
  {
    title: "Health-O-Meter",
    description: "A smart health assistant that analyzes meals using a food dataset and Gemini API to provide AI-based health insights, calorie estimation, and personalized food suggestions.",
    tools: ["Gemini API", "Food Dataset", "JavaScript", "Web App", "API Integration"],
    accentColor: "#ec4899",
    accentGlow: "rgba(236,72,153,0.28)",
    gradient: "linear-gradient(135deg,#ec4899,#f43f5e)",
    githubLink: "https://github.com/KALANITHI-M/Health-o-meter.git",
    liveLink: "https://haris-p-m.github.io/Health-o-Meter/#/auth",
  },
  {
    title: "House Price Prediction System",
    description: "A machine learning based web application that predicts house prices using user-provided inputs such as location, income, and house features with graphical visualization of price trends.",
    tools: ["FastAPI", "Gradio", "Scikit-learn", "Plotly", "Python", "REST API"],
    accentColor: "#22c55e",
    accentGlow: "rgba(34,197,94,0.28)",
    gradient: "linear-gradient(135deg,#22c55e,#16a34a)",
    githubLink: "https://github.com/KALANITHI-M/house-price-api.git",
    liveLink: "https://house-price-predictor-yod3.onrender.com",
  },
  {
    title: "Product Manufacturing Management System",
    description: "A full-stack database-driven web application to manage the complete manufacturing workflow — customers, suppliers, products, parts, sales orders, and purchase orders.",
    tools: ["Oracle SQL", "Node.js", "Express.js", "HTML", "CSS", "JavaScript", "Bootstrap"],
    accentColor: "#3b82f6",
    accentGlow: "rgba(59,130,246,0.28)",
    gradient: "linear-gradient(135deg,#3b82f6,#6366f1)",
    githubLink: "https://github.com/KALANITHI-M/Product-Management-System.git",
    liveLink: "",
  },
  {
  title: "Mathematics Club Event Registration Portal",
  description: "A responsive event registration platform developed for the Mathematics Club, enabling students to explore upcoming events, register online, and access event details through a clean, intuitive, and user-friendly interface.",
  tools: ["HTML", "CSS", "JavaScript", "Zoho Catalyst", "Responsive Design", "Event Registration"],
  accentColor: "#22c55e",
  accentGlow: "rgba(34,197,94,0.28)",
  gradient: "linear-gradient(135deg,#22c55e,#16a34a)",
  githubLink: "", // Add your GitHub repository if available
  liveLink: "https://mathsclub-60038694178.development.catalystserverless.in/app/index.html",
},
{
  title: "GUVI DevOps Learning Platform",
  description: "A responsive web-based learning platform developed for GUVI to provide an interactive DevOps learning experience. The application showcases DevOps concepts, learning modules, technology roadmaps, and hands-on resources through a modern, user-friendly interface optimized for desktop and mobile devices.",
  tools: ["React", "JavaScript", "Tailwind CSS", "Responsive Design", "UI/UX", "Netlify"],
  accentColor: "#3b82f6",
  accentGlow: "rgba(59,130,246,0.28)",
  gradient: "linear-gradient(135deg,#3b82f6,#2563eb)",
  githubLink: "https://github.com/KALANITHI-M/Guvi_Devops",
  liveLink: "https://6989a90d797eb125bde79917--guvi-kec.netlify.app/",
}
];

const getProjectType = (tools: string[]): string => {
  const t = tools.join(" ").toUpperCase();
  if (t.includes("NLP") || t.includes("MACHINE LEARNING") || t.includes("SCIKIT") || t.includes("GEMINI")) return "AI/ML";
  if (t.includes("ESP32") || t.includes("IOT")) return "IoT";
  if ((t.includes("REACT") || t.includes("JAVASCRIPT")) && (t.includes("NODE") || t.includes("FLASK") || t.includes("EXPRESS"))) return "Full-Stack";
  if (t.includes("REACT") || t.includes("JAVASCRIPT")) return "Web";
  return "Full-Stack";
};

const sortedProjects = [...projects].sort((left, right) => {
  const leftLive = Boolean(left.liveLink);
  const rightLive = Boolean(right.liveLink);
  if (leftLive === rightLive) return 0;
  return leftLive ? -1 : 1;
});

const getProjectTier = (project: (typeof projects)[0], index: number) => {
  if (project.liveLink && index === 0) {
    return {
      label: "Featured",
      border: "#d4af37",
      glow: "rgba(212,175,55,0.18)",
      tint: "rgba(212,175,55,0.08)",
      badgeClass: "border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f7e6a8]",
      buttonStyle: "linear-gradient(90deg,#d4af37,#f1c84c)",
      buttonGlow: "rgba(212,175,55,0.30)",
    };
  }

  if (project.liveLink) {
    return {
      label: "Live",
      border: "#22c55e",
      glow: "rgba(34,197,94,0.16)",
      tint: "rgba(34,197,94,0.08)",
      badgeClass: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
      buttonStyle: "linear-gradient(90deg,#16a34a,#22c55e)",
      buttonGlow: "rgba(34,197,94,0.28)",
    };
  }

  return {
    label: "Other",
    border: "#64748b",
    glow: "rgba(100,116,139,0.14)",
    tint: "rgba(100,116,139,0.06)",
    badgeClass: "border-slate-400/30 bg-slate-400/10 text-slate-300",
    buttonStyle: "linear-gradient(90deg,#475569,#64748b)",
    buttonGlow: "rgba(100,116,139,0.24)",
  };
};

// ─── 3D Tilt Project Card ─────────────────────────────────────────────────────
const ProjectCard = ({ project, index, reduceMotion }: { project: typeof projects[0]; index: number; reduceMotion: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const isCardInView = useInView(cardRef, { margin: "-5% 0px -5% 0px", once: false });
  // On mobile: auto-glow when card scrolls into view
  const isActive = hovered || (isMobile && isCardInView);
  const tier = getProjectTier(project, index);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-6, 6]);
  const sX = useSpring(rotX, { stiffness: 150, damping: 18 });
  const sY = useSpring(rotY, { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const type = getProjectType(project.tools);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100, damping: 14 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: isMobile ? 0 : sX,
          rotateY: isMobile ? 0 : sY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
        className="relative h-full"
      >
        {/* Glow aura */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: tier.glow,
            filter: "blur(25px)",
            transform: "scale(1.08)",
          }}
        />

        {/* Card body */}
        <div
          className="relative h-full flex flex-col overflow-hidden rounded-xl"
          style={{
            background: "linear-gradient(145deg, hsl(218 45% 9%), hsl(218 45% 5%))",
            border: `1px solid ${isActive ? tier.border : `${tier.border}55`}`,
            boxShadow: hovered
              ? `0 0 50px ${tier.glow}, 0 20px 50px rgba(0,0,0,0.4)`
              : `0 0 30px ${tier.glow}, 0 12px 40px rgba(0,0,0,0.3)`,
            transition: "border-color 0.35s ease, box-shadow 0.35s ease",
          }}
        >
          {/* Animated gradient top bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5 origin-left rounded-t-xl"
            style={{ background: tier.label === "Featured" ? "linear-gradient(90deg,#d4af37,#f1c84c)" : tier.label === "Live" ? "linear-gradient(90deg,#16a34a,#22c55e)" : "linear-gradient(90deg,#64748b,#7c8aa0)", backgroundSize: "200% 100%" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }}
            animate={reduceMotion ? undefined : (isActive ? { backgroundPosition: ["0% 0", "200% 0", "0% 0"] } : {})}
          />

          {/* Shimmer on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ background: "linear-gradient(110deg,transparent 35%,rgba(255,255,255,0.035) 50%,transparent 65%)", backgroundSize: "200% 100%" }}
            animate={reduceMotion ? undefined : (isActive ? { backgroundPosition: ["200% 0", "-200% 0"] } : {})}
            transition={{ duration: 0.7 }}
          />

          {/* Subtle bg tint */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-20"
            style={{ background: `radial-gradient(circle at top left,${tier.tint},transparent 60%)` }}
          />

          <div className="p-6 flex-1 flex flex-col relative z-10">
            {/* Title + badge row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <motion.h3
                className="text-xl md:text-2xl font-heading text-gradient-gold leading-tight flex-1"
                animate={isActive ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {project.title}
              </motion.h3>
              <motion.span
                className="shrink-0 px-2.5 py-1 rounded-md text-[10px] font-subheading font-bold whitespace-nowrap text-white shadow-lg"
                style={{ background: tier.label === "Featured" ? "linear-gradient(90deg,#d4af37,#f1c84c)" : tier.label === "Live" ? "linear-gradient(90deg,#16a34a,#22c55e)" : "linear-gradient(90deg,#64748b,#7c8aa0)" }}
                animate={isActive ? { scale: 1.08 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {type}
              </motion.span>

              {project.liveLink ? (
                <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-subheading font-bold uppercase tracking-[0.22em] ${tier.badgeClass}`}>
                  <Flame size={10} />
                  {tier.label === "Featured" ? "Top Pick" : "Live Priority"}
                </span>
              ) : null}
            </div>

            <p className="text-sm md:text-base text-muted-foreground mb-5 flex-1 font-body leading-relaxed">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              {project.tools.slice(0, 6).map((tool, ti) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: ti * 0.04 + index * 0.06 }}
                  whileHover={{ scale: 1.08, y: -1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-subheading"
                  style={{
                    background: `${project.accentColor}12`,
                    border: `1px solid ${project.accentColor}30`,
                    color: project.accentColor,
                  }}
                >
                  {tool}
                </motion.div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-wrap mt-auto">
              {project.liveLink ? (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg text-white px-5 py-2.5 text-sm font-subheading font-bold z-50"
                  style={{ background: tier.buttonStyle, boxShadow: `0 8px 30px ${tier.buttonGlow}` }}
                  whileHover={{ y: -2, scale: 1.04, boxShadow: `0 14px 40px ${tier.buttonGlow}` }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </motion.a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary/20 bg-neutral-900/40 text-primary/40 px-5 py-2.5 text-sm font-subheading font-bold cursor-not-allowed"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </button>
              )}

              {project.githubLink ? (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-5 py-2.5 text-sm font-subheading font-bold text-primary bg-transparent"
                  whileHover={{ y: -2, scale: 1.04, backgroundColor: "hsl(45 93% 47% / 0.12)", boxShadow: "0 0 25px hsl(45 93% 47% / 0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                  Code
                </motion.a>
              ) : (
                <span className="rounded-lg border border-border/20 bg-background/10 px-5 py-2.5 text-xs font-subheading text-muted-foreground/50">
                  Private
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const tags = ["Recruiter friendly", "Outcome driven", "Web · AI · IoT · Full-Stack"];

  return (
    <section id="projects" className="pt-32 pb-24 relative overflow-hidden bg-gradient-to-b from-navy-dark/30 to-background">
      {/* Ambient orbs */}
      <motion.div
        className="absolute -top-24 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,hsl(45 93% 47% / 0.08),transparent 70%)", filter: "blur(60px)" }}
        animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,hsl(45 80% 35% / 0.07),transparent 70%)", filter: "blur(60px)" }}
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs uppercase tracking-[0.35em] text-primary/70 font-subheading"
          >
            Selected Work
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-5xl font-heading text-gradient-gold mb-4"
          >
            Featured Projects
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="h-0.5 w-28 mx-auto mb-5 rounded-full origin-center"
            style={{ background: "linear-gradient(90deg,#f59e0b,#f97316,#ef4444)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm md:text-base text-muted-foreground font-body leading-relaxed"
          >
            A recruiter-friendly snapshot of projects that show problem-solving, stack range, and practical delivery.
          </motion.p>
        </div>

        {/* Filter tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.06, boxShadow: "0 0 30px hsl(45 93% 47% / 0.3)" }}
              className="rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary/90 font-subheading font-semibold cursor-default"
              style={{
                borderColor: "hsl(45 93% 47% / 0.4)",
                background: "hsl(45 93% 47% / 0.08)",
                boxShadow: "0 0 15px hsl(45 93% 47% / 0.1)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {sortedProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} reduceMotion={!!reduceMotion} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70 font-subheading">
            All projects shown on one page to keep recruiters moving
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
