import { createSlice } from "@reduxjs/toolkit";

const newSpaceSlice = createSlice({
  name: "newSpace",
  initialState: {
    currentStep: 0,
  },
  reducers: {
    setCurrentStep: (state, { payload }) => {
      state.currentStep = payload;
    },
  },
});

export const { setCurrentStep } = newSpaceSlice.actions;

export const currentStepSelector = (state) => state.newSpace.currentStep;

export default newSpaceSlice.reducer;
