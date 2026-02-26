import type { DragEvent } from "react";

// Config array — add a new node type by adding one entry here
const nodeTypes = [
  {
    type: "textMessage",
    label: "Message",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-blue-600"
      >
        <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 20.97v-3.03a4.527 4.527 0 0 1-1.087-3.046V6.384c.114-1.865 1.483-3.476 3.405-3.726zM19.5 8.25c-2.003-.167-4.05-.167-6.053 0-1.535.128-2.697 1.37-2.697 2.87v4.286c0 1.5 1.162 2.742 2.697 2.87.868.072 1.74.112 2.614.117l2.07 2.07a.75.75 0 0 0 1.28-.53v-2.29a2.893 2.893 0 0 0 .82-2.237V11.12c0-1.5-1.162-2.742-2.697-2.87z" />
      </svg>
    ),
  },
];

export default function NodesPanel() {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="p-4">
      <div className="grid gap-3">
        {nodeTypes.map((nt) => (
          <div
            key={nt.type}
            draggable
            onDragStart={(e) => onDragStart(e, nt.type)}
            className="flex flex-col items-center gap-1.5 p-4 border border-blue-500 rounded-lg cursor-grab active:cursor-grabbing hover:bg-blue-50 transition-colors text-blue-600"
          >
            {nt.icon}
            <span className="text-sm font-medium">{nt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
