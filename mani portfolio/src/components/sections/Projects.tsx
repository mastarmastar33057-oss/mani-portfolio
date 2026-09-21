import { useState } from "react";
import { X } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { ExcelDashboard } from "@/components/sections/ExcelDashboard";

type Project = {
  title: string;
  category: string;
  description: string;
  tools: string[];
  detail: { label: string; value: string }[];
};

const PROJECTS: Project[] = [
  {
    title: "Excel Sales Dashboard",
    category: "Excel Dashboard",
    description:
      "An interactive Excel dashboard built with Pivot Tables, Pivot Charts and slicers to explore sales data.",
    tools: ["Microsoft Excel", "Pivot Tables", "Pivot Charts", "Slicers"],
    detail: [
      { label: "Tools Used", value: "Microsoft Excel — Pivot Tables, Pivot Charts, slicers." },
      { label: "Data Cleaning", value: "Removing duplicates, fixing formats and handling blanks." },
      { label: "Analysis", value: "Grouping and comparing values using Pivot Tables." },
      { label: "Dashboard", value: "KPI cards and charts connected to slicers." },
      { label: "Key Insights", value: "Project details coming soon" },
      { label: "What I Learned", value: "Project details coming soon" },
    ],
  },
  {
    title: "Data Cleaning Practice Set",
    category: "Data Preparation",
    description:
      "Practice work focused on organising raw spreadsheet data into a consistent, analysis-ready structure.",
    tools: ["Microsoft Excel", "Data Cleaning"],
    detail: [
      { label: "Problem", value: "Project details coming soon" },
      { label: "Dataset", value: "Project details coming soon" },
      { label: "Tools Used", value: "Microsoft Excel." },
      { label: "Data Cleaning", value: "Standardising columns, formats and removing duplicates." },
      { label: "Key Insights", value: "Project details coming soon" },
    ],
  },
];

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : PROJECTS[openIndex];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Work" title="Featured Projects" />

      <div className="grid gap-6 lg:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <article className="glass flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1">
              <div className="border-b border-border bg-background/30 p-4">
                <ExcelDashboard compact />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {p.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                  >
                    View Project
                  </button>
                  <a
                    href="#excel-analytics"
                    className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm"
                  >
                    View Dashboard
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${open.title} details`}
          className="fixed inset-0 z-[80] grid place-items-center bg-background/80 p-4 backdrop-blur"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="glass max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {open.category}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{open.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close project details"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-border"
              >
                <X className="size-4" />
              </button>
            </div>
            <dl className="mt-6 space-y-4">
              {open.detail.map((d) => (
                <div key={d.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {d.label}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}
