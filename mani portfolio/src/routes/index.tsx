import { createFileRoute } from "@tanstack/react-router";
import { DataUniverse } from "@/components/DataUniverse";
import { GlowCursor } from "@/components/GlowCursor";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Workflow } from "@/components/sections/Workflow";
import { Projects } from "@/components/sections/Projects";
import { ExcelDashboard } from "@/components/sections/ExcelDashboard";
import { Education } from "@/components/sections/Education";
import { Career } from "@/components/sections/Career";
import { Contact } from "@/components/sections/Contact";
import { SiteFooter } from "@/components/sections/SiteFooter";

const TITLE = "Manikandan S | Aspiring Data Analyst";
const DESCRIPTION =
  "Portfolio of Manikandan S, a B.Com (Co-operation) graduate building skills in Excel, SQL, Power BI and Data Analytics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Manikandan S",
          jobTitle: "Aspiring Data Analyst",
          email: "mailto:manikandan07181211@gmail.com",
          telephone: "+91-9894863995",
          knowsLanguage: ["Tamil", "English"],
          alumniOf: "L.N. Government College (Autonomous)",
          knowsAbout: ["Microsoft Excel", "Pivot Tables", "SQL", "Power BI", "Data Analysis"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-dvh">
      <DataUniverse />
      <GlowCursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Workflow />
        <Projects />
        <ExcelDashboard />
        <Education />
        <Career />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
