import AiAssistantSteps from "../components/ai-assistant-steps"

export default function AiStepsExactDemo() {
  // Exact copy matching the screenshot
  const steps = [
    {
      title: "Create an Agent",
      description: "Sign Up to Blacksight AI and Set‑up your agent from the dashboard.",
      Icon: require("lucide-react").UserPlus,
      iconBg: "bg-violet-50",
      iconFg: "text-violet-600",
    },
    {
      title: "Add Knowledge Base",
      description: "Embed a Knowledge Base specified to your business in the agent.",
      Icon: require("lucide-react").BookMarked,
      iconBg: "bg-amber-50",
      iconFg: "text-amber-600",
    },
    {
      title: "Train your bot",
      description: "Tailor your agent to your specified response pattern.",
      Icon: require("lucide-react").Bot,
      iconBg: "bg-emerald-50",
      iconFg: "text-emerald-600",
    },
    {
      title: "Connect Via API or MCP",
      description: "Connect your agent to a the main server Via API or MCP Protocols.",
      Icon: require("lucide-react").Plug,
      iconBg: "bg-fuchsia-50",
      iconFg: "text-fuchsia-600",
    },
    {
      title: "Integrate Agent",
      description: "Finish up the agent and get started.",
      Icon: require("lucide-react").Boxes,
      iconBg: "bg-rose-50",
      iconFg: "text-rose-600",
    },
  ] as const

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <AiAssistantSteps title="How to use AI Assistant" steps={steps as any} rightColumnOffset={72} />

        {/* Reference image below for 1:1 comparison */}
        <div className="mt-10">
          <h3 className="text-center text-sm font-medium text-gray-500">Reference</h3>
          <div className="mt-3 flex justify-center">
            <img
              src="/images/blacksight5.png"
              alt="Reference: How to use AI Assistant layout"
              className="w-full max-w-4xl rounded-lg border border-gray-100 shadow-sm"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
