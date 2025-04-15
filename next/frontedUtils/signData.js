export async function signProposalWith(signApiData, proposal) {
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

export async function signProposalSettingsWith(signApiData, template) {
  const { address, ...data } = template;
  return await signApiData(data, address);
}

export async function signCommentWith(
  signApiData,
  { proposalCid, content, contentType, address, commenterNetwork },
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

export async function signVoteWith(
  signApiData,
  { proposalCid, choices, remark, address, realVoter, voterNetwork },
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

export async function signTerminateWith(
  signApiData,
  { proposalCid, terminatorNetwork, address },
) {
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

export async function signAppendantWith(
  signApiData,
  { proposalCid, content, contentType, address, appenderNetwork },
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
