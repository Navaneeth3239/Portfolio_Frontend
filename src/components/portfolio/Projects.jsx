import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Search, X } from "lucide-react";
import { usePortfolio } from "@/hooks/use-portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function Projects() {
  const { projects } = usePortfolio();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const allTech = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = projects.filter((p) => {
    const matchesFilter = filter === "All" || p.tech.includes(filter);
    const q = query.toLowerCase();
    const matchesQuery =
    !q ||
    p.title.toLowerCase().includes(q) ||
    p.subtitle.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        subtitle="A selection of full-stack applications focused on solving real problems." />
      

      {/* Controls */}
      <Reveal className="mb-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-border bg-card/50 py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-secondary" />
          
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {allTech.map((t) =>
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
            filter === t ?
            "bg-gradient-brand text-white shadow-glow" :
            "border border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground"}`
            }>
            
              {t}
            </button>
          )}
        </div>
      </Reveal>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) =>
        <Reveal key={p.title} delay={i * 0.08}>
            <motion.button
            onClick={() => setActive(p)}
            whileHover={{ y: -6 }}
            className="group h-full w-full overflow-hidden rounded-3xl border border-border/60 bg-card/60 text-left shadow-card transition-colors hover:border-secondary/40">
            
              <div className="relative aspect-video overflow-hidden">
                <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-secondary">{p.subtitle}</div>
                <h3 className="mt-1 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) =>
                <span key={t} className="rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {t}
                    </span>
                )}
                </div>
              </div>
            </motion.button>
          </Reveal>
        )}
      </div>

      {filtered.length === 0 &&
      <p className="py-10 text-center text-sm text-muted-foreground">No projects match your search.</p>
      }

      {/* Modal */}
      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>);

}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur-sm">
      
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card shadow-card">
        
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur transition-colors hover:bg-background">
          
          <X className="h-4 w-4" />
        </button>
        <div className="relative aspect-video overflow-hidden">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>
        <div className="p-6">
          <div className="text-xs font-semibold uppercase tracking-wide text-secondary">{project.subtitle}</div>
          <h3 className="mt-1 font-display text-2xl font-bold">{project.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>

          <h4 className="mt-5 text-sm font-semibold">Key Features</h4>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {project.features.map((f) =>
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full glow-dot" />
                {f}
              </li>
            )}
          </ul>

          <h4 className="mt-5 text-sm font-semibold">Technologies</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((t) =>
            <span key={t} className="rounded-lg border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium">
                {t}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo &&
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105">
              
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            }
            {project.github &&
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">
              
                <Github className="h-4 w-4" /> View Code
              </a>
            }
          </div>
        </div>
      </motion.div>
    </motion.div>);

}