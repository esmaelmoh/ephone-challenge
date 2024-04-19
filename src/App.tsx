import type { OnConnect } from "reactflow";

import { useCallback, useEffect, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import { nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  deleteNode,
  addNode,
  duplicateNode,
  selectNodes,
} from "./store/slices/flow/flowSlice";
import "reactflow/dist/base.css";
import MenuExtractionPanel from "./components/MenuExtraction";
import { BiCheck } from "react-icons/bi";
import DarkMode from "./components/DarkMode";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  const count = useAppSelector(selectNodes);
  console.log(count);

  useEffect(() => {
    setNodes(count);
  }, [count]);

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const [text, setText] = useState("");

  const handleAddNode = () => {
    if (text) {
      dispatch(addNode({ id: `${Math.random() * 400}`, label: text }));
      setText("");
    }
  };
  const onSelectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  console.log(selectedNodeId, 987345678);

  const handleDeleteNode = (id: string) => {
    console.log(id, "9854378");
    dispatch(deleteNode(id));
  };
  const handleDuplicate = (id: string) => {
    console.log(id, "9854378");
    dispatch(duplicateNode(id));
  };

  return (
    <>
      {" "}
      <div className={` ${isDarkMode ? "dark" : ""}`}>
        <div className="lg:flex h-full">
          <div className="lg:w-[500px]  dark:bg-gray-800 bg-white  ">
            <DarkMode />
            <MenuExtractionPanel />
            <div className="p-4">
              <h2 className="text-lg font-semibold dark:text-white">
                All Nodes
              </h2>
              {nodes.map((node) => {
                return (
                  <li
                    key={node.data.label}
                    className={
                      "dark:text-white my-2 dark:bg-gray-700 bg-gray-100 text-gray-700 hover:bg-opacity-75 group flex items-center px-2 py-2  font-medium rounded-md"
                    }
                  >
                    <BiCheck className="mr-3 h-6 w-6 flex-shrink-0 text-emerald-300 " />
                    {node.data.label}
                  </li>
                );
              })}
            </div>
          </div>
          <div className="w-full  ">
            <div className="flex flex-col dark:bg-gray-700 bg-gray-100 ">
              <div className="graph-container p-4  md:p-8 md:pt-4">
                <h1 className="text-white text-center p-3 mb-2 bg-gray-900 rounded-md">
                  💡 I used React, ReactFlow, Redux Toolkit, TypeScript and
                  Tailwind CSS
                </h1>
                <div className=" shadow-sm dark:text-white text-center p-3 mb-2 bg-white  dark:bg-gray-900 rounded-md">
                  <div className="flex gap-3 flex-wrap">
                    <input
                      className="p-2 bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-600 rounded resize-none"
                      placeholder="Add Node"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button
                      className=" p-2 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                      onClick={handleAddNode}
                    >
                      Add Node
                    </button>
                    <button
                      onClick={() => handleDeleteNode(selectedNodeId)}
                      title="delete"
                      className=" py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      Delete Node
                    </button>

                    <button
                      onClick={() => handleDuplicate(selectedNodeId)}
                      title="duplicate"
                      className=" py-2 px-4 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                    >
                      Duplicate Node
                    </button>
                  </div>
                </div>
                <ReactFlow
                  nodes={nodes}
                  nodeTypes={nodeTypes}
                  onNodesChange={onNodesChange}
                  edges={edges}
                  edgeTypes={edgeTypes}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onSelectionChange={(params) => {
                    const selectedNodes = params.nodes;
                    if (selectedNodes && selectedNodes.length === 1) {
                      onSelectNode(selectedNodes[0].id);
                    } else {
                      setSelectedNodeId("");
                    }
                  }}
                  fitView
                  className="dark:bg-gray-800 bg-white rounded-xl border-2 shadow-lg border-slate-200 dark:border-slate-600"
                >
                  <Background />
                  <MiniMap />
                  <Controls />
                </ReactFlow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
