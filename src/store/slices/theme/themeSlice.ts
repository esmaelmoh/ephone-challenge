import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isDarkMode: boolean;
}

const initialState: UIState = {
  isDarkMode:
    localStorage.getItem("isDarkMode") !== undefined
      ? JSON.parse(localStorage.getItem("isDarkMode")!)
      : false, // light mode is the default
};

export const uiSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleMode } = uiSlice.actions;
export default uiSlice.reducer;
