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

// Compact, clean node style to match the mockup, with divider and magnet handles
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
      {/* Handles at left and right ends - small rectangles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 10,
          height: 6,
          borderRadius: 2,
          backgroundColor: "#ccc",
          top: "50%",
          transform: "translateY(-50%)",
          border: `1px solid ${data.borderColor}`,
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 10,
          height: 6,
          borderRadius: 2,
          backgroundColor: "#ccc",
          top: "50%",
          transform: "translateY(-50%)",
          border: `1px solid ${data.borderColor}`,
        }}
      />

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

      {/* Divider line */}
      <div style={{ borderTop: `1px solid ${data.borderColor}`, margin: "0 12px" }} />

      {data.description && <div className="px-3 pb-2 pt-1 text-[11px] -mt-1 text-gray-500">{data.description}</div>}
    </div>
  ),
}

// Boundary constants for dragging
const BOUNDARY_WIDTH = 900
const BOUNDARY_HEIGHT = 440

type FlowNode = Node<AutomationNodeData>

// Initial nodes and edges unchanged
const initialNodes: FlowNode[] = [
  // Row 1 - Bot Conversation
  {
    id: "trigger-1",
    type: "automation",
    position: { x: 100, y: 70 },
    data: {
      typeLabel: "Trigger",
      subLabel: "Bot Conversation Start",
      description: "Conversation Completed",
      icon: FaBolt,
      iconBgColor: "#4285f4",
      borderColor: "#d1e0ff",
      typeLabelColor: "#1a73e8",
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
      iconBgColor: "#8e24aa",
      borderColor: "#e8d1ff",
      typeLabelColor: "#673ab7",
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
      iconBgColor: "#25d366",
      borderColor: "#d4edda",
      typeLabelColor: "#1e8449",
    },
  },
]

const initialEdgesBot: Edge[] = [
  {
    id: "e1",
    source: "trigger-1",
    target: "ai-1",
    type: "smoothstep",
    style: { stroke: "#4285f4", strokeWidth: 1 },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e2",
    source: "ai-1",
    target: "whatsapp-1",
    type: "smoothstep",
    style: { stroke: "#8e24aa", strokeWidth: 1 },
    markerEnd: { type: MarkerType.None },
  },
]

// Voice AI Agent nodes and edges
const initialNodesVoice: FlowNode[] = [
  {
    id: "trigger-2",
    type: "automation",
    position: { x: 100, y: 230 },
    data: {
      typeLabel: "Trigger",
      subLabel: "Voice AI Agent",
      description: "Conversation Completed",
      icon: FaBolt,
      iconBgColor: "#4285f4",
      borderColor: "#d1e0ff",
      typeLabelColor: "#1a73e8",
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
      iconBgColor: "#8e24aa",
      borderColor: "#e8d1ff",
      typeLabelColor: "#673ab7",
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
      iconBgColor: "#fb8c00",
      borderColor: "#ffe0b2",
      typeLabelColor: "#ef6c00",
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
      iconBgColor: "#4caf50",
      borderColor: "#d4edda",
      typeLabelColor: "#388e3c",
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
      iconBgColor: "#4285f4",
      borderColor: "#d1e0ff",
      typeLabelColor: "#1a73e8",
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
      iconBgColor: "#d32f2f",
      borderColor: "#ffcdd2",
      typeLabelColor: "#c62828",
    },
  },
]

const initialEdgesVoice: Edge[] = [
  {
    id: "e3",
    source: "trigger-2",
    target: "ai-2",
    type: "smoothstep",
    style: { stroke: "#4285f4", strokeWidth: 1 },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e4",
    source: "ai-2",
    target: "action-1",
    type: "smoothstep",
    style: { stroke: "#8e24aa", strokeWidth: 1 },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e5",
    source: "ai-2",
    target: "logic-1",
    type: "smoothstep",
    style: { stroke: "#8e24aa", strokeWidth: 1 },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e6",
    source: "logic-1",
    target: "notification-1",
    type: "smoothstep",
    style: { stroke: "#4caf50", strokeWidth: 1 },
    markerEnd: { type: MarkerType.None },
  },
  {
    id: "e7",
    source: "logic-1",
    target: "mail-1",
    type: "smoothstep",
    style: { stroke: "#4caf50", strokeWidth: 1 },
    markerEnd: { type: MarkerType.None },
  },
]

