import { useCallback, useRef, type DragEvent } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type OnConnect,
  type NodeTypes,
} from "@xyflow/react";
import TextNode from "./nodes/TextNode";
import type { AppNode } from "../types";

const nodeTypes: NodeTypes = {
  textMessage: TextNode,
};

const getId = () => `node_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export default function FlowBuilder({
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
}: {
  nodes: AppNode[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<AppNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: ReturnType<typeof useNodesState<AppNode>>[2];
  onEdgesChange: ReturnType<typeof useEdgesState>[2];
  onNodeSelect: (node: AppNode | null) => void;
}) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<any>(null);

  // Enforce max 1 outgoing edge per source handle
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      // Remove any existing edge from the same source handle
      setEdges((eds) =>
        addEdge(
          connection,
          eds.filter(
            (e) =>
              !(
                e.source === connection.source &&
                e.sourceHandle === connection.sourceHandle
              )
          )
        )
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance.current) return;

      // Convert screen coords to flow coords
      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: AppNode = {
        id: getId(),
        type: type as AppNode["type"],
        position,
        data: { label: "Hello! Welcome to BiteSpeed." },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance: any) => {
          reactFlowInstance.current = instance;
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(_event, node) => onNodeSelect(node as AppNode)}
        onPaneClick={() => onNodeSelect(null)}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
