import { createSlice } from "@reduxjs/toolkit";

import nextApi from "services/nextApi";

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    votes: {},
  },
  reducers: {
    setVote: (state, { payload }) => {
      state.votes[payload.id] = payload.data;
    },
  },
});

export const { setVote } = voteSlice.actions;

export const fetchVote = (cid, space) => async (dispatch) => {
  const { result } = await nextApi.fetch(`${space}/proposal/${cid}/stats`);
  dispatch(setVote({ id: cid, data: result }));
};

export const votesSelector = (state) => state.vote.votes;

export default voteSlice.reducer;
