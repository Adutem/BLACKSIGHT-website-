import React from "react"
import { Link } from "react-router-dom"

type HeroSectionProps = {
  // Path to your background image in the project (e.g., "/assets/hero-bg.jpg")
  backgroundImage?: string
  // Optional overlay to improve text legibility over the image
  overlayClassName?: string // e.g., "bg-white/70" or "bg-black/20"
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = "./assets/background.png", // update to your actual asset path
  overlayClassName = "bg-white/70",        // soft wash for readability
}) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image as CSS background to avoid z-index issues */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div
            className="h-full w-full bg-center bg-cover"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Optional overlay for contrast (tweak/remove as needed) */}
          <div className={`absolute inset-0 ${overlayClassName}`} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Top copy */}
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-sm sm:text-base font-medium text-gray-700">
            One Platform, Endless Solutions
          </h3>

          <h1 className="mt-2 text-3xl leading-tight sm:text-6xl sm:leading-[1.05] font-extrabold tracking-tight text-gray-900">
            <span className="block">The Leading Customer</span>
            <span className="block">Service <span className="text-blue-600">AI Platform</span></span>
            <span className="block"><span className="text-blue-600">for Creators</span></span>
          </h1>

          {/* Actions */}
          <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 sm:px-6 py-2.5 text-sm sm:text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Start a free trial"
            >
              Start Free Trial
            </button>

            <Link to="/form-demo" className="inline-flex">
              <button
                className="inline-flex items-center justify-center rounded-md px-5 sm:px-6 py-2.5 text-sm sm:text-base font-semibold text-blue-600 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Try instant demo"
              >
                Try Instant Demo <span className="ml-1">→</span>
              </button>
            </Link>
          </div>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            Join The 500+ Agencies Already using Blacksight
          </p>
        </div>

        {/* Logos strip (card) */}
        <div
          className="mt-5 sm:mt-7 rounded-xl border border-blue-200 bg-white/80 shadow-sm backdrop-blur-[2px]"
          role="region"
          aria-label="Partner logos"
        >
          {/* Animated inner container (gentle side-to-side) */}
          <div className="pan-x">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 py-3 sm:px-6 sm:py-4">
              {/* Row 1 */}
              <img src="/assets/Whatsapp.png" alt="WhatsApp" className="h-6 sm:h-7" />
              <img src="/assets/meta.png" alt="Meta" className="h-6 sm:h-7" />
              <img src="/assets/twilio.png" alt="Twilio" className="h-6 sm:h-7" />
              <img src="/assets/calcom.png" alt="Cal.com" className="h-6 sm:h-7" />
              
              {/* Row 2 */}
              <img src="/assets/calendly.png" alt="Calendly" className="h-6 sm:h-7" />
              <img src="/assets/airtable.png" alt="Airtable" className="h-6 sm:h-7" />
              <img src="/assets/Clickup.png" alt="ClickUp" className="h-6 sm:h-7" />
              <img src="/assets/calendar.png" alt="Calendar" className="h-8 sm:h-10" />
              <img src="/assets/stripe.png" alt="Stripe" className="h-6 sm:h-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Animation for the logos container */}
      <style>{`
        @keyframes gentle-pan-x {
          0%   { transform: translateX(-6px); }
          50%  { transform: translateX(6px); }
          100% { transform: translateX(-6px); }
        }
        .pan-x {
          animation: gentle-pan-x 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pan-x { animation: none; }
        }
      `}</style>
    </section>
  )
}

export default HeroSection
