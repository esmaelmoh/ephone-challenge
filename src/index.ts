import type { Edge, EdgeTypes } from "reactflow";

export const initialEdges = [
  { id: "a->c", source: "a", target: "c" },
  { id: "a->b", source: "a", target: "b" },
  { id: "b->d", source: "b", target: "d", animated: true },
  { id: "c->d", source: "c", target: "d", animated: true },
] satisfies Edge[];

export const edgeTypes = {} satisfies EdgeTypes;
