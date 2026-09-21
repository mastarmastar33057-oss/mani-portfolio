import { useState } from "react";
import { Mail, Phone, FileText, AlertCircle } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

export function Contact() {
  const [notice, setNotice] = useState(false);

  return (
    <>
      <section id="resume" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="glass glow-ring grid gap-6 rounded-2xl p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Want to know more about my background?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The downloadable resume file isn&apos;t available on this site yet — please reach out
                by email and I&apos;ll send it across.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-muted-foreground opacity-70"
              >
                <FileText className="size-4" /> Download Resume
              </button>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent">
                <AlertCircle className="size-3.5" /> Resume PDF not uploaded yet
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Contact" title="Let's Connect" />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-2xl p-6">
              <ul className="space-y-4">
                <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                  <Mail className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <a
                    href="mailto:manikandan07181211@gmail.com"
                    className="truncate text-sm hover:text-primary"
                  >
                    manikandan07181211@gmail.com
                  </a>
                </li>
                <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                  <Phone className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <a href="tel:+919894863995" className="truncate text-sm hover:text-primary">
                    9894863995
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:manikandan07181211@gmail.com"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                >
                  <Mail className="size-4" /> Email Me
                </a>
                <a
                  href="tel:+919894863995"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm"
                >
                  <Phone className="size-4" /> Call Me
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              className="glass h-full rounded-2xl p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setNotice(true);
              }}
            >
              <div className="grid gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-1.5 w-full rounded-lg border border-input bg-background/50 px-3 py-2.5 text-sm placeholder:text-muted-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1.5 w-full rounded-lg border border-input bg-background/50 px-3 py-2.5 text-sm placeholder:text-muted-foreground"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1.5 w-full rounded-lg border border-input bg-background/50 px-3 py-2.5 text-sm placeholder:text-muted-foreground"
                    placeholder="How can I help?"
                  />
                </div>
                <button
                  type="submit"
                  className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                >
                  Send Message
                </button>
                <p aria-live="polite" className="text-xs text-muted-foreground">
                  {notice
                    ? "This form has no backend connected yet, so your message was not sent. Please email manikandan07181211@gmail.com directly."
                    : "Note: message delivery is not connected yet — email is the fastest way to reach me."}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
