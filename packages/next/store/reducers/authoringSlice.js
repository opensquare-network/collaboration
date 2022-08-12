import { createSlice } from "@reduxjs/toolkit";

const authoringSlice = createSlice({
  name: "authoring",
  initialState: {
    snapshotHeights: [],
    startTimestamp: null,
    endTimestamp: null,
    choiceTypeIndex: 0,
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
    setchoiceTypeIndex(state, { payload }) {
      state.choiceTypeIndex = payload;
    },
  },
});

export const {
  setSnapshotHeights,
  setStartTimestamp,
  setEndTimestamp,
  setchoiceTypeIndex,
} = authoringSlice.actions;

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
export const choiceTypeIndexSelector = (state) =>
  state.authoring.choiceTypeIndex;

export default authoringSlice.reducer;
