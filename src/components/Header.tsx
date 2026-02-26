import type { Edge } from "@xyflow/react";
import type { AppNode } from "../types";
import { saveFlow } from "../lib/api";

export default function Header({
  nodes,
  edges,
  toast,
  setToast,
}: {
  nodes: AppNode[];
  edges: Edge[];
  toast: { message: string; type: "success" | "error" } | null;
  setToast: (toast: { message: string; type: "success" | "error" } | null) => void;
}) {
  const handleSave = async () => {
    if (nodes.length > 1) {
      // Count nodes with no incoming edges (target handles empty)
      const nodesWithIncoming = new Set(edges.map((e) => e.target));
      const nodesWithoutIncoming = nodes.filter(
        (n) => !nodesWithIncoming.has(n.id)
      );

      if (nodesWithoutIncoming.length > 1) {
        setToast({ message: "Cannot save flow: more than one node has no incoming edge", type: "error" });
        return;
      }
    }

    try {
      await saveFlow({ nodes, edges });
      setToast({ message: "Flow saved successfully!", type: "success" });
    } catch {
      setToast({ message: "Failed to save flow to server", type: "error" });
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
      {/* Toast message area */}
      <div className="flex-1">
        {toast && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium ${
              toast.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        className="px-5 py-1.5 bg-white border border-blue-500 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
      >
        Save Changes
      </button>
    </header>
  );
}
