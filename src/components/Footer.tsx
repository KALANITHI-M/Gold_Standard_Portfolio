import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
   
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/kalanithi_kbd?igsh=MW04bTVzZWlvcjRpNA==",
      hoverColor: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]",
      iconColor: "group-hover:text-[#e1306c]",
      className: "instagram"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/KALANITHI-M",
      hoverColor: "hover:bg-[#333333]",
      iconColor: "group-hover:text-[#333333]",
      className: "github"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/kalanithi-m-597a72298",
      hoverColor: "hover:bg-[#0072b1]",
      iconColor: "group-hover:text-[#0072b1]",
      className: "linkedin"
    },
  ];

  return (
    <footer className="py-12 border-t border-border/20 relative overflow-hidden bg-gradient-to-b from-transparent to-navy-dark/40">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 to-transparent pointer-events-none" />
      
      <div className="section-container relative z-10">
        {/* Social Media Icons */}
        <div className="mb-10">
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="group relative w-12 h-12 rounded-full bg-white/5 border border-primary/20 flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                {/* Background animation layer */}
                <div className={`absolute inset-0 rounded-full transition-all duration-500 -translate-y-full group-hover:translate-y-0 bg-white`} />
                
                {/* Icon */}
                <social.icon 
                  className={`w-5 h-5 text-primary relative z-10 transition-colors duration-500 ${social.iconColor}`}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />

        {/* Thirukural */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 max-w-2xl mx-auto"
        >
          {/* Chapter Name */}
          <p className="text-xs text-primary/50 font-subheading tracking-widest uppercase mb-4">
            அதிகாரம்: அன்புடைமை
          </p>

          {/* Kural Couplet */}
          <div className="mb-4 inline-block text-left">
            <p className="text-base md:text-lg text-primary/90 font-body leading-loose">
              அன்புடைமை ஆன்ற குடிப்பிறத்தல் இவ்விரண்டும்
            </p>
            <p className="text-base md:text-lg text-primary/90 font-body leading-loose">
              தென்புலத்தார் தேரப் படும்.
            </p>
          </div>

          {/* Kural Number */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-primary/20"></div>
            <p className="text-xs text-muted-foreground/60 font-subheading tracking-wider">
              திருக்குறள் — 55
            </p>
            <div className="h-px w-10 bg-primary/20"></div>
          </div>
        </motion.div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-heading text-gradient-gold"
          >
            KM
          </motion.a>

          {/* Quick Links */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="#about"
              className="text-xs text-muted-foreground/60 hover:text-primary transition-colors font-subheading"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-xs text-muted-foreground/60 hover:text-primary transition-colors font-subheading"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-xs text-muted-foreground/60 hover:text-primary transition-colors font-subheading"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
