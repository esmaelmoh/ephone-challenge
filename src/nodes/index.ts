import type { NodeTypes } from "reactflow";
import CustomNode from "./CustomNode";

export const nodeTypes = {
  "new-node": CustomNode,
} satisfies NodeTypes;
