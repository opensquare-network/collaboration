import nextApi from "../services/nextApi";
import { signApiData } from "../services/chainApi";

export async function createProposal(
  space,
  title,
  content,
  contentType,
  choiceType,
  choices,
  startDate,
  endDate,
  snapshotHeight
) {
  const signedData = await signApiData({
    space,
    title,
    content,
    contentType,
    choiceType,
    choices,
    startDate,
    endDate,
    snapshotHeight,
    version: "1",
  });

  return await nextApi.post(`${space}/proposals`, signedData);
}

export async function addComment(space, proposalCid, content, contentType) {
  const signedData = await signApiData({
    proposalCid,
    content,
    contentType,
    version: "1",
  });

  return await nextApi.post(`${space}/comments`, signedData);
}

export async function addVote(space, proposalCid, choice) {
  const signedData = await signApiData({
    proposalCid,
    choice,
    version: "1",
  });

  return await nextApi.post(`${space}/votes`, signedData);
}
