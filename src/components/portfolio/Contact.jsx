import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { api } from "@/lib/api-client";
import { usePortfolio } from "@/hooks/use-portfolio";
import { Reveal, SectionHeading } from "./primitives";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000)
});

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = {};
      parsed.error.issues.forEach((i) => fieldErrors[i.path[0]] = i.message);
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await api.sendMessage(parsed.data);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("idle");
      setErrors({ message: err instanceof Error ? err.message : "Something went wrong. Please try again or email me directly." });
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass relative overflow-hidden rounded-3xl p-6 shadow-card sm:p-8">
      <div className="grid gap-4">
        <Field label="Name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="input-base" />

        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="input-base" />

        </Field>
        <Field label="Message" error={errors.message}>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me about your project or opportunity..."
            rows={5}
            className="input-base resize-none" />

        </Field>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70">

          {status === "loading" ?
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </> :

            <>
              <Send className="h-4 w-4" /> Send Message
            </>
          }
        </button>
      </div>

      <AnimatePresence>
        {status === "success" &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 grid place-items-center rounded-3xl bg-card/95 backdrop-blur">

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 14, stiffness: 240 }}
              className="text-center">

              <CheckCircle2 className="mx-auto h-16 w-16 text-secondary" />
              <h3 className="mt-4 font-display text-xl font-bold">Message sent!</h3>
              <p className="mt-1 text-sm text-muted-foreground">Thanks for reaching out. I'll reply soon.</p>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </form>
  );
}

export function Contact() {
  const { profile } = usePortfolio();

  const contactItems = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phoneRaw}` },
    { icon: MessageCircle, label: "WhatsApp", value: profile.phone, href: `https://wa.me/${profile.phoneRaw}` },
    { icon: MapPin, label: "Location", value: profile.address, href: undefined }];


  const socials = [
    { icon: Github, href: profile.github, label: "GitHub" },
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: MessageCircle, href: `https://wa.me/${profile.phoneRaw}`, label: "WhatsApp" }];


  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something great"
        subtitle="Open to internships, freelance work and collaborations. Drop a message — I'll get back to you." />


      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {contactItems.map((c) => {
              const Inner =
                <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-card transition-colors hover:border-secondary/40">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</div>
                    <div className="truncate text-sm font-medium">{c.value}</div>
                  </div>
                </div>;

              return c.href ?
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer">
                  {Inner}
                </a> :

                <div key={c.label}>{Inner}</div>;

            })}
          </div>

          <div className="flex gap-3">
            {socials.map((s) =>
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-border/60 bg-card/60 text-muted-foreground transition-all hover:scale-110 hover:text-secondary hover:shadow-glow">

                <s.icon className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-card">
            <iframe
              title="Location map"
              src="https://www.google.com/maps?q=Udumalpet,Tamil%20Nadu&output=embed"
              className="h-48 w-full grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" />

          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>);

}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>);
}

export function Footer() {
  const { profile } = usePortfolio();
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-xs text-white">
            {profile.initials}
          </span>
          {profile.name}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with React & MERN Stack.
        </p>
        <div className="flex gap-3">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-secondary">
            <Github className="h-5 w-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-secondary">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>);

}