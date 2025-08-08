import React from "react"
import { Battery, PhoneCall, PhoneOff, Signal, Wifi } from 'lucide-react'

type VoicePhoneOverlayProps = {
  // Your phone svg/image path or URL
  src: string
  alt?: string
  className?: string
  // Top status icons row offset from the top of the image (in px)
  statusOffset?: number
  // Bottom call buttons offset from the bottom of the image (in px)
  buttonsOffset?: number
  // Size of the round call action buttons
  buttonSize?: number
  // Icon sizes (in px)
  iconSize?: number
  // Click handlers
  onAccept?: () => void
  onDecline?: () => void
  // Optional content centered on the screen area (e.g., "NOVA AI" / "Connecting…")
  children?: React.ReactNode
  // If your phone SVG has a dark screen, flip status icon color to white
  statusOnDark?: boolean
}

/**
 * VoicePhoneOverlay
 * - Renders your phone SVG and overlays status icons (Signal/Wifi/Battery) at the top
 *   and Accept/Decline call buttons at the bottom.
 * - Positions are adjustable via props to fit your specific SVG.
 *
 * Usage:
 *  <VoicePhoneOverlay
 *    src="/images/phone.svg"
 *    onAccept={() => console.log('accept')}
 *    onDecline={() => console.log('decline')}
 *  >
 *    <div className="text-center">
 *      <h4 className="text-2xl font-extrabold text-black">NOVA AI</h4>
 *      <p className="text-gray-600">Connecting …</p>
 *    </div>
 *  </VoicePhoneOverlay>
 */
export default function VoicePhoneOverlay({
  src,
  alt = "Phone",
  className = "",
  statusOffset = 18,
  buttonsOffset = 28,
  buttonSize = 56,
  iconSize = 20,
  onAccept,
  onDecline,
  children,
  statusOnDark = false,
}: VoicePhoneOverlayProps) {
  const statusColor = statusOnDark ? "text-white/90" : "text-black/80"

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Your phone SVG/Image */}
      <img
        src={src || "/assets/phone.svg"}
        alt={alt}
        className="block h-auto w-full select-none pointer-events-none"
        draggable={false}
      />

      {/* Dotted screen overlay */}
      <div className="absolute pointer-events-none" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        {/* Your dotted screen overlay code here */}
      </div>

      {/* Time (top-left) to match reference */}
      <div
        className="absolute left-0"
        style={{ top: statusOffset }}
        aria-hidden="true"
      >
        <div className="ml-4 text-[12px] font-medium text-black/80">
          12:00
        </div>
      </div>

      {/* Center content (optional) */}
      {children && (
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 px-6">
          <div className="flex w-full items-center justify-center">{children}</div>
        </div>
      )}

      {/* Status icons (top-right) */}
      <div
        className={`absolute left-0 right-0 ${statusColor}`}
        style={{ top: statusOffset }}
        aria-hidden="true"
      >
        <div className="mx-4 flex items-center justify-end gap-2">
          <Signal style={{ width: iconSize, height: iconSize }} />
          <Wifi style={{ width: iconSize, height: iconSize }} />
          <Battery style={{ width: iconSize, height: iconSize }} />
        </div>
      </div>

      {/* Bottom call action buttons */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: buttonsOffset }}
      >
        <div className="flex items-center justify-center gap-12">
          {/* Accept */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={onAccept}
              className="grid place-items-center rounded-full bg-green-500 text-white shadow hover:bg-green-600 active:bg-green-600 transition-colors"
              style={{ width: buttonSize, height: buttonSize }}
              aria-label="Accept"
            >
              <PhoneCall style={{ width: buttonSize * 0.45, height: buttonSize * 0.45 }} />
            </button>
            <span className="text-xs text-gray-700">Accept</span>
          </div>

          {/* Decline */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={onDecline}
              className="grid place-items-center rounded-full bg-red-500 text-white shadow hover:bg-red-600 active:bg-red-600 transition-colors"
              style={{ width: buttonSize, height: buttonSize }}
              aria-label="Decline"
            >
              <PhoneOff style={{ width: buttonSize * 0.45, height: buttonSize * 0.45 }} />
            </button>
            <span className="text-xs text-gray-700">Ignore</span>
          </div>
        </div>
      </div>
    </div>
  )
}
