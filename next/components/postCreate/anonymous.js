import styled from "styled-components";
import Row from "@/components/row";
import Toggle from "@osn/common-ui/es/Toggle";
import { useDispatch, useSelector } from "react-redux";
import {
  allowAnonymousProposalSelector,
  setAllowAnonymousProposal,
} from "store/reducers/newProposalSlice";
import { useEffect } from "react";

const Wrapper = styled.div`
  margin-top: 4px !important;
`;

export default function Anonymous() {
  const dispatch = useDispatch();
  const allowAnonymousProposal = useSelector(allowAnonymousProposalSelector);

  useEffect(() => {
    dispatch(setAllowAnonymousProposal(false));
  }, [dispatch]);

  return (
    <Wrapper>
      <Row
        header="Anonymous voting"
        content={
          <Toggle
            on={allowAnonymousProposal}
            setOn={() =>
              dispatch(setAllowAnonymousProposal(!allowAnonymousProposal))
            }
          />
        }
      />
    </Wrapper>
  );
}
