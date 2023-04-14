import nextApi from "../services/nextApi";
import { signApiData } from "../services/chainApi";

export function validateProposal(formData) {
  const fields = [
    "space",
    "title",
    "content",
    "contentType",
    "choiceType",
    "choices",
    "startDate",
    "endDate",
    "snapshotHeights",
    "address",
    "proposerNetwork",
  ];
  for (let field of fields) {
    if (!formData[field] || formData[field]?.length === 0) {
      return `${field} must not be empty.`;
    }
  }
  if (!(formData.endDate > formData.startDate)) {
    return `End date should be greater than start date!`;
  }
  if (!(formData.choices.length >= 2)) {
    return `Choices must be more than one.`;
  }
  if (formData.choices.length !== new Set(formData.choices).size) {
    return `Every choice must be unique.`;
  }
  const now = new Date().getTime();
  if (formData.endDate <= now) {
    return `End date should be greater than current time!`;
  }
  return false;
}

export async function createProposal(proposal) {
  const { address, ...data } = proposal;
  const signedData = await signApiData(
    {
      ...data,
      // Version 2: multi space network support
      // Version 3: banner supported
      // Version 4: multi assets support
      version: "4",
    },
    address,
  );

  return await nextApi.post(`${proposal.space}/proposals`, signedData);
}

export async function signProposal(proposal) {
  const { address, ...data } = proposal;
  return await signApiData(
    {
      ...data,
      // Version 2: multi space network support
      // Version 3: banner supported
      // Version 4: multi assets support
      // Version 5, add networks configuration
      version: "5",
    },
    address,
  );
}

export async function addComment(
  space,
  proposalCid,
  content,
  contentType,
  address,
  commenterNetwork,
) {
  const signedData = await signApiData(
    {
      proposalCid,
      content,
      contentType,
      commenterNetwork,
      version: "2",
    },
    address,
  );

  return await nextApi.post(`${space}/comments`, signedData);
}

export async function signComment(
  space,
  proposalCid,
  content,
  contentType,
  address,
  commenterNetwork,
) {
  return await signApiData(
    {
      proposalCid,
      content,
      contentType,
      commenterNetwork,
      version: "2",
    },
    address,
  );
}

export async function addVote(
  space,
  proposalCid,
  choices,
  remark,
  address,
  realVoter,
  voterNetwork,
) {
  const signedData = await signApiData(
    {
      proposalCid,
      choices,
      remark,
      realVoter,
      voterNetwork,
      version: "4",
    },
    address,
  );

  return await nextApi.post(`${space}/votes`, signedData);
}

export async function signVote(
  space,
  proposalCid,
  choices,
  remark,
  address,
  realVoter,
  voterNetwork,
) {
  return await signApiData(
    {
      proposalCid,
      choices,
      remark,
      realVoter,
      voterNetwork,
      // Version 2: multi space network support
      // Version 3: multi choices support
      // Version 4: multi assets support
      version: "4",
    },
    address,
  );
}

export async function signTerminate({
  proposalCid,
  terminatorNetwork,
  address,
}) {
  return await signApiData(
    {
      action: "terminate",
      proposalCid,
      terminatorNetwork,
      version: "2",
    },
    address,
  );
}

export async function signAppendant(
  space,
  proposalCid,
  content,
  contentType,
  address,
  appenderNetwork,
) {
  return await signApiData(
    {
      proposalCid,
      content,
      contentType,
      appenderNetwork,
      version: "2",
    },
    address,
  );
}
