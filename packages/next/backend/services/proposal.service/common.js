const addProposalStatus = (now) => (p) => ({
  ...p,
  status: now < p.startDate ? "pending" : now < p.endDate ? "active" : "closed",
});

module.exports = {
  addProposalStatus,
};
