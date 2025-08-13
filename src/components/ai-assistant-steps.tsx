import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { UserPlus, BookMarked, Bot, Plug, Boxes, type LucideIcon } from 'lucide-react';

/**
 * AiAssistantSteps
 * - Plain React + Tailwind component (no Next.js APIs).
 * - Alternating two-column timeline with curved SVG connectors.
 * - Scroll animations: cards slide in from alternating sides; connectors follow.
 *
 * Usage:
 *   <AiAssistantSteps />
 *
 * Tailwind: ensure Tailwind is configured in your React app.
 * Icons:    npm i lucide-react
 */

type Step = {
  title: string
  description: string
  Icon: LucideIcon
  iconBg: string
  iconFg: string
}

const DEFAULT_STEPS: Step[] = [
  {
    title: "Create an Agent",
    description: "Sign Up to Blacksight AI and Set-up your agent from the dashboard.",
    Icon: UserPlus,
    iconBg: "bg-violet-50",
    iconFg: "text-violet-600",
  },
  {
    title: "Add Knowledge Base",
    description: "Embed a Knowledge Base specified to your business in the agent.",
    Icon: BookMarked,
    iconBg: "bg-amber-50",
    iconFg: "text-amber-600",
  },
  {
    title: "Train your bot",
    description: "Tailor your agent to your specified response pattern.",
    Icon: Bot,
    iconBg: "bg-emerald-50",
    iconFg: "text-emerald-600",
  },
  {
    title: "Connect Via API or MCP",
    description: "Connect your agent to a the main server Via API or MCP Protocols.",
    Icon: Plug,
    iconBg: "bg-fuchsia-50",
    iconFg: "text-fuchsia-600",
  },
  {
    title: "Integrate Agent",
    description: "Finish up the agent and get started.",
    Icon: Boxes,
    iconBg: "bg-rose-50",
    iconFg: "text-rose-600",
  },
]

// Observe visibility per element to drive enter/leave animations
function useVisibility(count: number, threshold = 0.25) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<boolean[]>(Array(count).fill(false))

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLDivElement[]
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = [...prev]
          for (const entry of entries) {
            const idxAttr = entry.target.getAttribute("data-index")
            if (idxAttr) {
              const idx = Number(idxAttr)
              // Toggle on intersection so cards animate in and out while scrolling
              next[idx] = entry.isIntersecting
            }
          }
          return next
        })
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [count, threshold])

  return { refs, visible }
}

type Connector = {
  fromIdx: number
  toIdx: number
  d: string // SVG path data
  animateWithIndex: number
}

