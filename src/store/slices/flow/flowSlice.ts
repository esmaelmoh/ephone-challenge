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
  selectedNodeId: string;
  editMode: boolean;
}

const initialState: NodesState = {
  nodes: [
    {
      id: "a",
      type: "new-node",
      position: { x: 0, y: 0 },
      data: { label: "I am Ready" },
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
  selectedNodeId: "",
  editMode: false,
};

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setSelecteNodeId: (state, action) => {
      const { id } = action.payload;
      state.selectedNodeId = id;
    },
    setEditMode: (state, action) => {
      const { mode } = action.payload;
      state.editMode = mode;
    },
    addNode: (state, action) => {
      const { id, label } = action.payload;
      const newNode = {
        id,
        type: "new-node",
        data: { label },
        position: { x: Math.random() * 200, y: Math.random() * 200 },
      };
      state.nodes.push(newNode);
    },
    deleteNode: (state, action) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
    updateNodeLabel: (state, action) => {
      const { id, label } = action.payload;
      const nodeToUpdate = state.nodes.find((node) => node.id === id);
      if (nodeToUpdate) {
        nodeToUpdate.data.label = label;
      }
    },
    duplicateNode: (state, action) => {
      const nodeToDuplicate = state.nodes.find(
        (node) => node.id === action.payload
      );
      if (nodeToDuplicate) {
        const duplicatedNode = {
          id: `${state.nodes.length + 1}`,
          type: `${nodeToDuplicate.type}`,
          data: {
            ...nodeToDuplicate.data,
          },
          position: {
            x: nodeToDuplicate.position.x + 50,
            y: nodeToDuplicate.position.y + 50,
          },
        };
        state.nodes.push(duplicatedNode);
      }
    },
  },
});

export const {
  addNode,
  deleteNode,
  duplicateNode,
  setSelecteNodeId,
  updateNodeLabel,
  setEditMode,
} = nodesSlice.actions;

export const selectNodes = (state: RootState) => state.nodes.nodes;

export default nodesSlice.reducer;
