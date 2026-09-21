import { Reveal, SectionHeading } from "@/components/Reveal";

const KPIS = ["Total Sales", "Profit", "Orders", "Categories"];
const BARS = [42, 68, 35, 80, 55, 72, 48, 90, 60, 38, 75, 52];
const CATEGORIES = [
  { name: "Category A", w: "78%" },
  { name: "Category B", w: "56%" },
  { name: "Category C", w: "41%" },
  { name: "Category D", w: "28%" },
];
const TOP_PRODUCTS = ["Product 1", "Product 2", "Product 3", "Product 4"];
const SLICERS = ["Region", "Month", "Category"];

/** Illustrative Excel-style dashboard layout. No numeric results are claimed. */
export function ExcelDashboard({ compact = false }: { compact?: boolean }) {
  const panel = (
    <div className="rounded-xl border border-border bg-background/40 p-3 sm:p-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k} className="rounded-lg border border-border bg-surface/60 p-2.5">
            <p className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {k}
            </p>
            <div className="mt-2 h-2 w-2/3 rounded-full bg-primary/60" />
            <div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-accent/50" />
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-border bg-surface/60 p-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Sales &amp; Monthly Trend
          </p>
          <div className="mt-3 flex h-24 items-end gap-1.5" aria-hidden="true">
            {BARS.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/25 to-primary"
              />
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-lg border border-border bg-surface/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Profit by Category
            </p>
            <ul className="mt-3 space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                  <span className="h-1.5 rounded-full bg-accent/70" style={{ width: c.w }} />
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                    {c.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-surface/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Top Products
            </p>
            <ul className="mt-2 space-y-1.5">
              {TOP_PRODUCTS.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {SLICERS.map((s) => (
          <span
            key={s}
            className="rounded-md border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
        <span className="ml-auto font-mono text-[10px] text-primary">Built with Microsoft Excel</span>
      </div>
    </div>
  );

  if (compact) {
    return (
      <div aria-hidden="true" className="pointer-events-none scale-[0.98] opacity-90">
        {panel}
      </div>
    );
  }

  return (
    <section id="excel-analytics" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Dashboard" title="Excel Analytics" />
      <Reveal>
        <div className="glass rounded-2xl p-3 sm:p-5">{panel}</div>
        <p className="mt-3 text-xs text-muted-foreground">
          Illustrative dashboard layout showing the structure I build in Excel. No result figures
          are shown here.
        </p>
      </Reveal>
    </section>
  );
}
