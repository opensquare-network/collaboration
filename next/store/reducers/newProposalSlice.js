import { createSlice } from "@reduxjs/toolkit";

const newProposalSlice = createSlice({
  name: "newProposal",
  initialState: {
    allowAnonymousProposal: false,
  },
  reducers: {
    setAllowAnonymousProposal(state, { payload }) {
      state.allowAnonymousProposal = payload;
    },
  },
});

export const { setAllowAnonymousProposal } = newProposalSlice.actions;

export const allowAnonymousProposalSelector = (state) =>
  state.newProposal.allowAnonymousProposal;

export default newProposalSlice.reducer;
