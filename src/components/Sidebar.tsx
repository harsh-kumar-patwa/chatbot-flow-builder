import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import type { AppNode } from "../types";

export default function Sidebar({
  selectedNode,
  onNodeChange,
  onDeselect,
}: {
  selectedNode: AppNode | null;
  onNodeChange: (id: string, label: string) => void;
  onDeselect: () => void;
}) {
  return (
    <aside className="w-64 border-l border-gray-200 bg-white overflow-y-auto">
      {selectedNode ? (
        <SettingsPanel
          node={selectedNode}
          onChange={onNodeChange}
          onBack={onDeselect}
        />
      ) : (
        <NodesPanel />
      )}
    </aside>
  );
}
