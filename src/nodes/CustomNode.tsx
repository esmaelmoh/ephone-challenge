import { Position, Handle } from "reactflow"; // Import HandleProps and Position types
import { useAppDispatch } from "../store/hooks";
import { deleteNode, duplicateNode } from "../store/slices/flow/flowSlice";
import { CgClose } from "react-icons/cg";
import { HiDuplicate } from "react-icons/hi";

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
  return (
    <div className="px-4 py-2 flex border-[1px] shadow-sm rounded-md bg-white  border-neutral-200">
      <div className="flex flex-col gap-1">
        <button onClick={() => handleDeleteNode(id)} title="delete">
          <CgClose className="w-3 h-3 text-red-300" />{" "}
        </button>
        <button onClick={() => handleDuplicate(id)} title="duplicate">
          <HiDuplicate className="w-3 h-3 text-gray-600" />
        </button>
      </div>
      <div className="ml-2">
        <h6 className="text-sm font-medium">{data.label}</h6>
        <p className="text-gray-500 text-xs mt-1">{data.label}</p>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-1 h-1 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-1 h-1 !bg-teal-500"
      />
    </div>
  );
}

export default CustomNode;
