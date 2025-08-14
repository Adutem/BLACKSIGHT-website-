import React from "react"
import {   FaGithub, FaDiscord, FaTelegram, FaFacebook,  } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

type Community = {
  name: string
  href: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

type JoinCommunitiesProps = {
  title?: string
  subtitle?: string
  communities?: Community[]
  className?: string
  compact?: boolean // NEW: tighter vertical spacing
}

export default function JoinCommunities({
  title = "Join us Our Communities",
  subtitle = "Get First hand updates from our communities",
  communities = DEFAULT_COMMUNITIES,
  className = "",
  compact = true, // default to compact spacing on home page
}: JoinCommunitiesProps) {
  const padY = compact ? "py-4 sm:py-5" : "py-6"

  return (
    <section className={`w-full bg-white ${className}`}>
      <div className={`mx-auto max-w-4xl px-4 sm:px-6 ${padY}`}>
        <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
          {/* Left: Heading + subtext */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-1 text-[12px] sm:text-sm text-gray-500">
              {subtitle}
            </p>
          </div>

          {/* Right: Icons row */}
          <ul className="flex items-end gap-3 sm:gap-4">
            {communities.map(({ name, href, Icon }) => (
              <li key={name} className="text-center">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex flex-col items-center gap-1.5 outline-none"
                  aria-label={name}
                >
                  <span
                    className={[
                      "grid place-items-center rounded-full",
                      compact ? "h-8 w-8 sm:h-9 sm:w-9" : "h-9 w-9 sm:h-10 sm:w-10",
                      "bg-white text-blue-600  ring-blue-500",
                      "transition-transform duration-200 group-hover:scale-105 group-active:scale-95",
                      "shadow-sm",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

const DEFAULT_COMMUNITIES: Community[] = [
  { name: "Telegram", href: "#", Icon: FaTelegram }, 
  { name: "X",        href: "#", Icon: RiTwitterXFill }, // fallback to Twitter glyph for X
  { name: "Github",   href: "#", Icon: FaGithub },
  { name: "Facebook", href: "#", Icon: FaFacebook },
  { name: "Discord",  href: "#", Icon: FaDiscord },
]

