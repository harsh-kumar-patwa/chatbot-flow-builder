import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AppNode } from "../../types";

export default function TextNode({ data, selected }: NodeProps<AppNode>) {
  return (
    <div
      className={`min-w-[200px] rounded-lg shadow-md bg-white border ${
        selected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-200 rounded-t-lg text-xs font-semibold text-gray-700">
        <ChatIcon />
        Send Message
      </div>

      {/* Body */}
      <div className="px-3 py-2.5 text-sm text-gray-800">{data.label}</div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-gray-400 !border-white !border-2"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-gray-400 !border-white !border-2"
      />
    </div>
  );
}

function ChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-3.5 h-3.5 text-green-700"
    >
      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 20.97v-3.03a4.527 4.527 0 0 1-1.087-3.046V6.384c.114-1.865 1.483-3.476 3.405-3.726zM19.5 8.25c-2.003-.167-4.05-.167-6.053 0-1.535.128-2.697 1.37-2.697 2.87v4.286c0 1.5 1.162 2.742 2.697 2.87.868.072 1.74.112 2.614.117l2.07 2.07a.75.75 0 0 0 1.28-.53v-2.29a2.893 2.893 0 0 0 .82-2.237V11.12c0-1.5-1.162-2.742-2.697-2.87z" />
    </svg>
  );
}
