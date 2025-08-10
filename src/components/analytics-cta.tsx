import React from "react";

type AnalyticsCtaProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
};

export default function AnalyticsCta({
  title = "Our powerful analytics provides invaluable insights.",
  subtitle = "Join businesses worldwide leveraging Blacksight for intelligent automation.",
  buttonText = "Discover how it Works",
  onClick,
  className = "",
}: AnalyticsCtaProps) {
  return (
    <section className={`w-full bg-white m-0 p-0 ${className}`}> {/* Removed all margins and padding */}
      <div className="mx-auto max-w-5xl px-0 sm:px-0 pb-0"> {/* Removed padding except pb-0 */}
        <h1 className="mx-auto max-w-4xl text-center text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 m-0 p-0"> {/* Increased font size, removed margins */}
          <span>Our powerful analytics</span>
          <br className="hidden sm:block" />
          <span> provides invaluable insights.</span>
        </h1>

        <p className="mt-0 text-center text-base text-gray-600 m-0 p-0"> {/* Removed mt-2, adjusted to mt-0 */}
          {subtitle}
        </p>

        <div className="mt-0 flex justify-center m-0 p-0"> {/* Removed mt-3, adjusted to mt-0 */}
          <button
            type="button"
            onClick={onClick}
            className="rounded-md bg-blue-300 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}