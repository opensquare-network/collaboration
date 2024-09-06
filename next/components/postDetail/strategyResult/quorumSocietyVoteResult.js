import SocietyQuorum from "./common/societyQuorum";
import SocietyVoteResult from "./societyVoteResult";

export default function QuorumSocietyVoteResult({ proposal, voteStatus }) {
  return (
    <>
      {proposal?.networksConfig?.societyQuorum && (
        <SocietyQuorum proposal={proposal} />
      )}
      <SocietyVoteResult proposal={proposal} voteStatus={voteStatus} />
    </>
  );
}
