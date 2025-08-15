import React from "react"
import { FaGithub, FaDiscord, FaTelegram, FaFacebook } from "react-icons/fa"
import { RiTwitterXFill } from "react-icons/ri"

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
  compact?: boolean
}

export default function JoinCommunities({
  title = "Join Our Communities",
  subtitle = "Get first-hand updates from our communities",
  communities = DEFAULT_COMMUNITIES,
  className = "",
  compact = true,
}: JoinCommunitiesProps) {
  const padY = compact ? "py-2 sm:py-2" : "py-2"

  return (
    <section
      className={`w-full bg-white  flex items-center justify-center ${className}`}
    >
      <div className={`mx-auto max-w-4xl px-4 sm:px-6 w-full ${padY}`}>
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-8 justify-center">
          {/* Left: Heading */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">{subtitle}</p>
          </div>

          {/* Right: Icon row */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {communities.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col items-center gap-1.5 outline-none"
                aria-label={name}
              >
                <span
                  className={[
                    "grid place-items-center rounded-full",
                    compact ? "h-8 w-8 sm:h-9 sm:w-9" : "h-9 w-9 sm:h-10 sm:w-10",
                    "bg-white text-blue-600 ring-1 ring-blue-500",
                    "transition-transform duration-200 group-hover:scale-105 group-active:scale-95",
                    "shadow-sm",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500">{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const DEFAULT_COMMUNITIES: Community[] = [
  { name: "Telegram +", href: "#", Icon: FaTelegram },
  { name: "X +", href: "#", Icon: RiTwitterXFill },
  { name: "Github +", href: "#", Icon: FaGithub },
  { name: "Facebook +", href: "#", Icon: FaFacebook },
  { name: "Discord +", href: "#", Icon: FaDiscord },
]
