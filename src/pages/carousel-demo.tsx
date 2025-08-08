import React from "react"
import FaqCarousel from "../components/faq-carousel"

export default function FaqDemo() {
  return (
    <main className="min-h-screen bg-white">
      <FaqCarousel autoPlay={false} />
    </main>
  )
}
