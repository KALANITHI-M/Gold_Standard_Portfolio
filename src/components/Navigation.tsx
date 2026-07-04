import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = navLinks.map(link => link.href.replace("#", ""));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-navy-deep/72 backdrop-blur-2xl border-b border-primary/10 shadow-lg shadow-primary/5" 
          : "bg-navy-deep/55 backdrop-blur-xl border-b border-primary/10 md:bg-transparent md:backdrop-blur-none md:border-b-0"
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="section-container relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo with animation */}
          <motion.a 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="relative z-10 flex items-center gap-2">
              <span className="text-2xl font-heading text-gradient-gold font-bold tracking-wider">
                KM
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-primary/50"
              >
                <Sparkles size={16} />
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
          </motion.a>

          {/* Desktop Nav with unique styling */}
          <div className="hidden md:flex items-center gap-1 bg-navy-medium/55 backdrop-blur-md rounded-full px-2 py-2 border border-primary/10 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative px-5 py-2 text-sm font-subheading transition-all duration-300 rounded-full group ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {/* Active indicator */}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                
                <span className="relative z-10">{link.label}</span>
                
                {/* Animated dots */}
                <motion.span
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.a>
            ))}
          </div>

          {/* Stylish Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative p-2 rounded-lg bg-navy-deep/85 border border-primary/25 text-primary shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-primary/15 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-3 rounded-2xl border border-primary/15 bg-navy-deep/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative px-4 py-3 text-sm font-subheading rounded-lg transition-all group ${
                      activeSection === link.href
                        ? "text-primary bg-primary/15 border border-primary/25 shadow-[0_0_0_1px_rgba(212,175,55,0.1)]"
                        : "text-primary/80 hover:text-primary hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {activeSection === link.href && (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                      )}
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
