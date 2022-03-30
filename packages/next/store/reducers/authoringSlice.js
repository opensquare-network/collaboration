import { createSlice } from "@reduxjs/toolkit";

const authoringSlice = createSlice({
  name: "authoring",
  initialState: {
    snapshotHeights: [],
    startTimestamp: null,
    endTimestamp: null,
  },
  reducers: {
    setSnapshotHeights: (state, { payload }) => {
      if (payload) {
        state.snapshotHeights = payload;
      }
    },
    setStartTimestamp(state, { payload }) {
      state.startTimestamp = payload;
    },
    setEndTimestamp(state, { payload }) {
      state.endTimestamp = payload;
    },
  },
});

export const { setSnapshotHeights, setStartTimestamp, setEndTimestamp } =
  authoringSlice.actions;

export const snapshotHeightsSelector = (state) =>
  state.authoring.snapshotHeights;
export const authoringStartDateSelector = (state) => {
  const startTime = state.authoring.startTimestamp;
  if (!startTime) {
    return null;
  }

  return new Date(startTime);
};
export const authoringEndDateSelector = (state) => {
  const endTime = state.authoring.endTimestamp;
  if (!endTime) {
    return null;
  }

  return new Date(endTime);
};

export default authoringSlice.reducer;
