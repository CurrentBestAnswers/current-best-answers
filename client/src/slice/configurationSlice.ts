import { createSlice } from "@reduxjs/toolkit";

export type ConfiguationState = {
  showBranchQs: boolean;
  showArchive: boolean;
}

const initialState: ConfiguationState = {
  showBranchQs: false,
  showArchive: false,
};

export const configuationSlice = createSlice({
  name: "configuation",
  initialState,
  reducers: {
    toggleShowBranchQs: (state) => {
      state.showBranchQs = !state.showBranchQs;
    },
    toggleShowArchive: (state) => {
      state.showArchive = !state.showArchive;
    },
  },
});

export const { toggleShowBranchQs, toggleShowArchive } = configuationSlice.actions;

export default configuationSlice.reducer;
