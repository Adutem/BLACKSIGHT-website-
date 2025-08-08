import React from "react"
import VoicePhoneOverlay from "../components/voice-phone-overlay"

// Example usage with optional centered text
export default function ExampleVoicePhone() {
  return (
    <div className="w-full py-10 flex justify-center">
      <VoicePhoneOverlay
        src="./assets/phonemockup.svg" // replace with your phone SVG path
        onAccept={() => alert("Accepted")}
        onDecline={() => alert("Declined")}
        // Adjust these two numbers if the icons don't align with your SVG
        statusOffset={18}
        buttonsOffset={28}
        // If your screen is dark inside the SVG, set this true for white status icons
        statusOnDark={false}
      >
        <div className="text-center">
          <h4 className="text-3xl font-extrabold tracking-tight text-black">NOVA AI</h4>
          <p className="text-gray-600">Connecting …</p>
        </div>
      </VoicePhoneOverlay>
    </div>
  )
}
