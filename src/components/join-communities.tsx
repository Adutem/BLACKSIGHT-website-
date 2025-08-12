import React from 'react';
import { FaFacebookF, FaGithub, FaDiscord, FaTelegram } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

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
}

const DEFAULT_COMMUNITIES: Community[] = [
  { name: "Telegram", href: "#", Icon: FaTelegram },
  { name: "X", href: "#", Icon: RiTwitterXFill },
  { name: "Github", href: "#", Icon: FaGithub },
  { name: "Facebook", href: "#", Icon: FaFacebookF },
  { name: "Discord", href: "#", Icon: FaDiscord },
]

export default function JoinCommunities({
  title = "Join our Communities",
  subtitle = "Get First hand updates from our communities",
  communities = DEFAULT_COMMUNITIES,
  className = "",
}: JoinCommunitiesProps) {
  return (
    <section className={`w-full bg-white ${className}`}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-8">
        <div className="flex flex-col items-center justify-between gap-2 sm:gap-4 md:flex-row md:items-center">
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
          <ul className="flex items-left gap-4 sm:gap-6 ">
            {communities.map(({ name, href, Icon }) => (
              <li key={name} className="text-center">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1 outline-none"
                  aria-label={name}
                >
                  <span
                    className={[
                      "grid place-items-center rounded-full",
                      "h-9 w-9 sm:h-10 sm:w-10",
                      "bg-electric-blue-100 text-electric-blue-500 ring-1 ring-inset ring-electric-blue-200",
                      "transition-transform duration-200 group-hover:scale-105 group-active:scale-95",
                      "shadow-sm",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 " />
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