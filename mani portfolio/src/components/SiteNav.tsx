import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import portrait from "@/assets/manikandan-portrait.jpg.asset.json";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) setProfileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/60" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <a href="#home" className="font-display text-lg font-bold tracking-tight text-foreground">
          MS<span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`rounded-full px-3 py-2 text-sm transition-colors ${
                  active === l.id
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#resume"
            className="hidden rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 sm:inline-flex"
          >
            Download Resume
          </a>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              aria-expanded={profileOpen}
              aria-haspopup="dialog"
              aria-label="Open profile card for Manikandan S"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img
                src={portrait.url}
                alt="Manikandan S"
                width={40}
                height={40}
                className="h-9 w-9 rounded-full border border-primary/40 object-cover object-top shadow-[0_0_0_2px_hsl(var(--background))]"
              />
            </button>

            {profileOpen && (
              <div
                role="dialog"
                aria-label="Profile"
                className="glass absolute right-0 top-[calc(100%+0.6rem)] z-50 w-64 animate-[fade-in_0.18s_ease-out] rounded-2xl border border-border/70 p-4 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  aria-label="Close profile card"
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={portrait.url}
                    alt="Portrait of Manikandan S"
                    className="h-16 w-16 rounded-full border border-primary/40 object-cover object-top"
                  />
                  <p className="mt-3 font-display text-base font-semibold text-foreground">
                    Manikandan S
                  </p>
                  <p className="text-sm text-muted-foreground">Aspiring Data Analyst</p>
                  <a
                    href="#contact"
                    onClick={() => setProfileOpen(false)}
                    className="mt-3 w-full rounded-full border border-primary/40 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="glass border-t border-border lg:hidden">
          <ul className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#resume"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-primary"
              >
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
