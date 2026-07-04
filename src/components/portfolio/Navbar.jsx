import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/hooks/use-theme";
import { usePortfolio } from "@/hooks/use-portfolio";

const links = [
{ label: "Home", to: "#home" },
{ label: "About", to: "#about" },
{ label: "Skills", to: "#skills" },
{ label: "Projects", to: "#projects" },
{ label: "Certificates", to: "#certificates" },
{ label: "Resume", to: "#resume" },
{ label: "Contact", to: "#contact" }];


const sectionIds = ["home", "about", "skills", "projects", "certificates", "resume", "contact"];

export function Navbar() {
  const { profile } = usePortfolio();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
        scrolled ? "glass shadow-card" : "border border-transparent"}`
        }>
        
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="group flex items-center gap-2 font-display font-bold">
          
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-sm text-white shadow-glow">
            {profile.initials}
          </span>
          <span className="text-base tracking-tight">{profile.firstName}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.to.replace("#", "");
            return (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l.to);
                }}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
                }>
                
                {l.label}
              </a>);

          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-muted/40 text-foreground transition-colors hover:bg-muted">
            
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            aria-label="Admin login"
            className="hidden items-center gap-1.5 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">
            
            <Lock className="h-3.5 w-3.5" /> Admin
          </Link>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            className="hidden rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 sm:inline-flex">
            
            Hire Me
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-muted/40 lg:hidden">
            
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="glass absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-2xl p-3 shadow-card lg:hidden">
          
            <div className="grid gap-1">
              {links.map((l) => {
              const isActive = active === l.to.replace("#", "");
              return (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(l.to);
                  }}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-muted/60 text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`
                  }>
                  
                    {l.label}
                  </a>);

            })}
              <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-lg border border-border/60 px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              
                <Lock className="h-4 w-4" /> Admin Login
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}