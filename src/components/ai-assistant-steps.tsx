import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { UserPlus, BookMarked, Bot, Plug, Boxes, type LucideIcon } from 'lucide-react';

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
    description: "Sign Up to Blacksight AI and Set‑up your agent from the dashboard.",
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

function useVisibility(count: number, threshold = 0.3) {
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
              // Only set true when intersecting; do not reset false to avoid flicker
              if (entry.isIntersecting) {
                next[idx] = true
              }
            }
          }
          return next
        })
      },
      { threshold, rootMargin: "0px 0px -20% 0px" } // slightly bigger rootMargin to trigger earlier
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [count, threshold])

  return { refs, visible }
}

type Connector = {
  fromIdx: number
  toIdx: number
  d: string
  animateWithIndex: number
}

export default function AiAssistantSteps({
  steps = DEFAULT_STEPS,
  title = "How to use AI Assistant",
  rightColumnOffset = 64, // px vertical offset for right column cards
}: {
  steps?: Step[]
  title?: string
  rightColumnOffset?: number
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { refs: cardRefs, visible } = useVisibility(steps.length)

  const [rects, setRects] = useState<DOMRect[]>([])
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current
      if (!container) return
      setContainerRect(container.getBoundingClientRect())
      const rs: DOMRect[] = steps.map((_, i) => cardRefs.current[i]?.getBoundingClientRect() ?? new DOMRect())
      setRects(rs)
    }

    requestAnimationFrame(measure)

    const onResize = () => requestAnimationFrame(measure)
    window.addEventListener("resize", onResize)

    const RO = (window as any).ResizeObserver
    const ro = RO ? new RO(onResize) : null
    if (ro && containerRef.current) ro.observe(containerRef.current)

    return () => {
      window.removeEventListener("resize", onResize)
      ro?.disconnect?.()
    }
  }, [steps.length])

  const connectors: Connector[] = useMemo(() => {
    if (!containerRect || rects.length < 2) return []

    const cs: Connector[] = []
    for (let i = 0; i < rects.length - 1; i++) {
      const from = rects[i]
      const to = rects[i + 1]
      if (!from?.width || !to?.width) continue

      const isFromLeft = i % 2 === 0
      const fromX = isFromLeft ? from.right - containerRect.left : from.left - containerRect.left
      const toX = isFromLeft ? to.left - containerRect.left : to.right - containerRect.left

      // Adjust anchors slightly for better curve alignment (tweak if needed)
      const FROM_ANCHOR = 0.7
      const TO_ANCHOR = 0.3

      const fromY = from.top - containerRect.top + from.height * FROM_ANCHOR
      const toY = to.top - containerRect.top + to.height * TO_ANCHOR

      const dx = Math.abs(toX - fromX)
      const dy = Math.abs(toY - fromY)

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
        >
          {/* Connectors */}
          <svg
            className="pointer-events-none absolute inset-0 hidden md:block"
            width="100%"
            height="100%"
            viewBox={`0 0 ${containerRect?.width ?? 0} ${containerRect?.height ?? 0}`}
            preserveAspectRatio="none"
          >
            <defs>
              <marker id="arrow-gray-200" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
                <path d="M0,0 L0,14 L14,7 z" fill="#e5e7eb" />
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
                    stroke="#e5e7eb"
                    strokeWidth={2}
                    markerEnd="url(#arrow-gray-200)"
                  />
                </g>
              )
            })}
          </svg>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20"> {/* increased gap-y to 20 (5rem) */}
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              const initialShift = isLeft ? "-translate-x-16" : "translate-x-16"
              const alignClass = isLeft ? "md:justify-self-start" : "md:justify-self-end"
              // Use inline style to apply vertical offset for right column cards
              const verticalOffset = !isLeft ? rightColumnOffset : 0
              return (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  data-index={i}
                  className={["relative", "flex", alignClass].join(" ")}
                  style={{ marginTop: verticalOffset }} // this fixes dynamic margin issue
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
                    ].join(" ")}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 ${step.iconBg} rounded-xl p-2.5`}>
                        <step.Icon className={`h-6 w-6 ${step.iconFg}`} aria-hidden="true" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg font-semibold leading-6 text-zinc-900">{step.title}</h3>
                        <p className="text-sm leading-6 text-zinc-600">{step.description}</p>
                      </div>
                    </div>
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


