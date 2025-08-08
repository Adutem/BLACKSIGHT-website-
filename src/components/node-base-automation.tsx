'use client'

import React, { useCallback, useState } from 'react'
import ReactFlow, {
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  NodeTypes,
  Handle,
  Position,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'

// Icons
import {
  FaBolt,
  FaRobot,
  FaWhatsapp,
  FaClipboardList,
  FaCogs,
  FaTh, // Send Notification (grid icon)
  FaEnvelope,
  FaPhoneAlt, // Lead Form node icon (kept for parity with provided list)
} from 'react-icons/fa'

import LeadForm from './lead-form'

// Type for node data
interface AutomationNodeData {
  typeLabel: string // e.g., "Trigger", "AI"
  subLabel: string // e.g., "Bot Conversation Start", "AI Summarizer"
  description?: string // e.g., "Conversation Completed", "Summarizes Message"
  icon: React.ComponentType<{ className?: string }>
  iconBgColor: string
  borderColor: string
  typeLabelColor: string
}

// Custom node types
const nodeTypes: NodeTypes = {
  automation: ({ data }: { data: AutomationNodeData }) => (
    <div
      className="rounded-xl border shadow-sm flex flex-col overflow-hidden"
      style={{
        borderColor: data.borderColor,
        minWidth: '200px',
        backgroundColor: 'white',
      }}
    >
      {/* Top: Icon + Labels */}
      <div className="flex items-center p-3">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-md mr-3 flex-shrink-0"
          style={{ backgroundColor: data.iconBgColor }}
        >
          <data.icon className="text-white text-base" />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="font-semibold text-sm" style={{ color: data.typeLabelColor }}>
            {data.typeLabel}
          </div>
          <div className="text-gray-800 text-sm mt-0.5 leading-tight">
            {data.subLabel}
          </div>
        </div>
      </div>

      {/* Bottom: Description */}
      {data.description && (
        <div className="text-xs text-gray-500 px-3 pb-2 pt-1 -mt-1">
          {data.description}
        </div>
      )}

      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-gray-300 rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-300 rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
    </div>
  ),

  
}

// Initial nodes arranged to match the reference image
type FlowNode = Node<AutomationNodeData | {}>
const initialNodes: FlowNode[] = [
  {
    id: 'trigger-1',
    type: 'automation',
    position: { x: 100, y: 100 },
    data: {
      typeLabel: 'Trigger',
      subLabel: 'Bot Conversation Start',
      description: 'Conversation Completed',
      icon: FaBolt,
      iconBgColor: '#4285F4', // Blue
      borderColor: '#D1E0FF', // Light Blue
      typeLabelColor: '#1A73E8', // Darker Blue
    },
  },
  {
    id: 'ai-1',
    type: 'automation',
    position: { x: 350, y: 100 },
    data: {
      typeLabel: 'AI',
      subLabel: 'AI Summarizer',
      description: 'Summarizes Message',
      icon: FaRobot,
      iconBgColor: '#8E24AA', // Purple
      borderColor: '#E8D1FF', // Light Purple
      typeLabelColor: '#673AB7', // Darker Purple
    },
  },
  {
    id: 'whatsapp-1',
    type: 'automation',
    position: { x: 600, y: 100 },
    data: {
      typeLabel: 'Action',
      subLabel: 'Send WhatsApp Message',
      description: '',
      icon: FaWhatsapp,
      iconBgColor: '#25D366', // WhatsApp Green
      borderColor: '#D4EDDA', // Light Green
      typeLabelColor: '#1E8449', // Darker Green
    },
  },

  {
    id: 'trigger-2',
    type: 'automation',
    position: { x: 100, y: 300 },
    data: {
      typeLabel: 'Trigger',
      subLabel: 'Voice AI Agent',
      description: 'Conversation Completed',
      icon: FaBolt,
      iconBgColor: '#4285F4',
      borderColor: '#D1E0FF',
      typeLabelColor: '#1A73E8',
    },
  },
  {
    id: 'ai-2',
    type: 'automation',
    position: { x: 350, y: 300 },
    data: {
      typeLabel: 'AI',
      subLabel: 'AI Summarizer',
      description: 'Summarize Message',
      icon: FaRobot,
      iconBgColor: '#8E24AA',
      borderColor: '#E8D1FF',
      typeLabelColor: '#673AB7',
    },
  },
  {
    id: 'action-1',
    type: 'automation',
    position: { x: 600, y: 250 },
    data: {
      typeLabel: 'Action',
      subLabel: 'Send SMS',
      description: '',
      icon: FaClipboardList,
      iconBgColor: '#FB8C00', // Orange
      borderColor: '#FFE0B2', // Light Orange
      typeLabelColor: '#EF6C00', // Darker Orange
    },
  },
  {
    id: 'logic-1',
    type: 'automation',
    position: { x: 600, y: 350 },
    data: {
      typeLabel: 'Logic',
      subLabel: 'Wait/Delay Timer',
      description: 'Wait For Two Days',
      icon: FaCogs,
      iconBgColor: '#4CAF50', // Green
      borderColor: '#D4EDDA', // Light Green
      typeLabelColor: '#388E3C', // Darker Green
    },
  },
  {
    id: 'notification-1',
    type: 'automation',
    position: { x: 850, y: 300 },
    data: {
      typeLabel: 'Action',
      subLabel: 'Send Notification',
      description: '',
      icon: FaTh, // Grid icon
      iconBgColor: '#4285F4',
      borderColor: '#D1E0FF',
      typeLabelColor: '#1A73E8',
    },
  },
  {
    id: 'mail-1',
    type: 'automation',
    position: { x: 850, y: 400 },
    data: {
      typeLabel: 'Action',
      subLabel: 'Send Mail',
      description: '',
      icon: FaEnvelope,
      iconBgColor: '#D32F2F', // Red
      borderColor: '#FFCDD2', // Light Red
      typeLabelColor: '#C62828', // Darker Red
    },
  },
  {
    id: 'lead-form-node',
    type: 'leadFormNode',
    position: { x: 100, y: 500 }, // Below the existing flow
    data: {} as {},
  },
]

// Initial edges (smoothstep, no arrows)
const initialEdges: Edge[] = [
  {
    id: 'e-trigger1-ai1',
    source: 'trigger-1',
    target: 'ai-1',
    type: 'smoothstep',
    style: { stroke: '#4285F4', strokeWidth: 2 }, // Blue
    markerEnd: { type: MarkerType.None },
  },
  {
    id: 'e-ai1-whatsapp1',
    source: 'ai-1',
    target: 'whatsapp-1',
    type: 'smoothstep',
    style: { stroke: '#8E24AA', strokeWidth: 2 }, // Purple
    markerEnd: { type: MarkerType.None },
  },
  {
    id: 'e-trigger2-ai2',
    source: 'trigger-2',
    target: 'ai-2',
    type: 'smoothstep',
    style: { stroke: '#4285F4', strokeWidth: 2 }, // Blue
    markerEnd: { type: MarkerType.None },
  },
  {
    id: 'e-ai2-action1',
    source: 'ai-2',
    target: 'action-1',
    type: 'smoothstep',
    style: { stroke: '#8E24AA', strokeWidth: 2 }, // Purple
    markerEnd: { type: MarkerType.None },
  },
  {
    id: 'e-ai2-logic1',
    source: 'ai-2',
    target: 'logic-1',
    type: 'smoothstep',
    style: { stroke: '#8E24AA', strokeWidth: 2 }, // Purple
    markerEnd: { type: MarkerType.None },
  },
  {
    id: 'e-logic1-notification1',
    source: 'logic-1',
    target: 'notification-1',
    type: 'smoothstep',
    style: { stroke: '#4CAF50', strokeWidth: 2 }, // Green
    markerEnd: { type: MarkerType.None },
  },
  {
    id: 'e-logic1-mail1',
    source: 'logic-1',
    target: 'mail-1',
    type: 'smoothstep',
    style: { stroke: '#4CAF50', strokeWidth: 2 }, // Green
    markerEnd: { type: MarkerType.None },
  },
  {
    id: 'e-ai2-leadform',
    source: 'ai-2',
    target: 'lead-form-node',
    type: 'smoothstep',
    style: { stroke: '#8E24AA', strokeWidth: 2 }, // Purple
    markerEnd: { type: MarkerType.None },
  },
]

export const NodeBaseAutomation: React.FC = () => {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  )

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Node Base Automation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualize complex workflows with our intuitive node-based automation system.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
          <div className="h-[900px] rounded-lg overflow-hidden">
            <ReactFlow
              nodes={nodes as Node[]}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
              connectionMode="loose"
            >
              <Background color="#f3f4f6" gap={20} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NodeBaseAutomation
