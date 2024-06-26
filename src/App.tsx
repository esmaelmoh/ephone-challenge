import type { OnConnect } from "reactflow";
import "react-toastify/dist/ReactToastify.css";

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
  setSelecteNodeId,
  updateNodeLabel,
  setEditMode,
} from "./store/slices/flow/flowSlice";
import "reactflow/dist/base.css";
import MenuExtractionPanel from "./components/MenuExtraction";
import { BiCheck, BiEdit } from "react-icons/bi";
import DarkMode from "./components/DarkMode";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { HiDuplicate } from "react-icons/hi";
import Header from "./components/Header";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  const nodesData = useAppSelector(selectNodes);
  console.log(nodesData);

  useEffect(() => {
    setNodes(nodesData);
  }, [nodesData]);

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const editMode = useAppSelector((state) => state.nodes.editMode);
  const selectedIdState = useAppSelector((state) => state.nodes.selectedNodeId);

  const [label, setLabel] = useState("");
  const [editLabel, setEditLabel] = useState("");

  const handleAddNode = () => {
    if (label) {
      dispatch(addNode({ id: `${Math.random() * 400}`, label: label }));
      setLabel("");
      toast.success("Node Successfully Added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      // Show a toast notification
      toast.error("Please add a node!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleDeleteNode = (id: string) => {
    console.log(id, "9854378");
    dispatch(deleteNode(id));
  };
  const handleEditNode = (id: string) => {
    console.log(id, "9854378");
    dispatch(updateNodeLabel({ id: id, label: editLabel }));
    dispatch(setEditMode({ mode: false }));
    setEditLabel("");
    toast.success("Node Successfully Edited!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const handleDuplicate = (id: string) => {
    console.log(id, "9854378");
    dispatch(duplicateNode(id));
  };
  const handleEditMode = () => {
    // setSelectedNodeId(id);
    dispatch(setEditMode({ mode: true }));
  };

  console.log(selectedIdState, "323232");

  return (
    <>
      {" "}
      <div className={` ${isDarkMode ? "dark" : ""}`}>
        <div className="lg:flex h-full">
          <ToastContainer />
          <div className="lg:w-[500px]  dark:bg-gray-800 bg-white  ">
            <DarkMode />
            <MenuExtractionPanel />
            <div className="p-4">
              <h2 className="text-lg font-semibold dark:text-white">
                All Nodes
              </h2>
              {nodes.length > 0 ? (
                nodes.map((node) => {
                  return (
                    <li
                      onClick={() => {
                        console.log(selectedIdState, "323232", node.id);
                        dispatch(setSelecteNodeId({ id: node.id }));
                      }}
                      key={node.id}
                      className={`${
                        selectedIdState === node.id
                          ? "dark:bg-emerald-700 bg-emerald-100"
                          : "dark:bg-gray-700 bg-gray-100"
                      } dark:text-white cursor-pointer flex justify-between my-2 text-gray-700 hover:bg-opacity-75 group items-center px-2 py-2 font-medium rounded-md`}
                    >
                      <div className="flex">
                        <BiCheck className="mr-3 h-6 w-6 flex-shrink-0 text-emerald-300 " />
                        {node.data.label}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDeleteNode(node.id)}
                          title="delete"
                        >
                          <CgClose className="h-6 w-6 text-red-500" />{" "}
                        </button>

                        <button
                          onClick={() => handleDuplicate(node.id)}
                          title="duplicate"
                        >
                          <HiDuplicate className="h-6 w-6 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleEditMode()}
                          title="duplicate"
                        >
                          <BiEdit className="h-6 w-6 text-amber-600" />
                        </button>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p className="dark:text-gray-100 mt-2">No node to display</p>
              )}
            </div>
          </div>
          <div className=" xl:block w-full  ">
            <div className="flex flex-col dark:bg-gray-700 bg-gray-100 ">
              <Header />
              <div className="mx-4 my-2 shadow-sm dark:text-white text-center p-3 bg-white  dark:bg-gray-900 rounded-md">
                <div className="flex gap-3 flex-wrap">
                  <input
                    className="p-2 bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-600 rounded resize-none"
                    placeholder="Add Node"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  />
                  <button
                    className=" p-2 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                    onClick={handleAddNode}
                  >
                    Add Node
                  </button>
                  <button
                    onClick={() => handleDeleteNode(selectedIdState)}
                    title="delete"
                    className={`py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500 ${
                      !selectedIdState && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!selectedIdState}
                  >
                    Delete Node
                  </button>

                  <button
                    onClick={() => handleDuplicate(selectedIdState)}
                    title="duplicate"
                    className={`py-2 px-4 bg-emerald-600 text-white rounded hover:bg-emerald-500 ${
                      !selectedIdState && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!selectedIdState}
                  >
                    Duplicate Node
                  </button>

                  {editMode && (
                    <>
                      {" "}
                      <input
                        className="p-2 bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-600 rounded resize-none"
                        placeholder="Edit Node"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                      />
                      <button
                        className=" p-2 bg-amber-600 text-white rounded hover:bg-amber-500"
                        onClick={() => handleEditNode(selectedIdState)}
                      >
                        Edit Node
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="graph-container p-4 ">
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
                      dispatch(setSelecteNodeId({ id: selectedNodes[0].id }));
                    } else {
                      dispatch(setSelecteNodeId({}));
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
