import { MapPin, Mail, Phone, Languages as LangIcon, Sparkles, GraduationCap, Briefcase } from "lucide-react";
import { education, experience, languages, interests } from "@/data/portfolio";
import { usePortfolio } from "@/hooks/use-portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function About() {
  const { profile } = usePortfolio();
  const details = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Mail, label: "Email", value: profile.email },
  { icon: Phone, label: "Phone", value: profile.phone },
  { icon: LangIcon, label: "Languages", value: languages.join(", ") }];


  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="About Me"
        title="Turning ideas into real products"
        subtitle="A quick look at who I am, what drives me, and where I'm headed." />
      

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="gradient-border rounded-3xl p-8 shadow-card">
          <h3 className="font-display text-xl font-bold">Who I am</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{profile.about}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {details.map((d) =>
            <div key={d.label} className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/30 p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-brand text-white">
                  <d.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{d.label}</div>
                  <div className="truncate text-sm font-medium">{d.value}</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-secondary" /> Interests
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) =>
              <span key={i} className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {i}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        <div className="space-y-8">
          {/* Education */}
          <Reveal delay={0.1}>
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-secondary" />
              <h3 className="font-display text-xl font-bold">Education</h3>
            </div>
            <Timeline
              items={education.map((e) => ({
                title: e.degree,
                org: e.school,
                period: e.period,
                description: e.detail
              }))} />
            
          </Reveal>

          {/* Experience */}
          <Reveal delay={0.2}>
            <div className="mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-secondary" />
              <h3 className="font-display text-xl font-bold">Experience</h3>
            </div>
            <Timeline
              items={experience.map((e) => ({
                title: e.role,
                org: e.org,
                period: e.period,
                description: e.description
              }))} />
            
          </Reveal>
        </div>
      </div>
    </section>);

}

function Timeline({
  items


}) {
  return (
    <div className="relative space-y-5 border-l border-border/60 pl-6">
      {items.map((item, i) =>
      <div key={i} className="relative">
          <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full glow-dot ring-4 ring-background" />
          <div className="rounded-2xl border border-border/50 bg-card/50 p-4 transition-colors hover:border-secondary/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-semibold">{item.title}</h4>
              <span className="rounded-full bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {item.period}
              </span>
            </div>
            <div className="text-sm font-medium text-secondary">{item.org}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        </div>
      )}
    </div>);

}