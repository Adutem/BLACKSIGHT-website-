import React from "react"
import AnalyticsCta from "../components/analytics-cta"

export default function AnalyticsCtaDemo() {
  return (
    <main className="min-h-screen bg-white">
      <AnalyticsCta onClick={() => alert("Show how it works")} />
    </main>
  )
}
