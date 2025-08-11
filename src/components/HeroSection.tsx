"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

type HeroSectionProps = {
  // Pass your PNG like: "/assets/hero-bg.png"
  backgroundImage?: string
  // Optional SVG layer. Leave undefined if you only want the PNG.
  backgroundSvg?: string | undefined
  backgroundFit?: "cover" | "contain"
  backgroundPosition?: string
  // No overlay by default (no glow)
  overlayClassName?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = "/assets/background.png", // default PNG
  backgroundSvg = undefined, // prevent covering PNG by default
  backgroundFit = "cover",
  backgroundPosition = "center",
  overlayClassName = "",
}) => {
  // Electric Blue accent
  const ELECTRIC = "#488ff8"

  // Logos split into two rows
  const row1 = [
    { src: "./assets/stripe.png", alt: "Stripe" },
    { src: "./assets/calendly.png", alt: "Calendly" },
    { src: "./assets/airtable.png", alt: "Airtable" },
    { src: "./assets/Clickup.png", alt: "ClickUp" },
    { src: "./assets/calendar.png", alt: "Calendar" },
   
  ]

   
    
  const row2 = [
     { src: "./assets/Whatsapp.png", alt: "WhatsApp" },
    { src: "./assets/meta.png", alt: "Meta" },
    { src: "./assets/twilio.png", alt: "Twilio" },
    { src: "./assets/calcom.png", alt: "Cal.com" },
    
  ]

  // Typewriter content
  const L1 = "The Leading Customer"
  const L2_PREFIX = "Service "
  const L2_HIGHLIGHT = "AI Platform"
  const L3 = "for Creators"

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  )

  const [typed1, setTyped1] = useState(0)
  const [typed2, setTyped2] = useState(0) // across prefix + highlight
  const [typed3, setTyped3] = useState(0)
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1)

  useEffect(() => {
    if (reducedMotion) {
      setTyped1(L1.length)
      setTyped2(L2_PREFIX.length + L2_HIGHLIGHT.length)
      setTyped3(L3.length)
      setStage(4)
      return
    }

    const speed = 34
    const betweenLinesDelay = 280
    let interval: number | null = null
    let timeout: number | null = null

    const startTyping = () => {
      interval = window.setInterval(() => {
        setStage((current) => {
          if (current === 1) {
            setTyped1((c) => {
              const next = Math.min(L1.length, c + 1)
              if (next === L1.length) {
                if (interval) window.clearInterval(interval)
                timeout = window.setTimeout(() => {
                  setStage(2)
                  startTyping()
                }, betweenLinesDelay)
              }
              return next
            })
          } else if (current === 2) {
            const total2 = L2_PREFIX.length + L2_HIGHLIGHT.length
            setTyped2((c) => {
              const next = Math.min(total2, c + 1)
              if (next === total2) {
                if (interval) window.clearInterval(interval)
                timeout = window.setTimeout(() => {
                  setStage(3)
                  startTyping()
                }, betweenLinesDelay)
              }
              return next
            })
          } else if (current === 3) {
            setTyped3((c) => {
              const next = Math.min(L3.length, c + 1)
              if (next === L3.length) {
                if (interval) window.clearInterval(interval)
                setStage(4)
              }
              return next
            })
          }
          return current
        })
      }, speed)
    }

    startTyping()
    return () => {
      if (interval) window.clearInterval(interval)
      if (timeout) window.clearTimeout(timeout)
    }
  }, [reducedMotion])

  // Derived typed parts for line 2
  const typed2Prefix = Math.min(typed2, L2_PREFIX.length)
  const typed2Highlight = Math.max(0, Math.min(L2_HIGHLIGHT.length, typed2 - L2_PREFIX.length))

  return (
    <section className="relative overflow-hidden">
      {/* Backgrounds */}
      {(backgroundImage || backgroundSvg) && (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          {/* Use an <img> for PNG/JPG to avoid css-url path issues */}
          {backgroundImage ? (
            <img
              src={backgroundImage || "./assets/background.png"}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          ) : null}

          {/* Optional SVG overlay on top of the bitmap (still behind content) */}
          {backgroundSvg ? (
            <img
              src={backgroundSvg || "/placeholder.svg"}
              alt=""
              aria-hidden="true"
              className={[
                "absolute inset-0 h-full w-full select-none",
                backgroundFit === "contain" ? "object-contain" : "object-cover",
              ].join(" ")}
              style={{ objectPosition: backgroundPosition }}
              draggable={false}
            />
          ) : null}

          {/* Overlay only if provided (kept empty by default) */}
          {overlayClassName ? <div className={`absolute inset-0 ${overlayClassName}`} /> : null}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Top copy */}
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-sm sm:text-base font-medium text-gray-700">One Platform, Endless Solutions</h3>

          {/* Headline with typewriter effect */}
          <h1 className="mt-2 text-3xl leading-tight sm:text-6xl sm:leading-[1.05] font-extrabold tracking-tight text-gray-900">
            {/* Line 1 */}
            <span className="block">
              {L1.slice(0, typed1)}
              {stage === 1 && (
                <span className="caret" aria-hidden="true">
                  |
                </span>
              )}
            </span>
            {/* Line 2 */}
            <span className="block">
              <span>{L2_PREFIX.slice(0, typed2Prefix)}</span>
              <span style={{ color: ELECTRIC }}>{L2_HIGHLIGHT.slice(0, typed2Highlight)}</span>
              {stage === 2 && (
                <span className="caret" aria-hidden="true">
                  |
                </span>
              )}
            </span>
            {/* Line 3 */}
            <span className="block" style={{ color: ELECTRIC }}>
              {L3.slice(0, typed3)}
              {stage === 3 && (
                <span className="caret" aria-hidden="true">
                  |
                </span>
              )}
            </span>
          </h1>

          {/* Actions */}
          <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              className="inline-flex items-center justify-center rounded-md px-5 sm:px-6 py-2.5 text-sm sm:text-base font-semibold text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label="Start a free trial"
              style={{ backgroundColor: ELECTRIC, boxShadow: "" }}
              onMouseDown={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.transform = "translateY(1px)"
              }}
              onMouseUp={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"
              }}
            >
              Start Free Trial
            </button>

            <Link to="/form-demo" className="inline-flex">
              <button
                className="inline-flex items-center justify-center rounded-md px-5 sm:px-6 py-2.5 text-sm sm:text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label="Try instant demo"
                style={{ color: ELECTRIC }}
              >
                Try Instant Demo <span className="ml-1">→</span>
              </button>
            </Link>
          </div>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            Join The 500+ Agencies Already using Blacksight
          </p>
        </div>

        {/* Logos strip with continuous, opposite-direction marquee */}
        <div className="mt-3 sm:mt-7" role="region" aria-label="Partner logos">
          <div className="px-4 py-3 sm:px-6 sm:py-4">
            {/* Row 1: continuous left */}
            <div className="marquee overflow-hidden">
              <div className="marquee-track marquee-left">
                {/* group 1 */}
                <div className="marquee-group">
                  {row1.map((logo) => (
                    <img
                      key={`r1a-${logo.alt}`}
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      className="h-6 sm:h-7"
                    />
                  ))}
                </div>
                {/* group 2 (duplicate for seamless loop) */}
                <div className="marquee-group" aria-hidden="true">
                  {row1.map((logo) => (
                    <img
                      key={`r1b-${logo.alt}`}
                      src={logo.src || "/placeholder.svg"}
                      alt=""
                      className="h-6 sm:h-7 opacity-90"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: continuous right */}
            <div className="mt-3 marquee overflow-hidden">
              <div className="marquee-track marquee-right">
                {/* group 1 */}
                <div className="marquee-group">
                  {row2.map((logo) => (
                    <img
                      key={`r2a-${logo.alt}`}
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      className="h-6 sm:h-7"
                    />
                  ))}
                </div>
                {/* group 2 (duplicate) */}
                <div className="marquee-group" aria-hidden="true">
                  {row2.map((logo) => (
                    <img
                      key={`r2b-${logo.alt}`}
                      src={logo.src || "/placeholder.svg"}
                      alt=""
                      className="h-6 sm:h-7 opacity-90"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations and styles */}
      <style>{`
        /* Typewriter caret */
        @keyframes caret-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .caret {
          display: inline-block;
          margin-left: 2px;
          width: 1ch;
          color: ${ELECTRIC};
          animation: caret-blink 1s step-end infinite;
        }

        /* Marquee setup */
        .marquee { --gap-x: 2rem; }
        .marquee-track {
          display: flex;
          width: 200%;
        }
        .marquee-group {
          flex: none;
          min-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--gap-x);
        }

        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(0%); }
          100% { transform: translateX(50%); }
        }

        .marquee-left { animation: marquee-left 18s linear infinite; }
        .marquee-right { animation: marquee-right 18s linear infinite; }

        @media (min-width: 640px) {
          .marquee-left { animation-duration: 16s; }
          .marquee-right { animation-duration: 16s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-left, .marquee-right { animation: none; transform: none; }
        }
      `}</style>
    </section>
  )
}

export default HeroSection
