"use client"

import type React from "react"
import { useCallback, useState } from "react"
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  addEdge,
  type NodeTypes,
  Handle,
  Position,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"

// Icons
import { FaBolt, FaRobot, FaWhatsapp, FaClipboardList, FaCogs, FaTh, FaEnvelope } from "react-icons/fa"

interface AutomationNodeData {
  typeLabel: string
  subLabel: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  iconBgColor: string
  borderColor: string
  typeLabelColor: string
}

// Compact, clean node style to match the mockup
const nodeTypes: NodeTypes = {
  automation: ({ data }: { data: AutomationNodeData }) => (
    <div
      className="rounded-xl border flex flex-col overflow-hidden"
      style={{
        borderColor: data.borderColor,
        minWidth: 220,
        background: "white",
        boxShadow: "0 8px 20px rgba(2,6,23,0.06)",
      }}
    >
      <div className="flex items-center px-3 py-2.5">
        <div
          className="mr-2.5 grid h-7 w-7 place-items-center rounded-md flex-shrink-0"
          style={{ backgroundColor: data.iconBgColor }}
        >
          <data.icon className="text-white text-[12px]" />
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="text-[13px] font-semibold" style={{ color: data.typeLabelColor }}>
            {data.typeLabel}
          </div>
          <div className="mt-0.5 text-[13px] leading-tight text-gray-800">{data.subLabel}</div>
        </div>
      </div>
      {data.description && <div className="px-3 pb-2 pt-1 text-[11px] -mt-1 text-gray-500">{data.description}</div>}

      {/* Subtle handles */}
      <Handle
        type="source"
        position={Position.Right}
        className="h-2 w-2 rounded-full bg-gray-300 opacity-0 transition-opacity hover:opacity-100"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="h-2 w-2 rounded-full bg-gray-300 opacity-0 transition-opacity hover:opacity-100"
      />
    </div>
  ),
}

// Layout coordinates closely mirroring the screenshot
type FlowNode = Node<AutomationNodeData>
const initialNodes: FlowNode[] = [
  // Row 1
  {
    id: "trigger-1",
    type: "automation",
    position: { x: 100, y: 70 },
    data: {
      typeLabel: "Trigger",
      subLabel: "Bot Conversation Start",
      description: "Conversation Completed",
      icon: FaBolt,
      iconBgColor: "#4285F4",
      borderColor: "#D1E0FF",
      typeLabelColor: "#1A73E8",
    },
  },
  {
    id: "ai-1",
    type: "automation",
    position: { x: 340, y: 70 },
    data: {
      typeLabel: "AI",
      subLabel: "AI Summarizer",
      description: "Summarizes Message",
      icon: FaRobot,
      iconBgColor: "#8E24AA",
      borderColor: "#E8D1FF",
      typeLabelColor: "#673AB7",
    },
  },
  {
    id: "whatsapp-1",
    type: "automation",
    position: { x: 590, y: 70 },
    data: {
      typeLabel: "Action",
      subLabel: "Send WhatsApp Message",
      icon: FaWhatsapp,
      iconBgColor: "#25D366",
      borderColor: "#D4EDDA",
      typeLabelColor: "#1E8449",
    },
  },

  // Row 2
  {
    id: "trigger-2",
    type: "automation",
    position: { x: 100, y: 230 },
    data: {
      typeLabel: "Trigger",
      subLabel: "Voice AI Agent",
      description: "Conversation Completed",
      icon: FaBolt,
      iconBgColor: "#4285F4",
      borderColor: "#D1E0FF",
      typeLabelColor: "#1A73E8",
    },
  },
  {
    id: "ai-2",
    type: "automation",
    position: { x: 340, y: 230 },
    data: {
      typeLabel: "AI",
      subLabel: "AI Summarizer",
      description: "Summarize Message",
      icon: FaRobot,
      iconBgColor: "#8E24AA",
      borderColor: "#E8D1FF",
      typeLabelColor: "#673AB7",
    },
  },
  {
    id: "action-1",
    type: "automation",
    position: { x: 590, y: 205 },
    data: {
      typeLabel: "Action",
      subLabel: "Send SMS",
      icon: FaClipboardList,
      iconBgColor: "#FB8C00",
      borderColor: "#FFE0B2",
      typeLabelColor: "#EF6C00",
    },
  },
  {
    id: "logic-1",
    type: "automation",
    position: { x: 590, y: 285 },
    data: {
      typeLabel: "Logic",
      subLabel: "Wait/Delay Timer",
      description: "Wait For Two Days",
      icon: FaCogs,
      iconBgColor: "#4CAF50",
      borderColor: "#D4EDDA",
      typeLabelColor: "#388E3C",
    },
  },
  {
    id: "notification-1",
    type: "automation",
    position: { x: 840, y: 235 },
    data: {
      typeLabel: "Action",
      subLabel: "Send Notification",
      icon: FaTh,
      iconBgColor: "#4285F4",
      borderColor: "#D1E0FF",
      typeLabelColor: "#1A73E8",
    },
  },
  {
    id: "mail-1",
    type: "automation",
    position: { x: 840, y: 320 },
    data: {
      typeLabel: "Action",
      subLabel: "Send Mail",
      icon: FaEnvelope,
      iconBgColor: "#D32F2F",
      borderColor: "#FFCDD2",
      typeLabelColor: "#C62828",
    },
  },
]

// Thinner connectors with smooth curvature, no arrows
const LINE = 1 // thinner than before
const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "trigger-1",
    target: "ai-1",
    type: "smoothstep",
    style: { stroke: "#4285F4", strokeWidth: LINE },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e2",
    source: "ai-1",
    target: "whatsapp-1",
    type: "smoothstep",
    style: { stroke: "#8E24AA", strokeWidth: LINE },
    markerEnd: { type: MarkerType.None },
  },

  {
    id: "e3",
    source: "trigger-2",
    target: "ai-2",
    type: "smoothstep",
    style: { stroke: "#4285F4", strokeWidth: LINE },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e4",
    source: "ai-2",
    target: "action-1",
    type: "smoothstep",
    style: { stroke: "#8E24AA", strokeWidth: LINE },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e5",
    source: "ai-2",
    target: "logic-1",
    type: "smoothstep",
    style: { stroke: "#8E24AA", strokeWidth: LINE },
    markerEnd: { type: MarkerType.None },
  },

  {
    id: "e6",
    source: "logic-1",
    target: "notification-1",
    type: "smoothstep",
    style: { stroke: "#4CAF50", strokeWidth: LINE },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e7",
    source: "logic-1",
    target: "mail-1",
    type: "smoothstep",
    style: { stroke: "#4CAF50", strokeWidth: LINE },
    markerEnd: { type: MarkerType.None },
  },
]

export default function NodeBaseAutomation() {
  const [nodes, setNodes] = useState<Node<AutomationNodeData>[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...connection, type: "smoothstep", markerEnd: { type: MarkerType.None }, style: { strokeWidth: LINE } },
          eds,
        ),
      ),
    [],
  )

  return (
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-5 text-center text-3xl md:text-4xl font-bold text-gray-800">Node Base Automation</h2>

        {/* Smaller canvas area to match the mockup proportions */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="h-[440px] rounded-xl overflow-hidden">
            <ReactFlow
              nodes={nodes as Node[]}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.15, includeHiddenNodes: true }}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              proOptions={{ hideAttribution: true }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
