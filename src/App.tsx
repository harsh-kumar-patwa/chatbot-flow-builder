import { useCallback, useEffect, useState } from "react";
import { ReactFlowProvider, useNodesState, useEdgesState, type Edge } from "@xyflow/react";
import FlowBuilder from "./components/FlowBuilder";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { loadFlow } from "./lib/api";
import type { AppNode } from "./types";

function FlowApp() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<AppNode | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Load saved flow on mount
  useEffect(() => {
    loadFlow().then((data) => {
      if (data.nodes.length) setNodes(data.nodes);
      if (data.edges.length) setEdges(data.edges);
    }).catch(() => {
      // No saved flow or server not running — start with empty canvas
    });
  }, [setNodes, setEdges]);

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Keep selectedNode in sync with node state changes (e.g. position moves)
  useEffect(() => {
    if (!selectedNode) return;
    const updated = nodes.find((n) => n.id === selectedNode.id);
    if (!updated) {
      setSelectedNode(null);
    } else if (updated.data.label !== selectedNode.data.label) {
      setSelectedNode(updated);
    }
  }, [nodes, selectedNode]);

  const handleNodeSelect = useCallback((node: AppNode | null) => {
    setSelectedNode(node);
  }, []);

  const handleNodeChange = useCallback(
    (id: string, label: string) => {
      setNodes((nds) =>
        nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n))
      );
      // Also update selected node so the text area stays in sync
      setSelectedNode((prev) =>
        prev && prev.id === id ? { ...prev, data: { ...prev.data, label } } : prev
      );
    },
    [setNodes]
  );

  const handleDeselect = useCallback(() => {
    setSelectedNode(null);
    // Also deselect in React Flow
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
  }, [setNodes]);

  return (
    <div className="flex flex-col h-screen">
      <Header nodes={nodes} edges={edges} toast={toast} setToast={setToast} />

      <div className="flex flex-1 overflow-hidden">
        <FlowBuilder
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeSelect={handleNodeSelect}
        />

        <Sidebar
          selectedNode={selectedNode}
          onNodeChange={handleNodeChange}
          onDeselect={handleDeselect}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowApp />
    </ReactFlowProvider>
  );
}
