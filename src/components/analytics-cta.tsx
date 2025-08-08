import React from "react"

type AnalyticsCtaProps = {
  title?: string
  subtitle?: string
  buttonText?: string
  onClick?: () => void
  className?: string
}

export default function AnalyticsCta({
  title = "Our powerful analytics provides invaluable insights.",
  subtitle = "Join businesses worldwide leveraging Blacksight for intelligent automation.",
  buttonText = "Discover how it Works",
  onClick,
  className = "",
}: AnalyticsCtaProps) {
  return (
    <section className={`w-full bg-white ${className}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="mx-auto max-w-4xl text-center text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          {/* Force a natural line break similar to the reference */}
          <span>Our powerful analytics</span>
          <br className="hidden sm:block" />
          <span> provides invaluable insights.</span>
        </h1>

        <p className="mt-3 text-center text-sm sm:text-base text-gray-600">
          {subtitle}
        </p>

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onClick}
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}
