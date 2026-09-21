import { motion } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";
import { DataSphere } from "@/components/DataSphere";


export function Hero() {
  return (
    <section id="home" className="relative mx-auto max-w-6xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
            Aspiring Data Analyst
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            Hi, I&apos;m Manikandan S
            <span className="mt-3 block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-2xl text-transparent sm:text-3xl lg:text-4xl">
              Turning Data Into Meaningful Insights
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            B.Com (Co-operation) graduate with hands-on experience building Excel dashboards, Pivot
            Tables, Pivot Charts and data analysis projects, while developing skills in Advanced
            Excel, SQL and Power BI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="glow-ring inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              View My Projects <ArrowRight className="size-4" />
            </a>
            <a
              href="#resume"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <FileText className="size-4" /> Download Resume
            </a>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 text-sm text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Open to Entry-Level Opportunities
          </p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <DataSphere />
        </motion.div>
      </div>
    </section>
  );
}
