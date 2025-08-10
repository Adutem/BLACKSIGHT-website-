import React from "react";
import { FaComments, FaClock, FaPiggyBank, FaBolt } from 'react-icons/fa';

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const DEFAULT_FEATURES: Feature[] = [
  {
    title: "60% Increase in Customer Interaction",
    description:
      "Nova responds instantly, engages intelligently, and keeps conversations going even while you sleep.",
    icon: FaComments,
  },
  {
    title: "40+ Hours Saved Monthly",
    description:
      "From automating bookings to handling common questions, Nova frees your team to focus on what truly matters.",
    icon: FaClock,
  },
  {
    title: "40% Reduction in Support Costs",
    description:
      "Scale without scaling your team. Nova handles more requests, faster, with zero burnout.",
    icon: FaPiggyBank,
  },
  {
    title: "2x Boost in Team Productivity",
    description:
      "With repetitive tasks off their plate, your team works smarter, faster, and with better results.",
    icon: FaBolt,
  },
];

export default function WhyNova({
  title = "Why Business uses Nova AI",
  features = DEFAULT_FEATURES,
  showFaqPill = true,
  faqAnchorId = "faqs",
  compact = true,
  ctaTitle = "Our powerful analytics provides invaluable insights.",
  ctaSubtitle = "Join businesses worldwide leveraging Blacksight for intelligent automation.",
  ctaButtonText = "Discover how it Works",
  onClick,
  className = "",
}: {
  title?: string;
  features?: Feature[];
  showFaqPill?: boolean;
  faqAnchorId?: string;
  compact?: boolean;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  onClick?: () => void;
  className?: string;
}) {
  const padY = compact ? "py-6 sm:py-8" : "py-10 sm:py-14";
  const gridMt = compact ? "mt-6 sm:mt-8" : "mt-8 sm:mt-10";
  const faqMt = compact ? "mt-5 sm:mt-6" : "mt-6 sm:mt-8";

  return (
    <section className={`w-full bg-[#ffffff] my-6 ${className}`}> {/* Kept my-6 (24px) */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-0">
        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mt-0 mb-3">
          {title}
        </h2>

        {/* Feature Grid with cross dividers (md+) */}
        <div className="relative mt-3 rounded-3xl bg-white/60 p-2 sm:p-3">
          {/* Cross dividers */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-50 ring-1 ring-blue-200">
                      <Icon className="h-4 w-4 text-blue-600" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-normal text-gray-700">
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytics CTA */}
        <h1 className="mx-auto max-w-4xl text-center text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mt-8"> {/* Increased mt-6 to mt-8 (32px) */}
          <span>Our powerful analytics</span>
          <br className="hidden sm:block" />
          <span> provides invaluable insights.</span>
        </h1>

        <p className="mt-3 text-center text-base text-gray-600">
          {ctaSubtitle}
        </p>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onClick}
            className="rounded-md bg-blue-400 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label={ctaButtonText}
          >
            {ctaButtonText}
          </button>
        </div>
      </div>
    </section>
  );
}