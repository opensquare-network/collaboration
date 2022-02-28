import { createSlice } from "@reduxjs/toolkit";

const snapshotHeightSlice = createSlice({
  name: "snapshotHeight",
  initialState: {
    snapshotHeights: [],
  },
  reducers: {
    setSnapshotsHeight: (state, { payload }) => {
      if (payload) {
        state.snapshotHeights = payload;
      }
    },
  },
});

export const { setSnapshotsHeight } = snapshotHeightSlice.actions;

export const snapshotHeightsSelector = (state) =>
  state.snapshotHeight.snapshotHeights;

export default snapshotHeightSlice.reducer;
