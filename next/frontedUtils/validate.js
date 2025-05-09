export function validateProposalSettings(formData) {
  const fields = ["space", "proposalTemplate", "address"];
  for (let field of fields) {
    if (!formData[field] || formData[field]?.length === 0) {
      return `${field} must not be empty.`;
    }
  }
  return false;
}

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
    return "End date should be greater than start date!";
  }
  if (!(formData.choices.length >= 2)) {
    return "Choices must be more than one.";
  }
  if (formData.choices.length !== new Set(formData.choices).size) {
    return "Every choice must be unique.";
  }
  const now = new Date().getTime();
  if (formData.endDate <= now) {
    return "End date should be greater than current time!";
  }
  return false;
}
