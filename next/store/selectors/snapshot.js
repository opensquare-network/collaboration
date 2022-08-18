import { createSelector } from "@reduxjs/toolkit";
import { loginNetworkSelector } from "../reducers/accountSlice";
import { snapshotHeightsSelector } from "../reducers/authoringSlice";

export const loginNetworkSnapshotSelector = createSelector(
  loginNetworkSelector,
  snapshotHeightsSelector,
  (loginNetwork, snapshotHeights) => {
    return (
      (snapshotHeights || []).find(
        (snapshotHeight) => loginNetwork?.network === snapshotHeight.network
      )?.height || 0
    );
  }
);
