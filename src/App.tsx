import type { OnConnect } from "reactflow";

import { useCallback, useEffect } from "react";
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
import { selectNodes } from "./store/slices/flow/flowSlice";
import "reactflow/dist/base.css";
import MenuExtractionPanel from "./components/MenuExtraction";
import { toggleMode } from "./store/slices/theme/themeSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BiCheck } from "react-icons/bi";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
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

  const isDarkMode = useAppSelector((content) => content.theme.isDarkMode);
  const dispatch = useAppDispatch();
  const handleToggleDarkMode = () => {
    dispatch(toggleMode());
  };
  return (
    <>
      {" "}
      <div className={` ${isDarkMode ? "dark" : ""}`}>
        <div className="lg:flex h-full">
          <div className="lg:w-[500px]  dark:bg-gray-800 bg-white  ">
            <button
              className="m-4 p-2 border-2 rounded-full border-lime-100 dark:border-gray-700 "
              onClick={handleToggleDarkMode}
            >
              {isDarkMode ? (
                <MdDarkMode className="h-6 w-6  text-lime-400" />
              ) : (
                <MdLightMode className="h-6 w-6 text-lime-400" />
              )}
            </button>
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
                <ReactFlow
                  nodes={nodes}
                  nodeTypes={nodeTypes}
                  onNodesChange={onNodesChange}
                  edges={edges}
                  edgeTypes={edgeTypes}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
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