export default function AiAssistantSteps({
  steps = DEFAULT_STEPS,
  title = "How to use AI Assistant",
  // Adjust how much lower the right column sits (to “touch” arrows nicely)
  rightColumnOffset = 64, // px on md+ screens
}: {
  steps?: Step[]
  title?: string
  rightColumnOffset?: number
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { refs: cardRefs, visible } = useVisibility(steps.length)

  const [rects, setRects] = useState<DOMRect[]>([])
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  // Measure card and container rects to build connectors
  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current
      if (!container) return
      setContainerRect(container.getBoundingClientRect())
      const rs: DOMRect[] = steps.map((_, i) => cardRefs.current[i]?.getBoundingClientRect() ?? new DOMRect())
      setRects(rs)
    }

    // Initial + on next paint for accuracy
    requestAnimationFrame(measure)

    // Resize handling
    const onResize = () => requestAnimationFrame(measure)
    window.addEventListener("resize", onResize)

    // Observe container if available
    const RO = (window as any).ResizeObserver
    const ro = RO ? new RO(onResize) : null
    if (ro && containerRef.current) ro.observe(containerRef.current)

    return () => {
      window.removeEventListener("resize", onResize)
      ro?.disconnect?.()
    }
  }, [steps.length])

  // Build curved connectors from each card to the next
  const connectors: Connector[] = useMemo(() => {
    if (!containerRect || rects.length < 2) return []

    const cs: Connector[] = []
    for (let i = 0; i < rects.length - 1; i++) {
      const from = rects[i]
      const to = rects[i + 1]
      if (!from?.width || !to?.width) continue

      const isFromLeft = i % 2 === 0 // even indexes on left
      const fromX = isFromLeft ? from.right - containerRect.left : from.left - containerRect.left
      const toX = isFromLeft ? to.left - containerRect.left : to.right - containerRect.left

      // Anchor lower on the "from" card and upper on the "to" card
      const FROM_ANCHOR = 0.66 // ~2/3 down from top
      const TO_ANCHOR = 0.30   // ~1/3 down from top

      const fromY = from.top - containerRect.top + from.height * FROM_ANCHOR
      const toY = to.top - containerRect.top + to.height * TO_ANCHOR

      const dx = Math.abs(toX - fromX)
      const dy = Math.abs(toY - fromY)

      // Smooth curve amounts
      const bendX = Math.max(70, dx * 0.45)
      const bendY = Math.max(50, dy * 0.65)

      const c1x = isFromLeft ? fromX + bendX : fromX - bendX
      const c1y = fromY + bendY * 0.6
      const c2x = isFromLeft ? toX - bendX : toX + bendX
      const c2y = toY - bendY * 0.6

      const d = `M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`

      cs.push({
        fromIdx: i,
        toIdx: i + 1,
        d,
        animateWithIndex: i,
      })
    }
    return cs
  }, [containerRect, rects])

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <h2 className="text-center text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
          {title}
        </h2>

        <div
          ref={containerRef}
          className="relative mt-10 sm:mt-12"
          aria-label="AI Assistant setup steps"
          // ensure connectors have room at the bottom
          style={{ paddingBottom: rightColumnOffset + 80 }}
        >
          {/* Curved connectors (md+) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden md:block"
            width="100%"
            height="100%"
            viewBox={`0 0 ${containerRect?.width ?? 0} ${containerRect?.height ?? 0}`}
            preserveAspectRatio="none"
          >
            <defs>
              <marker id="arrow-gray-200" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
                <path d="M0,0 L0,14 L14,7 z" fill="#e5e7eb"></path>
              </marker>
            </defs>
            {connectors.map((c, idx) => {
              const fromLeft = c.fromIdx % 2 === 0
              const active = visible[c.animateWithIndex]
              const translate = active ? 0 : fromLeft ? -36 : 36
              const opacity = active ? 1 : 0
              return (
                <g
                  key={idx}
                  style={{
                    transition: "transform 700ms ease-out, opacity 700ms ease-out",
                    transform: `translateX(${translate}px)`,
                    opacity,
                  }}
                >
                  <path
                    d={c.d}
                    fill="none"
                    stroke="#e5e7eb" // gray-200 to match subtle arrows
                    strokeWidth={2}
                    markerEnd="url(#arrow-gray-200)"
                  />
                </g>
              )
            })}
          </svg>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              const initialShift = isLeft ? "-translate-x-16" : "translate-x-16"
              const alignClass = isLeft ? "md:justify-self-start" : "md:justify-self-end"
              // Apply vertical offset for right column cards via inline style (Tailwind dynamic class avoided)
              const verticalOffset = !isLeft ? rightColumnOffset : 0
              return (
                <div
                  key={i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-index={i}
                  className={["relative", "flex", alignClass].join(" ")}
                  style={{ marginTop: verticalOffset }}
                >
                  <div
                    className={[
                      "w-full md:w-[560px] max-w-[92vw]",
                      "rounded-2xl border border-dashed border-zinc-200 bg-white",
                      "shadow-sm shadow-zinc-900/5",
                      "px-6 py-5 sm:px-7 sm:py-6",
                      "transition-all duration-700 ease-out will-change-transform",
                      "transform",
                      visible[i] ? "opacity-100 translate-x-0" : `opacity-0 ${initialShift}`,
                      // smaller minimum height to keep row sizing consistent
                      "min-h-[72px]"
                    ].join(" ")}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 ${step.iconBg} rounded-xl p-2.5`}>
                        <step.Icon className={`h-6 w-6 ${step.iconFg}`} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm sm:text-[15px] text-zinc-600">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Decorative small down arrow near the connector drop */}
                    {i < steps.length - 1 && (
                      <div
                        className={[
                          "hidden md:block absolute",
                          isLeft ? "right-6" : "left-6",
                          "bottom-[-26px]",
                          "opacity-60 transition-opacity duration-700",
                          visible[i] ? "opacity-60" : "opacity-0",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 5v14m0 0l-5-5m5 5l5-5"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

