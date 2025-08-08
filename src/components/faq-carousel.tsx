import React, { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react'

type Item = {
  title: string
  body: string
}

type FaqCarouselProps = {
  items?: Item[]
  autoPlay?: boolean
  autoPlayInterval?: number
  // New header controls to match the screenshot
  showHeader?: boolean
  heading?: string
  showPill?: boolean
  pillLabel?: string
}

const DEFAULT_ITEMS: Item[] = [
  {
    title: "What is Blacksight?",
    body:
      "Blacksight AI propels businesses forward through smart AI automation for customer support and more. Create human‑like AI agents that answer questions, book appointments, automate inbound and outbound issues, with customer service resolution and mitigation automation, around the clock.",
  },
  {
    title: "Do I need any technical skills to use Blacksight?",
    body:
      "Not at all. Blacksight is designed with simplicity in mind. Whether you're a marketer, business owner, or project manager, you can get started with zero coding experience.",
  },
  {
    title: "Is there a free trial available?",
    body:
      "Yes, we offer a 14‑day free trial so you can explore all of Blacksight’s features before committing. No credit card required.",
  },
  {
    title: "How secure is Blacksight?",
    body:
      "We prioritize security using industry best practices for data in transit and at rest. We safeguard your information and ensure compliance at every step.",
  },
]

/**
 * FaqCarousel
 * - Plain React + Tailwind slider with 4-card layout on light-blue background.
 * - Adds the “FAQs” pill and “Frequently Asked Questions” heading above, per the screenshot.
 * - Responsive: 1 / 2 / 3 / 4 cards per view at sm/lg/xl breakpoints.
 * - Keyboard, buttons, swipe, and pagination dots.
 */
export default function FaqCarousel({
  items = DEFAULT_ITEMS,
  autoPlay = false,
  autoPlayInterval = 4500,
  showHeader = true,
  heading = "Frequently Asked Questions",
  showPill = true,
  pillLabel = "FAQs",
  compact = true,
}: FaqCarouselProps & { compact?: boolean }) {
  const padY = compact ? "py-4 sm:py-5" : "py-6 sm:py-8"
  const headerMb = compact ? "mb-2 sm:mb-3" : "mb-3 sm:mb-4"
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [index, setIndex] = useState(0)
  const maxIndex = Math.max(0, items.length - slidesPerView)

  // Determine slides per view based on breakpoints
  useEffect(() => {
    const mq = {
      sm: window.matchMedia("(min-width: 640px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
    }
    const update = () => {
      if (mq.xl.matches) setSlidesPerView(4)
      else if (mq.lg.matches) setSlidesPerView(3)
      else if (mq.sm.matches) setSlidesPerView(2)
      else setSlidesPerView(1)
    }
    update()
    const list = [mq.sm, mq.lg, mq.xl]
    list.forEach((m) => m.addEventListener("change", update))
    return () => {
      list.forEach((m) => m.removeEventListener("change", update))
    }
  }, [])

  // Keep index in bounds if slidesPerView changes
  useEffect(() => {
    setIndex((prev) => Math.min(prev, Math.max(0, items.length - slidesPerView)))
  }, [slidesPerView, items.length])

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, autoPlayInterval)
    return () => clearInterval(id)
  }, [autoPlay, autoPlayInterval, maxIndex])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, maxIndex))
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [maxIndex])

  // Swipe/pan support
  const startXRef = useRef<number | null>(null)
  const translateRef = useRef<number>(0)
  const [isDragging, setIsDragging] = useState(false)

  const onPointerDown = (e: React.PointerEvent) => {
    if (!viewportRef.current) return
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    startXRef.current = e.clientX
    setIsDragging(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || startXRef.current == null || !viewportRef.current) return
    const dx = e.clientX - startXRef.current
    translateRef.current = dx
    viewportRef.current.style.setProperty("--drag-x", `${dx}px`)
  }
  const onPointerUp = () => {
    if (!viewportRef.current) return
    setIsDragging(false)
    const dx = translateRef.current
    translateRef.current = 0
    viewportRef.current.style.setProperty("--drag-x", "0px")
    const threshold = 60
    if (dx > threshold) setIndex((i) => Math.max(0, i - 1))
    else if (dx < -threshold) setIndex((i) => Math.min(maxIndex, i + 1))
  }

  const pages = useMemo(() => {
    const pageCount = Math.max(1, Math.ceil(items.length / slidesPerView))
    return Array.from({ length: pageCount }, (_, p) => p)
  }, [items.length, slidesPerView])

  const currentPage = Math.floor(index / slidesPerView)

  return (
    <section className="w-full bg-[#f6f9ff]">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${padY}`}>
        {showHeader && (
          <div className={`${headerMb} text-center`}>
            {showPill && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-[13px] font-medium text-blue-600 shadow-sm">
                <HelpCircle className="h-4 w-4" aria-hidden="true" />
                {pillLabel}
              </span>
            )}
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
              {heading}
            </h2>
          </div>
        )}

        <div
          className="relative rounded-3xl bg-white/40 ring-1 ring-blue-100/60 p-3 sm:p-4"
          aria-label="FAQ carousel"
        >
          {/* Nav buttons (desktop) */}
          <button
            aria-label="Previous"
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md ring-1 ring-gray-200 hover:bg-white sm:inline-flex"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            aria-label="Next"
            onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md ring-1 ring-gray-200 hover:bg-white sm:inline-flex"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Viewport */}
          <div
            ref={viewportRef}
            className="overflow-hidden"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Track */}
            <div
              className="flex will-change-transform transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(${(-index * 100) / slidesPerView}% + var(--drag-x, 0px)))`,
              }}
            >
              {items.map((item, i) => (
                <article
                  key={i}
                  className="w-full px-2 sm:px-3"
                  style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                >
                  <div className="h-full rounded-2xl bg-white border border-gray-200 shadow-[0_8px_24px_rgba(2,6,23,0.04)] p-5 sm:p-6">
                    <h3 className="text-center text-[17px] sm:text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-gray-700">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {pages.map((p) => (
              <button
                key={p}
                aria-label={`Go to slide ${p + 1}`}
                className={[
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  p === currentPage ? "bg-blue-500" : "bg-gray-300",
                ].join(" ")}
                onClick={() => setIndex(Math.min(p * slidesPerView, maxIndex))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
