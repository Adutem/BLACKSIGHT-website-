import React from "react"
import { Battery, PhoneCall, PhoneOff, Signal, Wifi } from 'lucide-react'

type VoicePhoneOverlayProps = {
  src: string
  alt?: string
  className?: string
  statusOffset?: number
  buttonsOffset?: number
  buttonSize?: number
  iconSize?: number
  onAccept?: () => void
  onDecline?: () => void
  children?: React.ReactNode
  statusOnDark?: boolean
}

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

  const handleAccept = () => {
    // Trigger custom accept behavior if provided
    if (onAccept) onAccept()
    // Initiate phone call
    window.location.href = "tel:+14049752632"
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={src || "/assets/phone.svg"}
        alt={alt}
        className="block h-auto w-full select-none pointer-events-none"
        draggable={false}
      />

      {/* Top left time */}
      <div className="absolute left-0" style={{ top: statusOffset }} aria-hidden="true">
        <div className="ml-4 text-[12px] font-medium text-black/80">12:00</div>
      </div>

      {/* Center content */}
      {children && (
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 px-6">
          <div className="flex w-full items-center justify-center">{children}</div>
        </div>
      )}

      {/* Status icons */}
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

      {/* Bottom call buttons */}
      <div className="absolute left-0 right-0" style={{ bottom: buttonsOffset }}>
        <div className="flex items-center justify-center gap-12">
          {/* Accept */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={handleAccept}
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
