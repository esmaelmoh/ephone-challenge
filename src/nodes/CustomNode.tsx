import { Position, Handle } from "reactflow";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteNode,
  duplicateNode,
  setEditMode,
} from "../store/slices/flow/flowSlice";
import { CgClose } from "react-icons/cg";
import { HiDuplicate } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";

type CustomNodeProps = {
  id: string;
  data: {
    label: string;
  };
};

function CustomNode({ data, id }: CustomNodeProps) {
  const dispatch = useAppDispatch();

  const handleDeleteNode = (id: string) => {
    console.log(id, "9854378");
    dispatch(deleteNode(id));
  };
  const handleDuplicate = (id: string) => {
    console.log(id, "9854378");
    dispatch(duplicateNode(id));
  };
  const handleEditMode = () => {
    dispatch(setEditMode({ mode: true }));
  };

  const selectedNodeId = useAppSelector((state) => state.nodes.selectedNodeId);

  console.log(selectedNodeId, "esmael ", id);
  return (
    <div
      className={`${
        selectedNodeId === id ? "border-amber-500" : "border-neutral-200"
      } px-4 py-2 flex border-[1px] shadow-sm rounded-md bg-white`}
    >
      <button onClick={() => handleDeleteNode(id)} title="delete">
        <CgClose className="w-3 h-3 text-red-500" />{" "}
      </button>
      <div className="mx-3">
        <h6 className="text-sm font-medium">{data.label}</h6>
      </div>
      <button onClick={() => handleDuplicate(id)} title="duplicate">
        <HiDuplicate className="w-3 h-3 text-gray-600" />
      </button>
      <button onClick={handleEditMode} title="duplicate">
        <BiEdit className="w-3 h-3 text-amber-600" />
      </button>

      <Handle
        type="target"
        position={Position.Left}
        className="w-1 h-1 !bg-emerald-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-1 h-1 !bg-emerald-500"
      />
    </div>
  );
}

export default CustomNode;
