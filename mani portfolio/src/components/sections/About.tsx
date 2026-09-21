import { GraduationCap, LayoutDashboard, Table2, Database, BarChart3 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const CARDS = [
  { icon: GraduationCap, label: "B.Com Graduate" },
  { icon: LayoutDashboard, label: "Excel Dashboard" },
  { icon: Table2, label: "Pivot Tables" },
  { icon: Database, label: "SQL Learning" },
  { icon: BarChart3, label: "Power BI" },
];

const BUILDING = ["Advanced Excel", "SQL", "Power BI", "Data Cleaning", "Data Analysis"];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Profile" title="About Me" />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="text-base leading-relaxed text-muted-foreground">
            I&apos;m Manikandan S, a B.Com (Co-operation) graduate with a strong interest in Data
            Analytics. I enjoy working with data, finding patterns, creating dashboards and
            converting raw information into useful insights.
          </p>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            I&apos;m building my skills in
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {BUILDING.map((s) => (
              <li
                key={s}
                className="glass rounded-full px-4 py-2 text-sm text-foreground/90"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <div className="glass h-full rounded-xl p-4 transition-transform duration-300 hover:-translate-y-1">
                <c.icon className="size-5 text-primary" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
