import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Contact";
import { PortfolioProvider } from "@/hooks/use-portfolio";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/_main")({
  component: MainLayout
});

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background">
      
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-brand text-2xl font-extrabold text-white shadow-glow">
          
          {profile.initials}
        </motion.div>
        <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-gradient-brand"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.1, ease: "easeInOut" }} />
          
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Loading portfolio…</p>
      </div>
    </motion.div>);

}

function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <PortfolioProvider>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <div className="relative overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>);

}