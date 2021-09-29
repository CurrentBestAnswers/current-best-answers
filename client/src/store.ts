import { configureStore } from "@reduxjs/toolkit";
import configuationReducer from "./slice/configurationSlice";
import graphsSlice from "./slice/graphsSlice";

export const store = configureStore({
  reducer: {
    configuation: configuationReducer,
    graph: graphsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
