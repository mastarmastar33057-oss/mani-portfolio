import { Target } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const ROLES = ["Entry-Level Data Analyst", "Data Entry / MIS", "Analytics Support Roles"];

export function Career() {
  return (
    <section id="career" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Goal" title="Currently Looking For" />
      <Reveal>
        <div className="glass rounded-2xl p-6 sm:p-8">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            I&apos;m currently looking for an entry-level opportunity where I can start my
            professional career, apply my analytical skills and continue learning through real-world
            projects.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {ROLES.map((r) => (
              <li
                key={r}
                className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm"
              >
                <Target className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
