import type { Node } from "@xyflow/react";

// --- Node data types (discriminated union for future extensibility) ---

export type TextNodeData = {
  label: string;
};

// Add more node data types here as needed:
// export type ImageNodeData = { url: string };

export type AppNode = Node<TextNodeData, "textMessage">;
// Union with more types later: | Node<ImageNodeData, 'image'>
