import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import { usePortfolio } from "@/hooks/use-portfolio";
import { Counter, Magnetic, ParticleField } from "./primitives";

function useTyping(words) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 45 : 90;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const { profile, stats } = usePortfolio();
  const typed = useTyping(profile.roles);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        fetchPriority="high" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <ParticleField className="absolute inset-0 h-full w-full" />

      {/* floating blobs */}
      <div className="animate-blob absolute -left-20 top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="animate-blob absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-secondary/25 blur-3xl [animation-delay:3s]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-1.5 text-xs font-medium text-secondary backdrop-blur">
            <span className="h-2 w-2 rounded-full glow-dot" />
            Available for internships & freelance
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Hi, I'm <span className="text-gradient">{profile.name}</span>
          </h1>

          <p className="mt-4 flex flex-wrap items-center gap-2 text-xl font-semibold text-muted-foreground sm:text-2xl">
            <span>I'm a</span>
            <span className="text-foreground">
              {typed}
              <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-secondary align-middle" style={{ height: "1em" }} />
            </span>
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
                
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-card">
              
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-secondary transition-colors hover:text-foreground">
              
              Hire Me
            </a>

          </div>

          <div className="mt-8 flex items-center gap-3">
            {[
            { icon: Github, href: profile.github, label: "GitHub" },
            { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${profile.email}`, label: "Email" }].
            map(({ icon: Icon, href, label }) =>
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-card/50 text-muted-foreground backdrop-blur transition-all hover:scale-110 hover:text-secondary hover:shadow-glow">
              
                <Icon className="h-4 w-4" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Profile visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto">
          
          <div className="animate-float relative grid h-64 w-64 place-items-center rounded-[2rem] sm:h-80 sm:w-80">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-brand opacity-30 blur-2xl" />
            <div className="gradient-border absolute inset-0 rounded-[2rem]" />
            <div className="glass relative grid h-full w-full place-items-center overflow-hidden rounded-[2rem]">
              {profile.photoUrl ?
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="h-full w-full object-cover"
                fetchPriority="high" /> :


              <span className="text-gradient font-display text-8xl font-extrabold">
                  {profile.initials}
                </span>
              }
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-5xl px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass grid grid-cols-2 gap-4 rounded-2xl p-5 shadow-card sm:grid-cols-4">
          
          {stats.map((s) =>
          <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{s.label}</div>
            </div>
          )}
        </motion.div>
      </div>
    </section>);

}