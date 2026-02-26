import type { AppNode } from "../types";

export default function SettingsPanel({
  node,
  onChange,
  onBack,
}: {
  node: AppNode;
  onChange: (id: string, label: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      {/* Header with back button */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-200">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-gray-600"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="text-sm font-medium text-gray-700">Message</span>
      </div>

      {/* Settings fields — rendered based on node type */}
      <div className="p-4">
        {node.type === "textMessage" && (
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Text</label>
            <textarea
              value={node.data.label}
              onChange={(e) => onChange(node.id, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-y min-h-[80px]"
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  );
}
