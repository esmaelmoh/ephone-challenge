import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Node {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: { label: string };
}

interface NodesState {
  nodes: Node[];
}

const initialState: NodesState = {
  nodes: [
    {
      id: "a",
      type: "new-node",
      position: { x: 0, y: 0 },
      data: { label: "Ready" },
    },
    {
      id: "c",
      type: "new-node",
      position: { x: 100, y: 100 },
      data: { label: "to innovate" },
    },
    {
      id: "b",
      type: "new-node",
      position: { x: -100, y: 100 },
      data: { label: "make an impact" },
    },
    {
      id: "d",
      type: "new-node",
      position: { x: 0, y: 200 },
      data: { label: "with ephone!💡" },
    },
  ],
};

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { id, label } = action.payload;
      const newNode = {
        id,
        type: "new-node",
        data: { label }, // Set the label of the new node to the extracted menu item string
        position: { x: Math.random() * 200, y: Math.random() * 200 },
      };
      state.nodes.push(newNode);
    },
    deleteNode: (state, action) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
    duplicateNode: (state, action) => {
      const nodeToDuplicate = state.nodes.find(
        (node) => node.id === action.payload
      );
      if (nodeToDuplicate) {
        const duplicatedNode = {
          // ...nodeToDuplicate,
          id: `${state.nodes.length + 1}`, // Generate a new ID for the duplicated node
          type: `${nodeToDuplicate.type}`,
          data: {
            ...nodeToDuplicate.data,
          }, // Update the label of the duplicated node
          position: {
            x: nodeToDuplicate.position.x + 50,
            y: nodeToDuplicate.position.y + 50,
          }, // Adjust position for clarity
        };
        state.nodes.push(duplicatedNode); // Add duplicated node to state
      }
    },
  },
});

export const { addNode, deleteNode, duplicateNode } = nodesSlice.actions;

export const selectNodes = (state: RootState) => state.nodes.nodes;

export default nodesSlice.reducer;
