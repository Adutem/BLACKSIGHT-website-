"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import Marquee from "react-fast-marquee"
import { Link } from "react-router-dom"
import { TypeAnimation } from 'react-type-animation';

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

   
    
  const aiRef = useRef<HTMLSpanElement>(null);

  
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

  const speed = 45; // slower typing
  const betweenLinesDelay = 500; // small pause between lines

  
  const Caret = () => <span className="caret" aria-hidden="true">|</span>;

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
      <div className="relative z-10 mx-auto  px-4 sm:px-6 py-8 sm:py-12">
        {/* Top copy */}
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-sm sm:text-base font-medium text-gray-700">One Platform, Endless Solutions</h3>

          {/* Headline with typewriter effect */}
         {/* Headline with typewriter effect */}
         <span className="gap-4  mt-4 text-4xl sm:text-6xl lg:text-7xl leading-snug sm:leading-[1.2] font-extrabold text-gray-900">
    
  {/* L1 */}
  <TypeAnimation
    sequence={['The Leading Customer']}
    speed={50}
    wrapper="h1"
    cursor={false} // disable cursor
    style={{ display: 'block' }}
    repeat={0}
    className="mt-4 text-4xl sm:text-6xl lg:text-7xl leading-snug sm:leading-[1.2] font-extrabold text-gray-900"
  />

  {/* L2 */}
  {/* <div className="text-4xl sm:text-6xl lg:text-7xl leading-snug sm:leading-[1.2] font-extrabold text-gray-900">
  <TypeAnimation
    sequence={['Service ']}
    speed={50}
    wrapper="span"
    cursor={false}
    repeat={0}
  />
  <TypeAnimation
    sequence={['AI Platform']}
    speed={50}
    wrapper="span"
    cursor={false}
    repeat={0}
    style={{ color: ELECTRIC }}
    // className="text-primary-1"
  />
</div> */}

<div className="text-4xl mt-4 sm:text-6xl lg:text-7xl leading-snug sm:leading-[1.2] font-extrabold text-gray-900">
      <TypeAnimation
        sequence={[
          "Service ",
          () => {
            if (aiRef.current) {
              aiRef.current.style.visibility = "visible";
            }
          }
        ]}
        speed={50}
        wrapper="span"
        cursor={false}
        repeat={0}
      />

      <span
        ref={aiRef}
        style={{ visibility: "hidden" }}
        className="text-primary-1"
      >
        <TypeAnimation
          sequence={["AI Platform"]}
          speed={50}
          wrapper="span"
          cursor={false}
    style={{ color: ELECTRIC }}
    repeat={0}
        />
      </span>
    </div>

  {/* L3 */}
<div className="text-4xl mt-4 sm:text-6xl lg:text-7xl leading-snug sm:leading-[1.2] font-extrabold text-gray-900">
  
  <TypeAnimation
    sequence={['for Creators']}
    speed={50}
    wrapper="span"
    cursor={false}
    repeat={0}
    style={{ color: ELECTRIC }}
    className="mt-4"
  />

  </div>
</span>



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

          <div className="space-y-6">
      {/* Row 1 - scroll left */}
      <Marquee
        gradient={false}
        speed={40} // Adjust scroll speed
        pauseOnHover={true}
        direction="left"
      >
        {row1.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src || "/placeholder.svg"}
            alt={logo.alt}
            className="mx-8 h-6 sm:h-7"
          />
        ))}
      </Marquee>

      {/* Row 2 - scroll right */}
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        direction="right"
      >
        {row2.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src || "/placeholder.svg"}
            alt={logo.alt}
            className="mx-8 h-6 sm:h-7"
          />
        ))}
      </Marquee>
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
