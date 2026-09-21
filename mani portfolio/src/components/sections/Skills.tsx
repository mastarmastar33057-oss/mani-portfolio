import { FileSpreadsheet, Brain, Database, BarChart3, Calculator, Briefcase } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const GROUPS = [
  {
    icon: FileSpreadsheet,
    title: "Microsoft Excel",
    items: ["Pivot Tables", "Pivot Charts", "Excel Dashboards", "Data Analysis"],
  },
  {
    icon: Brain,
    title: "Data Analysis",
    items: ["Data Cleaning", "Data Organization", "Analytical Thinking"],
  },
  {
    icon: Database,
    title: "SQL",
    items: ["Basic SQL", "Currently improving SQL query skills"],
  },
  {
    icon: BarChart3,
    title: "Power BI",
    items: ["Dashboard concepts", "Data visualization"],
  },
  { icon: Calculator, title: "Tally Prime", items: ["Accounting software"] },
  {
    icon: Briefcase,
    title: "Microsoft Office",
    items: ["Word", "Excel", "Office productivity"],
  },
];

const SOFT = ["Communication", "Teamwork", "Problem Solving", "Quick Learning", "Time Management"];
const LANGUAGES = ["Tamil", "English"];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Toolkit" title="Skills" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.05}>
            <article className="glass group h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:glow-ring">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                  <g.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="min-w-0 truncate text-base font-semibold">{g.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-2xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Soft Skills
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SOFT.map((s) => (
                <li key={s} className="rounded-full border border-border px-3 py-1.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass h-full rounded-2xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Languages
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {LANGUAGES.map((s) => (
                <li key={s} className="rounded-full border border-border px-3 py-1.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
