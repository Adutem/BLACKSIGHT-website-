import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"

type Item = {
  title: string
  body: string
}

type FaqCarouselProps = {
  items?: Item[]
  heading?: string
  pillLabel?: string
  showHeader?: boolean
  showPill?: boolean
}

const DEFAULT_ITEMS: Item[] = [
  {
    title: "What is Blacksight?",
    body:
      "Blacksight AI propels businesses forward through smart AI automation for customer support and more. Create human-like AI agents that answer questions, book appointments, automate inbound and outbound issues, with customer service resolution and mitigation automation, around the clock.",
  },
  {
    title: "Do I need any technical skills to use Blacksight?",
    body:
      "Not at all. Blacksight is designed with simplicity in mind. Whether you're a marketer, business owner, or project manager, you can get started with zero coding experience.",
  },
  {
    title: "Is there a free trial available?",
    body:
      "Yes, we offer a 14-day free trial so you can explore all of Blacksight’s features before committing. No credit card required.",
  },
  {
    title: "How secure is Blacksight?",
    body:
      "We prioritize security using industry best practices for data in transit and at rest. We safeguard your information and ensure compliance at every step.",
  },
]

export default function FaqCarousel({
  items = DEFAULT_ITEMS,
  heading = "Frequently Asked Questions",
  pillLabel = "FAQs",
  showHeader = true,
  showPill = true,
}: FaqCarouselProps) {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 4, spacing: 16 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 640px)": { slides: { perView: 1, spacing: 8 } },
    },
  })

  return (
    <section className="w-full bg-[#f6f9ff] py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeader && (
          <div className="mb-4 text-center">
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

        <div className="relative">
          {/* Prev Button */}
          <button
            aria-label="Previous"
            onClick={() => slider.current?.prev()}
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md ring-1 ring-gray-200 hover:bg-white sm:inline-flex"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          {/* Slider */}
          <div ref={sliderRef} className="keen-slider">
            {items.map((item, i) => (
              <div
                key={i}
                className="keen-slider__slide p-2 sm:p-3"
              >
                <div className="h-full rounded-2xl bg-white border border-gray-200 shadow-[0_8px_24px_rgba(2,6,23,0.04)] p-5 sm:p-6">
                  <h3 className="text-center text-[17px] sm:text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-gray-700">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            aria-label="Next"
            onClick={() => slider.current?.next()}
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md ring-1 ring-gray-200 hover:bg-white sm:inline-flex"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  )
}
