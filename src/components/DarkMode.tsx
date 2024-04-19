import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleMode } from "../store/slices/theme/themeSlice";

const DarkMode = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleMode());
  };

  return (
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
  );
};

export default DarkMode;
