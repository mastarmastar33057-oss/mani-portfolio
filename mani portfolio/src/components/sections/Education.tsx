import { Award, GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const TIMELINE = [
  {
    period: "2023 – 2026",
    title: "Bachelor of Commerce (B.Com) – Co-operation",
    place: "L.N. Government College (Autonomous)",
    note: "CGPA: 6.15 / 10 — First Class",
  },
  {
    period: "2021 – 2023",
    title: "Higher Secondary Education",
    place: "Govt. Hr. Sec. School, Padiyanallur",
    note: "Percentage: 75.83%",
  },
];

const CERTS = [
  {
    title: "30-Day MasterClass in Data Analytics",
    place: "NoviTech R&D Private Limited",
    note: "June 2026 – July 2026",
  },
  { title: "HDCA – Computer Applications", place: "BSS Computer Centre", note: "" },
];

export function Education() {
  return (
    <>
      <section id="education" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Background" title="Education" />
        <ol className="relative border-l border-border pl-6">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <li className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1.5 grid size-4 place-items-center rounded-full border border-primary/60 bg-background"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>
                <p className="font-mono text-xs tracking-[0.2em] text-primary">{item.period}</p>
                <h3 className="mt-2 flex items-start gap-2 text-lg font-semibold">
                  <GraduationCap className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="min-w-0">{item.title}</span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.place}</p>
                <p className="mt-1 text-sm text-foreground/85">{item.note}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="certifications" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Learning" title="Certifications" />
        <div className="grid gap-4 sm:grid-cols-2">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <article className="glass h-full rounded-2xl p-5">
                <Award className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.place}</p>
                {c.note && <p className="mt-1 font-mono text-xs text-accent">{c.note}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
