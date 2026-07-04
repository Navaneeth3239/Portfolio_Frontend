import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Layout, Server, Database, Wrench, Code2 } from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiLinux,
  SiPostman,
  SiCanva } from
"react-icons/si";

import { skillGroups } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

const skillIcons = {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiLinux,
  SiPostman,
  SiCanva
};

const categoryIcons = {
  code: Code,
  layout: Layout,
  server: Server,
  database: Database,
  wrench: Wrench
};

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
      <SectionHeading
        eyebrow="Skills"
        title="My technical toolbox"
        subtitle="Technologies and tools I use to design, build and ship full-stack applications." />
      

      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, gi) => {
          const CatIcon = categoryIcons[group.icon] ?? Code;
          return (
            <Reveal key={group.category} delay={gi * 0.08} className="gradient-border rounded-3xl p-6 shadow-card">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <CatIcon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold">{group.category}</h3>
              </div>

              <div className="space-y-4">
                {group.skills.map((skill) => {
                  const Icon = skill.icon === "code2" ? Code2 : skillIcons[skill.icon];
                  return <SkillBar key={skill.name} name={skill.name} level={skill.level} Icon={Icon} />;
                })}
              </div>
            </Reveal>);

        })}
      </div>
    </section>);

}

function SkillBar({ name, level, Icon }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium">
          {Icon && <Icon className="h-4 w-4 text-secondary transition-transform group-hover:scale-125" />}
          {name}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted/60">
        <motion.div
          className="h-full rounded-full bg-gradient-brand"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, ease: "easeOut" }} />
        
      </div>
    </div>);

}