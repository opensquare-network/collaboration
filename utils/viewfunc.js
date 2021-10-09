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
  snapshotHeight,
  address,
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
  }, address);

  return await nextApi.post(`${space}/proposals`, signedData);
}

export async function addComment(space, proposalCid, content, contentType, address) {
  const signedData = await signApiData({
    proposalCid,
    content,
    contentType,
    version: "1",
  }, address);

  return await nextApi.post(`${space}/comments`, signedData);
}

export async function addVote(space, proposalCid, choice, address, realVoter) {
  const signedData = await signApiData({
    proposalCid,
    choice,
    realVoter,
    version: "1",
  }, address);

  return await nextApi.post(`${space}/votes`, signedData);
}