export default function NodeBaseAutomation() {
  // State for Bot Conversation
  const [botNodes, setBotNodes] = useState<FlowNode[]>(initialNodes)
  const [botEdges, setBotEdges] = useState<Edge[]>(initialEdgesBot)

  // State for Voice AI Agent
  const [voiceNodes, setVoiceNodes] = useState<FlowNode[]>(initialNodesVoice)
  const [voiceEdges, setVoiceEdges] = useState<Edge[]>(initialEdgesVoice)

  // Bound drag for Bot nodes
  const onBotNodeDragStop = useCallback(
    (event: React.MouseEvent, node: FlowNode) => {
      const boundedX = Math.min(Math.max(node.position.x, 0), BOUNDARY_WIDTH)
      const boundedY = Math.min(Math.max(node.position.y, 0), BOUNDARY_HEIGHT)

      if (boundedX !== node.position.x || boundedY !== node.position.y) {
        setBotNodes((nds) =>
          nds.map((n) => (n.id === node.id ? { ...n, position: { x: boundedX, y: boundedY } } : n)),
        )
      }
    },
    [setBotNodes],
  )

  // Bound drag for Voice nodes
  const onVoiceNodeDragStop = useCallback(
    (event: React.MouseEvent, node: FlowNode) => {
      const boundedX = Math.min(Math.max(node.position.x, 0), BOUNDARY_WIDTH)
      const boundedY = Math.min(Math.max(node.position.y, 0), BOUNDARY_HEIGHT)

      if (boundedX !== node.position.x || boundedY !== node.position.y) {
        setVoiceNodes((nds) =>
          nds.map((n) => (n.id === node.id ? { ...n, position: { x: boundedX, y: boundedY } } : n)),
        )
      }
    },
    [setVoiceNodes],
  )

  return (
    <>
      {/* Container */}
      <div className="flex flex-col gap-6 mx-auto max-w-[900px] w-full rounded-lg">
        <div
          id="botflow"
          className="bg-white rounded-lg border border-gray-300"
          style={{ height: 220, width: 900 }}
        >
          <ReactFlow
            nodes={botNodes}
            edges={botEdges}
            nodeTypes={nodeTypes}
            onNodesChange={(changes: NodeChange[]) => setBotNodes((nds) => applyNodeChanges(changes, nds))}
            onEdgesChange={(changes: EdgeChange[]) => setBotEdges((eds) => applyEdgeChanges(changes, eds))}
            onConnect={(connection: Connection) => setBotEdges((eds) => addEdge(connection, eds))}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            snapToGrid
            snapGrid={[15, 15]}
            panOnDrag
            onNodeDragStop={onBotNodeDragStop} // <-- Boundary applied here
            nodesDraggable
          />
        </div>

        <div
          id="voiceflow"
          className="bg-white rounded-lg border border-gray-300"
          style={{ height: 440, width: 900 }}
        >
          <ReactFlow
            nodes={voiceNodes}
            edges={voiceEdges}
            nodeTypes={nodeTypes}
            onNodesChange={(changes: NodeChange[]) => setVoiceNodes((nds) => applyNodeChanges(changes, nds))}
            onEdgesChange={(changes: EdgeChange[]) => setVoiceEdges((eds) => applyEdgeChanges(changes, eds))}
            onConnect={(connection: Connection) => setVoiceEdges((eds) => addEdge(connection, eds))}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            snapToGrid
            snapGrid={[15, 15]}
            panOnDrag
            onNodeDragStop={onVoiceNodeDragStop} // <-- Boundary applied here
            nodesDraggable
          />
        </div>
      </div>
    </>
  )
}


