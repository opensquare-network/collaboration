import Quorum from "./common/quorum";
import QuadraticBalanceOfResult from "./quadraticBalanceOfResult";

export default function QuorumQuadraticBalanceOfResult({
  proposal,
  space,
  voteStatus,
}) {
  return (
    <>
      <Quorum proposal={proposal} space={space} />
      <QuadraticBalanceOfResult
        proposal={proposal}
        space={space}
        voteStatus={voteStatus}
      />
    </>
  );
}
