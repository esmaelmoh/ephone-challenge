import type { NodeTypes } from "reactflow";
import CustomNode from "./CustomNode";

export const nodeTypes = {
  "new-node": CustomNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
