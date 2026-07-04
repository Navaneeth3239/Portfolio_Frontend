import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Certificates, Resume } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";

const TITLE = "Navaneeth B — Full Stack Developer";
const DESCRIPTION =
"Portfolio of Navaneeth B, a Computer Engineering student and Full Stack (MERN) Developer building scalable, real-world web applications.";

export const Route = createFileRoute("/_main/")({
  head: () => ({
    meta: [
    { title: TITLE },
    { name: "description", content: DESCRIPTION },
    { name: "keywords", content: "Navaneeth B, Full Stack Developer, MERN, React, Node.js, Portfolio, Web Developer" },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESCRIPTION }],

    links: [{ rel: "canonical", href: "/" }]
  }),
  component: HomePage
});

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Resume />
      <Contact />
    </>);

}