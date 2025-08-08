import React from "react"
import { HelpCircle, MessageSquareMore, CalendarClock, PiggyBank, Zap } from 'lucide-react'

type Feature = {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const DEFAULT_FEATURES: Feature[] = [
  {
    title: "60% Increase in Customer Interaction",
    description:
      "Nova responds instantly, engages intelligently, and keeps conversations going even while you sleep.",
    icon: MessageSquareMore,
  },
  {
    title: "40+ Hours Saved Monthly",
    description:
      "From automating bookings to handling common questions, Nova frees your team to focus on what truly matters.",
    icon: CalendarClock,
  },
  {
    title: "40% Reduction in Support Costs",
    description:
      "Scale without scaling your team. Nova handles more requests, faster, with zero burnout.",
    icon: PiggyBank,
  },
  {
    title: "2x Boost in Team Productivity",
    description:
      "With repetitive tasks off their plate, your team works smarter, faster, and with better results.",
    icon: Zap,
  },
]

export default function WhyNova({
  title = "Why Business uses Nova AI",
  features = DEFAULT_FEATURES,
  showFaqPill = true,
  faqAnchorId = "faqs",
  compact = true,
}: {
  title?: string
  features?: Feature[]
  showFaqPill?: boolean
  faqAnchorId?: string
  compact?: boolean
}) {
  const padY = compact ? "py-6 sm:py-8" : "py-10 sm:py-14"
  const gridMt = compact ? "mt-6 sm:mt-8" : "mt-8 sm:mt-10"
  const faqMt = compact ? "mt-5 sm:mt-6" : "mt-6 sm:mt-8"

  return (
    <section className="w-full bg-[#f6f9ff]">
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${padY}`}>
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-[26px] font-semibold tracking-tight text-gray-900">
          {title}
        </h2>

        {/* Feature Grid with cross dividers (md+) */}
        <div className={`relative ${gridMt} rounded-3xl bg-white/60 ring-1 ring-blue-100/60 p-4 sm:p-6`}>
          {/* Cross dividers */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-200" />
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 ring-1 ring-blue-200">
                      <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    </div>
                    {/* Dotted halo accent like the reference */}
                    <div className="pointer-events-none absolute -inset-1 rounded-full border-2 border-dashed border-blue-200 opacity-50" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-gray-900">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-gray-700">
                      {f.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQs pill and heading below */}
        <div className={`${faqMt} flex flex-col items-center`}>
          {showFaqPill && (
            <a
              href={`#${faqAnchorId}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-[13px] font-medium text-blue-600 shadow-sm hover:bg-blue-50"
            >
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              FAQs
            </a>
          )}

          <h3
            id={faqAnchorId}
            className="mt-4 text-center text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900"
          >
            Frequently Asked Questions
          </h3>
        </div>
      </div>
    </section>
  )
}
