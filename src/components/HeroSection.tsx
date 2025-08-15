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

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  )

  
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
         <div className="text-center px-4">
  {/* Line 1 */}
  <h1 className="mt-4 text-3xl sm:text-5xl lg:text-7xl leading-tight sm:leading-snug font-extrabold text-gray-900">
    The Leading Customer
  </h1>

  {/* Line 2 */}
  <h1 className="mt-2 sm:mt-0 text-3xl sm:text-5xl lg:text-7xl leading-tight sm:leading-snug font-extrabold text-gray-900 flex flex-wrap justify-center">
    <span className="text-primary-1">Service</span>
    <span className="inline-block">&nbsp;</span>
    <TypeAnimation
      sequence={["AI Platform"]}
      speed={50}
      wrapper="span"
      cursor={false}
      style={{ color: ELECTRIC }}
      repeat={1}
    />
  </h1>

  {/* Line 3 */}
  <h2 className="mt-2 sm:mt-0 text-2xl sm:text-4xl lg:text-6xl leading-tight sm:leading-snug font-extrabold">
    <TypeAnimation
      sequence={["for Creators"]}
      speed={50}
      wrapper="span"
      cursor={false}
      repeat={0}
      style={{ color: ELECTRIC }}
    />
  </h2>
</div>



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
        <div
  className="flex items-center justify-center w-full"
  role="region"
  aria-label="Partner logos"
>
  <div className="sm:px-20 sm:py-3 px-0 py-0 sm:w-[70vw] w-full">
    <div className="space-y-6 items-center justify-center">
      {/* Row 1 - scroll left */}
      <Marquee
        gradient={false}
        speed={90}
        pauseOnHover={true}
        direction="left"
      >
        {row1.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src || "/placeholder.svg"}
            alt={logo.alt}
            className="mx-8 h-8 sm:h-7"
          />
        ))}
      </Marquee>

      {/* Row 2 - scroll right */}
      <Marquee
        gradient={false}
        speed={90}
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

    </section>
  )
}

export default HeroSection
