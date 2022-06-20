const status = Object.freeze({
  terminated: "terminated",
  pending: "pending",
  active: "active",
  closed: "closed",
});

function getProposalStatus(proposal = {}) {
  const { terminated, startDate, endDate } = proposal;
  if (terminated) {
    return status.terminated;
  }

  const now = Date.now();
  if (now < startDate) {
    return status.pending;
  } else if (now < endDate) {
    return status.active;
  } else {
    return status.closed;
  }
}

module.exports = {
  getProposalStatus,
};
