import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { UserPlus, BookMarked, Bot, Plug, Boxes, type LucideIcon } from 'lucide-react';

/**
 * AiAssistantSteps
 * - Alternating two-column timeline: left, right, left, right, ...
 * - "Create an Agent" is top left, "Add Knowledge Base" is below it on the right, etc.
 * - Right side boxes are dropped down and far from the left, creating a staggered, spaced timeline.
 * - Curved SVG connectors between cards, connecting the actual centers of the boxes.
 * - Scroll animations: cards slide in from their side; connectors follow.
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
  // Reduce the default gaps for more equal and less excessive spacing
  rightColumnOffset = 36, // px, further reduced for less vertical gap
  rightColumnExtraGap = 0, // px, set to 0 for equal vertical spacing
}: {
  steps?: Step[]
  title?: string
  rightColumnOffset?: number
  rightColumnExtraGap?: number
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { refs: cardRefs, visible } = useVisibility(steps.length)

  const [rects, setRects] = useState<DOMRect[]>([])
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  // --- CONSTANTS for uniform card sizing ---
  const CARD_WIDTH =400; // px, reduced from 560px
  const CARD_HEIGHT = 88; // px, reduced from 140px

  // This offset is used to ensure the arrow head is exactly on the top border of the next card
  // The marker arrow head is about 7px tall, so we subtract 7px from the end Y
  const ARROW_MARKER_HEIGHT = 7; // px, matches markerHeight in SVG marker

  // Measure card and container rects to build connectors
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

  // Build connectors from the side of one card to the top center of the next card
  const connectors: Connector[] = useMemo(() => {
    if (!containerRect || rects.length < 2) return []

    const cs: Connector[] = []
    for (let i = 0; i < rects.length - 1; i++) {
      const from = rects[i]
      const to = rects[i + 1]
      if (!from?.width || !to?.width) continue

      // Determine which side to start from (right for left card, left for right card)
      const isFromLeft = i % 2 === 0
      const isToLeft = (i + 1) % 2 === 0

      // Start point: right center of left card, or left center of right card
      const fromX = isFromLeft
        ? from.left - containerRect.left + from.width // right edge of left card
        : from.left - containerRect.left // left edge of right card
      const fromY = from.top - containerRect.top + from.height / 2

      // End point: top center of next card
      const toX = to.left - containerRect.left + to.width / 2
      const toY = to.top - containerRect.top + ARROW_MARKER_HEIGHT

      // Control points for a nice curve
      // We'll curve out horizontally, then up/down to the top of the next card
      // The horizontal offset is larger for side-to-side, smaller for same-side
      const horizontalCurve = Math.abs(fromX - toX) * 0.6 + 32
      const verticalCurve = Math.abs(fromY - toY) * 0.4 + 18

      let c1x, c1y, c2x, c2y

      if (isFromLeft) {
        // From right edge of left card
        c1x = fromX + horizontalCurve
        c1y = fromY
      } else {
        // From left edge of right card
        c1x = fromX - horizontalCurve
        c1y = fromY
      }

      // The second control point is above the top center of the next card
      c2x = toX
      c2y = toY - verticalCurve

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

  // For alternating left/right, we want:
  // 0: left, 1: right, 2: left, 3: right, ...
  // So: isLeft = i % 2 === 0

  // We'll use absolute positioning for md+ screens to allow equal vertical gaps between left/right
  // On mobile, fallback to a single column

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
          {title}
        </h2>

        <div
          ref={containerRef}
          className="relative mt-7 sm:mt-8"
          aria-label="AI Assistant setup steps"
          style={{ paddingBottom: 48 }}
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
              {/* 
                Arrow head marker for connector lines.
                Reduced markerWidth/markerHeight and refX/refY for a smaller, more proportional arrow head.
                The path is also smaller and more "fit" to the line.
              */}
              <marker id="arrow-gray-200" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,7 L7,3.5 z" fill="#e5e7eb"></path>
              </marker>
            </defs>
            {connectors.map((c, idx) => {
              const active = visible[c.animateWithIndex]
              const opacity = active ? 1 : 0
              return (
                <g
                  key={idx}
                  style={{
                    transition: "opacity 700ms ease-out",
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
          {/* On mobile: single column, on md+: absolute staggered two-column */}
          <div className="relative">
            {/* Mobile: single column */}
            <div className="md:hidden grid grid-cols-1 gap-y-4">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={el => { cardRefs.current[i] = el; }}
                  data-index={i}
                  className="relative flex w-full"
                  style={{
                    width: "100%",
                    maxWidth: CARD_WIDTH,
                    minWidth: 0,
                    height: CARD_HEIGHT,
                  }}
                >
                  <div
                    className={[
                      "w-full h-full",
                      "rounded-xl border border-dashed border-zinc-200 bg-white",
                      "shadow-sm shadow-zinc-900/5",
                      "px-4 py-3 sm:px-5 sm:py-4",
                      "transition-all duration-700 ease-out will-change-transform",
                      "transform",
                      visible[i] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-10",
                      "flex flex-col justify-center",
                    ].join(" ")}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 ${step.iconBg} rounded-lg p-2`}>
                        <step.Icon className={`h-5 w-5 ${step.iconFg}`} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-zinc-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop: staggered two-column with equal vertical gap between left/right */}
            <div
              className="hidden md:block"
              style={{
                position: "relative",
                // ----
                // This is where we set the vertical gap between the boxes on desktop.
                // The vertical gap is controlled by rightColumnOffset (default 36px).
                // Each card's top = i * (CARD_HEIGHT + rightColumnOffset)
                // ----
                minHeight: steps.length * (CARD_HEIGHT + rightColumnOffset) - rightColumnOffset + 24,
              }}
            >
              {steps.map((step, i) => {
                const isLeft = i % 2 === 0
                // For equal vertical gaps, both left and right cards are spaced evenly
                // Each card's top = i * (CARD_HEIGHT + rightColumnOffset)
                // ----
                // This is where we set the vertical gap between the boxes:
                // The value of rightColumnOffset determines the vertical space between each card.
                // ----
                const top = i * (CARD_HEIGHT + rightColumnOffset)
                const left = isLeft ? 0 : `calc(100% - ${CARD_WIDTH}px)`
                const initialShift = isLeft ? "-translate-x-10" : "translate-x-10"

                return (
                  <div
                    key={i}
                    ref={el => { cardRefs.current[i] = el; }}
                    data-index={i}
                    className="absolute"
                    style={{
                      top,
                      left,
                      width: CARD_WIDTH,
                      height: CARD_HEIGHT,
                      minWidth: 0,
                      zIndex: 2,
                    }}
                  >
                    <div
                      className={[
                        "w-full h-full",
                        "rounded-xl border border-dashed border-zinc-200 bg-white",
                        "shadow-sm shadow-zinc-900/5",
                        "px-4 py-3 sm:px-5 sm:py-4",
                        "transition-all duration-700 ease-out will-change-transform",
                        "transform",
                        visible[i] ? "opacity-100 translate-x-0" : `opacity-0 ${initialShift}`,
                        "flex flex-col justify-center",
                      ].join(" ")}
                      aria-label={`Step ${i + 1}: ${step.title}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 ${step.iconBg} rounded-lg p-2`}>
                          <step.Icon className={`h-5 w-5 ${step.iconFg}`} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm text-zinc-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      {/* Removed the decorative small down arrow at the bottom center of the card */}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
