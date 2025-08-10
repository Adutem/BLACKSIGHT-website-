"use client"

import type React from "react"
import { useMemo } from "react"
import { Wifi, Battery, Signal } from 'lucide-react'

export type ScreenRect = {
  topPct: number // distance from top of frame (% of frame height)
  leftPct: number // distance from left of frame (% of frame width)
  widthPct: number // screen width as % of frame width
  heightPct: number // screen height as % of frame height
}

type PhoneFormMockupProps = {
  frameSrc: string // path to your phone mockup (transparent screen area)
  className?: string
  onSubmit?: (data: Record<string, string>) => void

  // Adjust to fit your mock's screen cutout (percentages of the FULL frame)
  screenRect?: ScreenRect

  // How far from the top to render the placeholder status icons (px, relative to full frame)
  statusOffset?: number

  // Make the phone “fixed” in view while the rest scrolls
  fixedInViewport?: boolean

  // Container size: shows 3/4 of the phone. You can adjust height if needed.
  containerHeight?: string // e.g., "75vh" or "520px"

  // Optional max width for the phone (it’s responsive)
  maxWidthPx?: number
}

const DEFAULT_SCREEN: ScreenRect = {
  topPct: 8.5,
  leftPct: 6,
  widthPct: 88,
  heightPct: 83,
}

export const PhoneFormMockup: React.FC<PhoneFormMockupProps> = ({
  frameSrc,
  className,
  onSubmit,
  screenRect = DEFAULT_SCREEN,
  statusOffset = 12,
  fixedInViewport = true,
  containerHeight = "75vh",
  maxWidthPx = 360,
}) => {
  // Container crops the phone to 3/4 height
  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      position: fixedInViewport ? "sticky" : "relative",
      top: fixedInViewport ? "16px" : undefined,
      width: "100%",
      maxWidth: maxWidthPx,
      margin: "0 auto",
      height: containerHeight,
      overflow: "hidden", // crop bottom 1/4
      borderRadius: 16,
    }),
    [fixedInViewport, containerHeight, maxWidthPx],
  )

  // Phone frame image is 133.33% the container height, so only 3/4 is visible
  const phoneFrameStyle = useMemo<React.CSSProperties>(
    () => ({
      width: "100%",
      height: "133.33%",
      display: "block",
      pointerEvents: "none",
      transform: "translateY(0)", // keep top aligned so top 3/4 is visible
      userSelect: "none",
    }),
    [],
  )

  // Screen overlay math: adjust for the 3/4 crop
  // - top gets multiplied by 0.75 (we see only the top 75% of the full phone)
  // - height gets multiplied by 1.333 (so content still fills the full screen cutout)
  const screenStyle = useMemo<React.CSSProperties>(
    () => ({
      position: "absolute",
      top: `${screenRect.topPct * 0.75}%`,
      left: `${screenRect.leftPct}%`,
      width: `${screenRect.widthPct}%`,
      height: `${screenRect.heightPct * 1.333}%`,
      borderRadius: 14,
      overflow: "hidden",
      background: "#ffffff",
      boxShadow: "0 12px 30px -12px rgba(0,0,0,0.25)",
      display: "flex",
      flexDirection: "column",
      zIndex: 1,
    }),
    [screenRect],
  )

  const statusBarStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    top: statusOffset * 0.75, // also scale with 3/4 math
    zIndex: 2,
    pointerEvents: "none",
  }

  const statusInnerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 12px",
    minHeight: 20,
  }

  const timeStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: "#1f2937",
  }

  const iconsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#1f2937",
  }

  const formWrapperStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "18px 16px 14px",
    overflowY: "auto",
    backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
    backgroundSize: "12px 12px",
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: "#1f2937",
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 34,
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.2)",
    outline: "none",
    padding: "0 10px",
    fontSize: 12,
  }

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: 38,
    borderRadius: 10,
    background: "linear-gradient(135deg, rgb(0,191,255), rgb(0,168,230))", // electric blue gradient
    color: "#fff",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 18px -10px rgba(0,191,255,0.45)",
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const payload = Object.fromEntries(data.entries()) as Record<string, string>
    onSubmit?.(payload)
  }

  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className={className} style={containerStyle}>
      {/* 3/4 phone image */}
      <img src={frameSrc || "/placeholder.svg"} alt="Phone mockup" style={phoneFrameStyle} draggable={false} />

      {/* Placeholder status icons on the image (top layer) */}
      <div style={statusBarStyle} aria-hidden="true">
        <div style={statusInnerStyle}>
          <span style={timeStyle}>{currentTime}</span>
          <div style={iconsStyle}>
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>
      </div>

      {/* Screen area fills the visible 3/4; content scrolls if needed */}
      <div style={screenStyle}>
        {/* Optional mini status inside screen if you prefer; comment out if redundant */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1f2937" }}>{currentTime}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#1f2937" }}>
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>

        <div style={formWrapperStyle}>
          <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "#1f2937" }}>{"Get a Live call From Nova AI"}</h2>

          <form onSubmit={onFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: "100%" }}>
            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="email" style={labelStyle}>Email</label>
              <input id="email" name="email" type="email" required style={inputStyle} />
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="firstName" style={labelStyle}>First Name</label>
              <input id="firstName" name="firstName" required style={inputStyle} />
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="lastName" style={labelStyle}>Last Name</label>
              <input id="lastName" name="lastName" style={inputStyle} />
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="company" style={labelStyle}>Company</label>
              <input id="company" name="company" style={inputStyle} />
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="phone" style={labelStyle}>Phone Number</label>
              <input id="phone" name="phone" inputMode="tel" style={inputStyle} />
            </div>

            <div style={{ marginTop: "auto", paddingTop: 6 }}>
              <button type="submit" style={buttonStyle}>{"Send It"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PhoneFormMockup
