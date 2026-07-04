import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import {
  profile as defaultProfile,
  stats as defaultStats,
  projects as defaultProjects,
  certificates as defaultCertificates } from
"@/data/portfolio";



















































const fallback = {
  profile: { ...defaultProfile, photoUrl: "/portfolio/navaneeth.jpg", resumeUrl: "/Navaneeth_B_Resume.pdf" },
  stats: defaultStats,
  projects: defaultProjects.map((p) => ({ ...p })),
  certificates: defaultCertificates.map((c) => ({ ...c }))
};

/**
 * Resolve an image reference to a usable URL.
 * - HTTP(S) and relative/static paths are returned as-is.
 */
export async function resolveImage(ref) {
  if (!ref) return "";
  return ref;
}

async function fetchPortfolio() {
  const [profileData, projectsData, certsData] = await Promise.all([
  api.getProfile(),
  api.getProjects(),
  api.getCertificates()]
  );

  const p = profileData;
  const profile = p ?
  {
    name: p.name,
    firstName: p.first_name,
    title: p.title,
    roles: p.roles?.length ? p.roles : fallback.profile.roles,
    tagline: p.tagline,
    about: p.about,
    location: p.location,
    email: p.email,
    phone: p.phone,
    phoneRaw: p.phone_raw,
    github: p.github,
    linkedin: p.linkedin,
    address: p.address,
    initials: p.initials || "NB",
    photoUrl: await resolveImage(p.photo_url),
    resumeUrl: p.resume_url || "/Navaneeth_B_Resume.pdf"
  } :
  fallback.profile;

  const stats = p && Array.isArray(p.stats) && p.stats.length ?
  p.stats :
  fallback.stats;

  const projectsRows = projectsData ?? [];
  const projects = projectsRows.length ?
  await Promise.all(
    projectsRows.map(async (row) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      image: await resolveImage(row.image_url),
      tech: row.tech ?? [],
      features: row.features ?? [],
      github: row.github,
      demo: row.demo,
      accent: row.accent
    }))
  ) :
  fallback.projects;

  const certRows = certsData ?? [];
  const certificates = certRows.length ?
  await Promise.all(
    certRows.map(async (row) => ({
      id: row.id,
      title: row.title,
      org: row.org,
      date: row.date_text,
      category: row.category,
      image: await resolveImage(row.image_url)
    }))
  ) :
  fallback.certificates;

  return { profile, stats, projects, certificates };
}

export function usePortfolioQuery() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
    staleTime: 1000 * 60
  });
}

const PortfolioContext = createContext(fallback);

export function PortfolioProvider({ children }) {
  const { data } = usePortfolioQuery();
  return <PortfolioContext.Provider value={data ?? fallback}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}