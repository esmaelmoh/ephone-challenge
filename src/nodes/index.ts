import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import CustomNode from "./CustomNode";

export const initialNodes = [
  {
    id: "a",
    type: "new-node",
    position: { x: 0, y: 0 },
    data: { label: "wire" },
  },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
  },
] satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "new-node": CustomNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
