import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme/themeSlice";
import counterReducer from "./slices/flow/flowSlice";
export const store = configureStore({
  reducer: {
    nodes: counterReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
