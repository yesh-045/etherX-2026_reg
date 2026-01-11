"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Signal = {
  date: string
  title: string
  note: string
  tag: string
  status?: string
}

const signals: Signal[] = [
  {
    date: "2026.01.18",
    title: "Registration Opens",
    note: "PSG CSE-only intake. One submission per teammate; confirm your callsign before locking in.",
    tag: "Live",
    status: "Cohort cap in effect",
  },
  {
    date: "2026.01.20",
    title: "CTF Drops Begin",
    note: "Nightly portal challenges at 18:00 IST. Accuracy + first-blood bonuses mirror the old Cyber Chxse ruleset.",
    tag: "Drops",
  },
  {
    date: "2026.01.24",
    title: "Leaderboard Lock-In",
    note: "Submission timestamps finalize ranking. Ties break on first-blood and clean writeups.",
    tag: "Cutoff",
    status: "Ship before 23:59 IST",
  },
  {
    date: "2026.01.28",
    title: "Workshop Sprint",
    note: "Hands-on labs to rehearse exploit chains, recon, and reporting discipline ahead of on-site play.",
    tag: "Prep",
  },
  {
    date: "2026.02.01",
    title: "Vibe Coding",
    note: "Side quest returns. Lightweight creative build with timeboxed constraints and fast demoing.",
    tag: "Side Track",
  },
  {
    date: "2026.02.05",
    title: "Final Hackathon",
    note: "Top 10–15 teams meet on-site. Industry-grade briefs, scoring dashboards, and a full-day sprint.",
    tag: "Onsite",
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-20 px-7 md:px-16">
      {/* Section header */}
      <div ref={headerRef} className="mb-10 space-y-3 md:pl-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">What&apos;s New</span>
        <div className="flex flex-wrap items-baseline gap-3">
          <h2 className="font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">Fresh drops</h2>
          <span className="rounded-full border border-border/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Quick to scan
          </span>
        </div>
        <p className="max-w-3xl font-mono text-sm text-muted-foreground leading-relaxed">
          Single-column, time-ordered updates: dates, drops, and on-site checkpoints. Trimmed for mobile and desktop readability.
        </p>
      </div>

      <div ref={cardsRef} className="mx-auto max-w-5xl space-y-1 md:space-y-2">
        {signals.map((signal, index) => (
          <SignalCard key={signal.title} signal={signal} index={index} />
        ))}
      </div>
    </section>
  )
}

function SignalCard({
  signal,
  index,
}: {
  signal: Signal
  index: number
}) {
  return (
    <article className="group relative overflow-hidden border-b border-border/60 pb-6 pt-4 transition-transform duration-200 ease-out hover:-translate-y-[2px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="rounded-full bg-accent/10 px-2 py-1 text-accent">{signal.tag}</span>
          <span className="h-3 w-[1px] bg-border" />
          <time className="text-foreground/80">{signal.date}</time>
        </div>
        <span className="rounded-full border border-border/60 px-2 py-1 font-mono text-[10px] text-muted-foreground/70">#{String(index + 1).padStart(2, "0")}</span>
      </div>

      <h3 className="mt-3 font-[var(--font-bebas)] text-3xl tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
        {signal.title}
      </h3>

      <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed">{signal.note}</p>

      {signal.status && (
        <p className="mt-3 inline-flex max-w-max items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {signal.status}
        </p>
      )}
    </article>
  )
}
