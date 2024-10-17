import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { votesSelector, fetchVote } from "store/reducers/voteSlice";
import { InnerPostResult } from "../postDetail/postResults";
import { ResultWrapper, Triangle, TriangleTop } from "./popup";

export default function SocietyPopup({ data, isTop, space }) {
  const votes = useSelector(votesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.cid && !votes[data?.cid]) {
      dispatch(fetchVote(data?.cid, data?.space));
    }
  }, [votes, data, dispatch]);

  const vote = votes[data?.cid];

  const votesCount = vote?.reduce(
    (pre, cur) => pre + Number(cur.votesCount ?? 0),
    0,
  );
  const totalSocietyVote = vote?.reduce(
    (pre, cur) => pre + Number(cur.societyVote ?? 0),
    0,
  );
  const totalOnePersonOneVote = vote?.reduce(
    (pre, cur) => pre + Number(cur.onePersonOneVote ?? 0),
    0,
  );

  return (
    <ResultWrapper isTop={isTop} className="shadow-shadowPopup">
      <InnerPostResult
        data={{
          ...data,
          votesCount,
          votedWeights: {
            societyVote: totalSocietyVote,
            onePersonOneVote: totalOnePersonOneVote,
          },
        }}
        voteStatus={vote}
        space={space}
      />
      {isTop ? <Triangle /> : <TriangleTop />}
    </ResultWrapper>
  );
}
