// MenuExtractionPanel.tsx

import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addNode } from "../store/slices/flow/flowSlice";
import { BiCheck } from "react-icons/bi";
import { extractMenuItems } from "../utils/menuExtraction";

const MenuExtractionPanel = () => {
  const [text, setText] = useState("");
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [noItemsMessage, setNoItemsMessage] = useState("");
  const dispatch = useAppDispatch();

  const handleExtract = () => {
    const extractedItems = extractMenuItems(text);
    console.log(extractedItems);

    if (extractedItems.length === 0) {
      setNoItemsMessage("No valid menu items found");
      setMenuItems([]);
    } else {
      setMenuItems(extractedItems);
      setNoItemsMessage("");

      extractedItems.forEach((item) => {
        dispatch(addNode({ id: `${Math.random() * 400}`, label: item })); // Dispatch action with extracted menu item as label
      });
    }
    setText("");
  };
  return (
    <div className="flex flex-col w-full p-4 ">
      <textarea
        className="h-64 p-2 bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-600 rounded resize-none"
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-4 p-2 bg-emerald-600 text-white rounded hover:bg-emerald-500"
        onClick={handleExtract}
      >
        Extract
      </button>
      {menuItems.length > 0 && (
        <div className="mt-6  rounded p-2 ">
          <h2 className="text-lg mb-4 font-normal dark:text-white text-gray-700">
            Extracted Menu Items:
          </h2>
          <ul className="list-disc list-inside">
            {menuItems.map((item) => (
              <li
                key={item}
                className={
                  "text-white my-2 bg-gray-600 hover:bg-opacity-75 group flex items-center px-2 py-2  font-medium rounded-md"
                }
              >
                <BiCheck className="mr-3 h-6 w-6 flex-shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {noItemsMessage && <p className="mt-4 text-red-500">{noItemsMessage}</p>}
    </div>
  );
};

export default MenuExtractionPanel;
