import type { Edge } from "@xyflow/react";
import type { AppNode } from "../types";

interface FlowData {
  nodes: AppNode[];
  edges: Edge[];
}

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function loadFlow(): Promise<FlowData> {
  const res = await fetch(`${API_BASE}/api/flow`);
  if (!res.ok) throw new Error("Failed to load flow");
  return res.json();
}

export async function saveFlow(data: FlowData): Promise<void> {
  const res = await fetch(`${API_BASE}/api/flow`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save flow");
}
