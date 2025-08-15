import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { UserPlus, BookMarked, Bot, Plug, Boxes, type LucideIcon } from 'lucide-react';

// --- Types and Constants ---
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

// --- Hooks ---
function useVisibility(count: number, threshold = 0.25) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<boolean[]>(Array(count).fill(false))

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLDivElement[]
    if (!elements.length) return

    const observer = new window.IntersectionObserver(
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

// --- Utility: useMediaQuery ---
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" ? window.matchMedia(query).matches : false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
    // eslint-disable-next-line
  }, [query]);

  return matches;
}

// --- Mobile Steps Component ---
function MobileSteps({
  steps,
  cardRefs,
  // visible,
}: {
  steps: Step[]
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  // visible: boolean[]
}) {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      {steps.map((step, i) => (
        <div
          key={i}
          ref={el => { cardRefs.current[i] = el; }}
          data-index={i}
          className="flex w-full"
          style={{
            width: "100%",
            minWidth: 0,
          }}
        >
          <div
            className={[
              "w-full",
              "rounded-xl border border-dashed border-zinc-200 bg-white",
              "shadow-sm shadow-zinc-900/5",
              "px-4 py-3",
              "transition-all duration-700 ease-out will-change-transform",
              "transform",
              // visible[i] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-10",
              "flex flex-col justify-center",
            ].join(" ")}
            aria-label={`Step ${i + 1}: ${step.title}`}
          >
            <div className="flex items-start gap-3">
              <div className={`shrink-0 ${step.iconBg} rounded-lg p-2`}>
                <step.Icon className={`h-5 w-5 ${step.iconFg}`} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-zinc-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-600">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Desktop/Tablet Steps Component ---
type Connector = {
  fromIdx: number
  toIdx: number
  d: string // SVG path data
  animateWithIndex: number
}

function DesktopSteps({
  steps,
  cardRefs,
  visible,
  containerRef,
  rightColumnOffset,
  CARD_WIDTH,
  CARD_HEIGHT,
  ARROW_MARKER_HEIGHT,
}: {
  steps: Step[]
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  visible: boolean[]
  containerRef: React.RefObject<HTMLDivElement>
  rightColumnOffset: number
  CARD_WIDTH: number
  CARD_HEIGHT: number
  ARROW_MARKER_HEIGHT: number
}) {
  const [rects, setRects] = useState<DOMRect[]>([])
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  // Only measure for desktop (md+) to avoid issues on mobile
  useLayoutEffect(() => {
    const isDesktop = () => window.innerWidth >= 768;
    const measure = () => {
      if (!isDesktop()) {
        setContainerRect(null);
        setRects([]);
        return;
      }
      const container = containerRef.current
      if (!container) return
      setContainerRect(container.getBoundingClientRect())
      const rs: DOMRect[] = steps.map((_, i) => cardRefs.current[i]?.getBoundingClientRect() ?? new window.DOMRect())
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
  }, [steps.length, containerRef, cardRefs])

  // Build connectors from the side of one card to the top center of the next card
  const connectors: Connector[] = useMemo(() => {
    if (!containerRect || rects.length < 2) return []

    const cs: Connector[] = []
    for (let i = 0; i < rects.length - 1; i++) {
      const from = rects[i]
      const to = rects[i + 1]
      if (!from?.width || !to?.width) continue

      const isFromLeft = i % 2 === 0

      const fromX = isFromLeft
        ? from.left - containerRect.left + from.width
        : from.left - containerRect.left
      const fromY = from.top - containerRect.top + from.height / 2

      const toX = to.left - containerRect.left + to.width / 2
      const toY = to.top - containerRect.top + ARROW_MARKER_HEIGHT

      const horizontalCurve = Math.abs(fromX - toX) * 0.6 + 32
      const verticalCurve = Math.abs(fromY - toY) * 0.4 + 18

      let c1x, c1y, c2x, c2y

      if (isFromLeft) {
        c1x = fromX + horizontalCurve
        c1y = fromY
      } else {
        c1x = fromX - horizontalCurve
        c1y = fromY
      }

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
  }, [containerRect, rects, ARROW_MARKER_HEIGHT])

  return (
    <div
      ref={containerRef}
      className="relative mt-7 sm:mt-8"
      aria-label="AI Assistant setup steps"
      style={{ paddingBottom: 48 }}
    >
      {/* Curved connectors (md+) */}
      <svg
        className="pointer-events-none absolute inset-0"
        width="100%"
        height="100%"
        viewBox={`0 0 ${containerRect?.width ?? 0} ${containerRect?.height ?? 0}`}
        preserveAspectRatio="none"
      >
        <defs>
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
      <div className="relative">
        <div
          style={{
            position: "relative",
            minHeight: steps.length * (CARD_HEIGHT + rightColumnOffset) - rightColumnOffset + 24,
          }}
        >
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
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
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export default function AiAssistantSteps({
  steps = DEFAULT_STEPS,
  title = "How to use AI Assistant",
  rightColumnOffset = 36,
  rightColumnExtraGap = 0,
}: {
  steps?: Step[]
  title?: string
  rightColumnOffset?: number
  rightColumnExtraGap?: number
}) {
  // Shared refs and visibility for both mobile and desktop
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { refs: cardRefs, visible } = useVisibility(steps.length)

  // Constants for desktop layout
  const CARD_WIDTH = 400; // px
  const CARD_HEIGHT = 88; // px
  const ARROW_MARKER_HEIGHT = 7; // px

  // Responsive: show mobile or desktop/tablet
  const isDesktopOrTablet = useMediaQuery("(min-width: 768px)");

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
          {title}
        </h2>
        <div>
  {/* Mobile version (only visible below md) */}
  <div className="block md:hidden">
    <MobileSteps
      steps={steps}
      cardRefs={cardRefs}
      // visible={visible}
    />
  </div>

  {/* Desktop/tablet version (only visible md and above) */}
  <div className="hidden md:block">
    <DesktopSteps
      steps={steps}
      cardRefs={cardRefs}
      visible={visible}
      containerRef={containerRef as React.RefObject<HTMLDivElement>}
      rightColumnOffset={rightColumnOffset}
      CARD_WIDTH={CARD_WIDTH}
      CARD_HEIGHT={CARD_HEIGHT}
      ARROW_MARKER_HEIGHT={ARROW_MARKER_HEIGHT}
    />
  </div>
</div>

      </div>
    </section>
  )
}
