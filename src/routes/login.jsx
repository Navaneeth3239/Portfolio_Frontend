import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api-client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
    { title: "Admin Login — Navaneeth B" },
    { name: "robots", content: "noindex, nofollow" }]

  }),
  component: LoginPage
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (api.isAuthenticated()) {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.login(email, password);
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      <div className="animate-blob absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="animate-blob absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl [animation-delay:3s]" />

      <Link
        to="/"
        className="absolute left-5 top-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        
        <ArrowLeft className="h-4 w-4" /> Back to site
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass relative w-full max-w-md rounded-3xl p-8 shadow-card">
        
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">Admin Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Email</span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-base pl-9" />
              
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-base pl-9" />
              
            </div>
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70">
            
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </motion.div>
    </div>);

}