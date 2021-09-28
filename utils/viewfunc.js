import nextApi from "../services/nextApi";
import { signApiData } from "../services/chainApi";

export async function createProposal(space, title, content, contentType, choiceType, startDate, endDate, snapshotHeight) {
  const signedData = await signApiData({
    space,
    title,
    content,
    contentType,
    choiceType,
    startDate,
    endDate,
    snapshotHeight,
    version: "1",
  });

  return await nextApi.post(`${chain}/proposals`, signedData);
}

export async function addComment(proposalCid, content, contentType) {
  const signedData = await signApiData({
    proposalCid,
    content,
    contentType,
    version: "1",
  });

  return await nextApi.post(`${chain}/comments`, signedData);
}

export async function addVote(proposalCid, choice) {
  const signedData = await signApiData({
    proposalCid,
    choice,
    version: "1",
  });

  return await nextApi.post(`${chain}/votes`, signedData);
}
