import React from "react"
import { Battery, Signal, Wifi } from 'lucide-react'

type PhoneMockupProps = {
  children: React.ReactNode
  className?: string
  // Sizes
  width?: number // px width of device frame (default 395)
}

export default function PhoneMockup({
  children,
  className = "",
  width = 395,
}: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ width, aspectRatio: "9 / 18" }}
    >
      {/* Outer frame with subtle purple tone like the reference */}
      <div className="absolute inset-0 rounded-[42px] border-[6px] border-[#432f52] " />

      {/* Inner bezel */}
      <div className="absolute inset-[8px] rounded-[36px] bg-black/85" />

      {/* Screen */}
      <div className="absolute inset-[16px] overflow-hidden rounded-[28px] bg-white">
        {/* Status bar */}
        <div className="absolute left-4 top-3 text-[12px] font-medium text-black/80">
          12:00
        </div>
        <div className="absolute right-4 top-2.5 flex items-center gap-2 text-black/80">
          <Signal className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
          <Battery className="h-4 w-4" />
        </div>

        {/* Notch */}
        <div className="absolute left-1/2 top-2.5 h-7 w-36 -translate-x-1/2 rounded-full bg-black/90 grid place-items-center">
          <span className="h-3 w-3 rounded-full bg-cyan-400/70" />
        </div>

        {/* Dotted background (subtle) */}
        <div className="absolute inset-0 top-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:14px_14px]" />

        {/* Content area */}
        <div className="relative z-10 h-full w-full px-5 pb-6 pt-8">{children}</div>
      </div>
    </div>
  )
}
