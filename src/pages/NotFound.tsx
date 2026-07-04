import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="mb-4 text-8xl font-heading text-gradient-gold">404</h1>
        <p className="mb-8 text-xl text-muted-foreground font-subheading">
          Oops! This page doesn't exist
        </p>
        <a 
          href="/" 
          className="btn-luxury-primary inline-flex items-center gap-2"
        >
          <Home size={18} />
          Return Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
