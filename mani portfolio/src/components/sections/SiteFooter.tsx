const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <p className="font-display text-lg font-bold tracking-tight">MANIKANDAN S</p>
          <p className="mt-1 text-sm text-primary">Aspiring Data Analyst</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Building skills. Exploring data. Creating insights.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 Manikandan S. All rights reserved.
      </div>
    </footer>
  );
}
