import { motion, useInView, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Loader2, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

// ─── Animated contact info row ────────────────────────────────────────────────
const ContactRow = ({
  icon: Icon,
  label,
  value,
  delay,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
  color: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center gap-4 group cursor-default"
    >
      {/* Icon box */}
      <div className="relative shrink-0">
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ border: `1px solid ${color}50` }}
          animate={hovered ? { scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ duration: 1.2, repeat: hovered ? Infinity : 0 }}
        />
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          animate={hovered ? { scale: 1.1, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </motion.div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground font-subheading tracking-wider uppercase mb-0.5">{label}</p>
        <motion.p
          className="font-body text-sm"
          style={{ color }}
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.25 }}
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  );
};

// ─── Animated input field ─────────────────────────────────────────────────────
const AnimatedInput = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  delay,
  isTextarea = false,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  delay: number;
  isTextarea?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      className="relative"
    >
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.2em] mb-2 font-subheading transition-colors duration-200"
        style={{ color: focused ? "hsl(45 93% 47%)" : "hsl(45 30% 55%)" }}
      >
        {label}
      </label>

      <div className="relative">
        {/* Glowing border */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: focused
              ? "0 0 0 1px hsl(45 93% 47% / 0.6), 0 0 20px hsl(45 93% 47% / 0.2)"
              : "0 0 0 1px hsl(45 30% 20% / 0.5)",
          }}
          transition={{ duration: 0.25 }}
          style={{ borderRadius: "0.5rem" }}
        />

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full px-4 py-3 rounded-lg bg-muted text-foreground min-h-[140px] resize-none relative z-10 outline-none transition-colors duration-200 font-body text-sm"
            style={{
              border: "none",
              background: focused ? "hsl(218 45% 10%)" : "hsl(218 45% 8%)",
              transition: "background 0.25s ease",
            }}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full px-4 py-3 rounded-lg bg-muted text-foreground relative z-10 outline-none transition-colors duration-200 font-body text-sm"
            style={{
              border: "none",
              background: focused ? "hsl(218 45% 10%)" : "hsl(218 45% 8%)",
              transition: "background 0.25s ease",
            }}
          />
        )}

        {/* Check mark when has value */}
        {hasValue && !focused && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-3 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "hsl(45 93% 47% / 0.15)" }}
          >
            <span className="text-[10px] text-primary">✓</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const ContactSection = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (key) emailjs.init(key);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      if (!serviceId || !templateId) throw new Error("EmailJS not configured");
      if (formRef.current) await emailjs.sendForm(serviceId, templateId, formRef.current);
      toast({ title: "Message Sent!", description: "Thank you for reaching out. I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactRows = [
    { icon: Mail,   label: "Email",    value: "kalanithi54321@gmail.com", color: "#f59e0b", delay: 0.35 },
    { icon: Phone,  label: "Phone",    value: "+91 81220 79151",          color: "#22c55e", delay: 0.45 },
    { icon: MapPin, label: "Location", value: "Erode, Tamil Nadu, India", color: "#06b6d4", delay: 0.55 },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ pointerEvents: "auto" }}>
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/4 -left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,hsl(45 93% 47% / 0.07),transparent 70%)", filter: "blur(50px)" }}
        animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-16 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(6,182,212,0.06),transparent 70%)", filter: "blur(40px)" }}
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, delay: 2 }}
      />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs uppercase tracking-[0.35em] text-primary/70 font-subheading"
          >
            Contact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-5xl font-heading text-gradient-gold mb-5"
          >
            Get In Touch
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="h-0.5 w-24 mx-auto rounded-full origin-center"
            style={{ background: "linear-gradient(90deg,#f59e0b,#f97316,#f59e0b)" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — info card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, type: "spring", stiffness: 90 }}
          >
            <div
              className="relative rounded-2xl p-8 h-full overflow-hidden"
              style={{
                background: "linear-gradient(145deg,hsl(218 45% 9%),hsl(218 45% 5%))",
                border: "1px solid hsl(45 93% 47% / 0.15)",
              }}
            >
              {/* Animated top bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                style={{ background: "linear-gradient(90deg,#f59e0b,#f97316,#f59e0b)", backgroundSize: "200% 100%" }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1, backgroundPosition: ["0% 0", "200% 0", "0% 0"] } : {}}
                transition={{ scaleX: { duration: 0.7, delay: 0.3 }, backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" } }}
              />

              {/* Sparkle */}
              <motion.div
                className="absolute top-4 right-4"
                animate={reduceMotion ? undefined : { rotate: 360, opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary/30" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl font-heading text-primary mb-3"
              >
                Let's Work Together
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-muted-foreground mb-8 font-body text-sm leading-relaxed"
              >
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>

              {/* Contact rows */}
              <div className="space-y-5">
                {contactRows.map((row) => (
                  <ContactRow key={row.label} {...row} />
                ))}
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-8 pt-6 border-t border-border/20"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -left-1 -top-1 text-4xl font-serif leading-none"
                    style={{ color: "hsl(45 93% 47% / 0.2)" }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    "
                  </motion.div>
                  <p className="text-sm text-muted-foreground italic pl-5 font-body leading-relaxed">
                    Excellence is not a destination; it's a continuous journey that never ends.
                    Let's create something extraordinary together.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3, type: "spring", stiffness: 90 }}
            style={{ pointerEvents: "auto" }}
            className="relative z-20"
          >
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: "linear-gradient(145deg,hsl(218 45% 9%),hsl(218 45% 5%))",
                border: "1px solid hsl(45 93% 47% / 0.12)",
              }}
            >
              {/* Top bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                style={{ background: "linear-gradient(90deg,#06b6d4,#3b82f6,#a855f7)" }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
              />

              <form ref={formRef} onSubmit={handleSubmit} style={{ pointerEvents: "auto" }}>
                <div className="space-y-5">
                  <AnimatedInput
                    id="contact-name"
                    name="name"
                    label="Your Name"
                    placeholder="KALANITHI M"
                    value={formData.name}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                    delay={0.4}
                  />
                  <AnimatedInput
                    id="contact-email"
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="kalanithi54321@gmail.com"
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                    delay={0.5}
                  />
                  <AnimatedInput
                    id="contact-message"
                    name="message"
                    label="Your Message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(v) => setFormData({ ...formData, message: v })}
                    delay={0.6}
                    isTextarea
                  />

                  {/* Send button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    whileHover={isSubmitting ? {} : {
                      scale: 1.03,
                      boxShadow: "0 20px 50px rgba(245,158,11,0.4)",
                    }}
                    whileTap={isSubmitting ? {} : { scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-4 font-semibold text-sm font-subheading text-navy-deep disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    style={{
                      background: "linear-gradient(90deg,#f59e0b,#f97316,#f59e0b)",
                      backgroundSize: "200% 100%",
                      boxShadow: "0 8px 30px rgba(245,158,11,0.3)",
                    }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.15) 50%,transparent 65%)", backgroundSize: "200% 100%" }}
                      animate={!isSubmitting ? { backgroundPosition: ["200% 0", "-200% 0"] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Send size={18} />
                          </motion.span>
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
