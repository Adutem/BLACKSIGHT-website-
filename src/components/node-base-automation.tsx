"use client";

import React, { useCallback, useState } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";

import {
  FaBolt,
  FaRobot,
  FaWhatsapp,
  FaClipboardList,
  FaCogs,
  FaTh,
  FaEnvelope,
} from "react-icons/fa";

interface AutomationNodeData {
  typeLabel: string;
  subLabel: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  borderColor: string;
  typeLabelColor: string;
}

const nodeTypes: NodeTypes = {
  automation: ({ data }: { data: AutomationNodeData }) => (
    <div
      className="rounded-xl border flex flex-col overflow-hidden bg-white"
      style={{
        borderColor: data.borderColor,
        minWidth: 220,
        background: "white",
        boxShadow: "0 8px 20px rgba(2,6,23,0.06)",
      }}
    >
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
          <div
            className="text-[13px] font-semibold"
            style={{ color: data.typeLabelColor }}
          >
            {data.typeLabel}
          </div>
          <div className="mt-0.5 text-[13px] leading-tight text-gray-800">
            {data.subLabel}
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${data.borderColor}`, margin: "0 12px" }} />

      {data.description && (
        <div className="px-3 pb-2 pt-1 text-[11px] -mt-1 text-gray-500">
          {data.description}
        </div>
      )}
    </div>
  ),
};

const BOUNDARY_WIDTH = 900;
const BOUNDARY_HEIGHT = 440;

type FlowNode = Node<AutomationNodeData>;

/* -------------------------
   Initial nodes & edges
   ------------------------- */

// Bot Conversation
const initialNodes: FlowNode[] = [
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
];

const initialEdgesBot: Edge[] = [
  {
    id: "e1",
    source: "trigger-1",
    target: "ai-1",
    type: "smoothstep",
    style: { stroke: "#4285f4", strokeWidth: 1 },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e2",
    source: "ai-1",
    target: "whatsapp-1",
    type: "smoothstep",
    style: { stroke: "#8e24aa", strokeWidth: 1 },
    markerEnd: { type: MarkerType.Arrow },
  },
];

// Voice AI Agent
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
];

const initialEdgesVoice: Edge[] = [
  {
    id: "e3",
    source: "trigger-2",
    target: "ai-2",
    type: "smoothstep",
    style: { stroke: "#4285f4", strokeWidth: 1 },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e4",
    source: "ai-2",
    target: "action-1",
    type: "smoothstep",
    style: { stroke: "#8e24aa", strokeWidth: 1 },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e5",
    source: "ai-2",
    target: "logic-1",
    type: "smoothstep",
    style: { stroke: "#8e24aa", strokeWidth: 1 },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e6",
    source: "logic-1",
    target: "notification-1",
    type: "smoothstep",
    style: { stroke: "#4caf50", strokeWidth: 1 },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e7",
    source: "logic-1",
    target: "mail-1",
    type: "smoothstep",
    style: { stroke: "#4caf50", strokeWidth: 1 },
    markerEnd: { type: MarkerType.Arrow },
  },
];

/* -------------------------
   Component
   ------------------------- */

export default function NodeBaseAutomation() {
  const [botNodes, setBotNodes] = useState<FlowNode[]>(initialNodes);
  const [botEdges, setBotEdges] = useState<Edge[]>(initialEdgesBot);
  const [voiceNodes, setVoiceNodes] = useState<FlowNode[]>(initialNodesVoice);
  const [voiceEdges, setVoiceEdges] = useState<Edge[]>(initialEdgesVoice);

  // clamp function factory
  const handleNodesChange = useCallback(
    (setNodesFn: React.Dispatch<React.SetStateAction<FlowNode[]>>) => {
      return (changes: NodeChange[]) => {
        setNodesFn((nds) =>
          applyNodeChanges(
            changes.map((change) => {
              if (change.type === "position" && change.position) {
                const node = nds.find((n) => n.id === change.id) as FlowNode | undefined;
                if (node) {
                  // measured width/height fallback
                  const nodeWidth = typeof node.width === "number" ? node.width : 220;
                  const nodeHeight = typeof node.height === "number" ? node.height : 100;

                  const minX = 0;
                  const minY = 0;
                  const maxX = Math.max(0, BOUNDARY_WIDTH - nodeWidth);
                  const maxY = Math.max(0, BOUNDARY_HEIGHT - nodeHeight);

                  return {
                    ...change,
                    position: {
                      x: Math.min(Math.max(change.position.x, minX), maxX),
                      y: Math.min(Math.max(change.position.y, minY), maxY),
                    },
                  };
                }
              }
              return change;
            }),
            nds
          )
        );
      };
    },
    []
  );

  return (
  
    <div className="flex flex-col gap-6 mx-auto max-w-[900px] w-full rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">Node Base Automation</h2>
      <div
        id="botflow"
        className="relative bg-white rounded-lg border border-gray-200"
        style={{ height: 220, width: BOUNDARY_WIDTH }}
      >
        <ReactFlow
          nodes={botNodes}
          edges={botEdges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange(setBotNodes)}
          onEdgesChange={(changes: EdgeChange[]) =>
            setBotEdges((eds) => applyEdgeChanges(changes, eds))
          }
          onConnect={(connection: Connection) =>
            setBotEdges((eds) => addEdge(connection, eds))
          }
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          translateExtent={[[0, 0], [BOUNDARY_WIDTH, BOUNDARY_HEIGHT]]}
          nodesDraggable
          proOptions={{ hideAttribution: true }} // remove built-in React Flow attribution
        />
        {/* custom small attribution label */}
        <div className="absolute bottom-2 right-3 text-xs text-gray-500 select-none">
          Blacksight
        </div>
      </div>

      {/* Voice Flow */}
      <div
        id="voiceflow"
        className="relative bg-white rounded-lg border border-gray-200"
        style={{ height: BOUNDARY_HEIGHT, width: BOUNDARY_WIDTH }}
      >
        <ReactFlow
          nodes={voiceNodes}
          edges={voiceEdges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange(setVoiceNodes)}
          onEdgesChange={(changes: EdgeChange[]) =>
            setVoiceEdges((eds) => applyEdgeChanges(changes, eds))
          }
          onConnect={(connection: Connection) =>
            setVoiceEdges((eds) => addEdge(connection, eds))
          }
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          translateExtent={[[0, 0], [BOUNDARY_WIDTH, BOUNDARY_HEIGHT]]}
          nodesDraggable
          proOptions={{ hideAttribution: true }}
        />
        <div className="absolute bottom-2 right-3 text-xs text-gray-500 select-none">
          Blacksight
        </div>
      </div>
    </div>
  );
}
