import BalanceOfResult from "./balanceOfResult";
import Quorum from "./common/quorum";

export default function QuorumBalanceOfResult({ proposal, space, voteStatus }) {
  return (
    <>
      <Quorum proposal={proposal} space={space} />
      <BalanceOfResult
        proposal={proposal}
        space={space}
        voteStatus={voteStatus}
      />
    </>
  );
}
