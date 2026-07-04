import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Building2, X, Download, FileText, Eye, CheckCircle2 } from "lucide-react";
import { usePortfolio } from "@/hooks/use-portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function Certificates() {
  const { certificates } = usePortfolio();
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="certificates" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Certificates"
        title="Achievements & recognition"
        subtitle="Verified certifications and awards earned along the way." />
      

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) =>
        <Reveal key={c.title} delay={i * 0.1}>
            <div className="group overflow-hidden rounded-3xl border border-border/60 bg-card/60 shadow-card transition-colors hover:border-secondary/40">
              <button onClick={() => setLightbox(c.image)} className="relative block aspect-[4/3] w-full overflow-hidden">
                <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              
                <div className="absolute inset-0 grid place-items-center bg-background/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white">
                    <Eye className="h-4 w-4" /> Preview
                  </span>
                </div>
              </button>
              <div className="p-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
                  <Award className="h-3 w-3" /> {c.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{c.title}</h3>
                <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-secondary" /> {c.org}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" /> {c.date}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      <AnimatePresence>
        {lightbox &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-background/85 p-4 backdrop-blur-sm">
          
            <button
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-card">
            
              <X className="h-5 w-5" />
            </button>
            <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            src={lightbox}
            alt="Certificate preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto rounded-2xl border border-border shadow-card" />
          
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}

export function Resume() {
  const { profile } = usePortfolio();
  const highlights = [
  "ATS-friendly & recruiter-ready format",
  "Full-stack project portfolio included",
  "Updated with latest skills & education"];

  return (
    <section id="resume" className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <Reveal className="gradient-border overflow-hidden rounded-3xl p-8 shadow-card sm:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
              <FileText className="h-3.5 w-3.5" /> Resume
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              My <span className="text-gradient">résumé</span>, one click away
            </h2>
            <ul className="mt-5 space-y-2">
              {highlights.map((h) =>
                <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-secondary" /> {h}
                </li>
              )}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={profile.resumeUrl || "/Navaneeth_B_Resume.pdf"}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105">
                
                <Download className="h-4 w-4" /> Download PDF
              </a>
              <a
                href={profile.resumeUrl || "/Navaneeth_B_Resume.pdf"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted">
                <Eye className="h-4 w-4" /> Preview
              </a>
            </div>
          </div>
          <div className="mx-auto hidden md:block">
            <div className="animate-float grid h-44 w-36 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
              <FileText className="h-16 w-16" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>);

}