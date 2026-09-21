import { motion } from "motion/react";
import { SectionHeading } from "@/components/Reveal";

const STAGES = [
  { title: "RAW DATA", note: "Collected spreadsheets and source files" },
  { title: "DATA CLEANING", note: "Remove duplicates, fix formats, handle blanks" },
  { title: "DATA ANALYSIS", note: "Pivot Tables, formulas, grouping, comparison" },
  { title: "VISUALIZATION", note: "Pivot Charts, dashboards, slicers" },
  { title: "INSIGHTS", note: "Clear takeaways from the data" },
];

export function Workflow() {
  return (
    <section id="workflow" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Process" title="Data Analytics Workflow" />

      <ol className="relative space-y-3">
        {STAGES.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative"
          >
            <div className="glass grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-xl p-4 transition-colors duration-300 hover:border-primary/40">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/40 font-mono text-sm text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-mono text-sm tracking-[0.18em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <motion.span
                aria-hidden="true"
                className="ml-9 block w-px bg-gradient-to-b from-primary/70 to-accent/20"
                initial={{ height: 0 }}
                whileInView={{ height: 22 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
              />
            )}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
