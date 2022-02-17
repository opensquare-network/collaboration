import styled from "styled-components";

import Author from "components/author";
import ExternalLink from "components/externalLink";
import Ellipsis from "@/components/ellipsis";
import Flex from "@/components/flex";
import {
  abbreviateBigNumber,
  getEffectiveNumbers,
} from "frontedUtils";
import ValueDisplay from "@/components/valueDisplay";

const Item = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #f0f3f8;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  line-height: 24px;
`;

const Label = styled.span`
  color: #a1a8b3;
  margin-right: 8px;
`;

const ContentWrapper = styled.div`
  padding: 8px 0 0 28px;
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Content = styled.div`
  line-height: 24px;
  color: rgba(80, 97, 118, 1);
`;

const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const Square = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: url("/imgs/icons/ipfs.svg");
  :hover {
    background: url("/imgs/icons/ipfs-active.svg");
  }
`;

const EqualWrapper = styled.div`
  width: 33%;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  :last-child {
    justify-content: flex-end;
  }
`;

const MyVoteTag = styled.div`
  background: linear-gradient(270deg, #04d2c5 2.06%, #6848ff 100%);
  border-radius: 9px;
  padding: 2px 10px;
  color: #ffffff;
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  align-self: center;
  white-space: nowrap;
  margin-left: 8px;
`;

export default function PostVotes({ data, space, isMyVote = false }) {
  return (
    <Item>
      <InfoWrapper>
        <EqualWrapper>
          <Author
            address={data.voter ?? data.address}
            space={space}
            size={20}
          />
          {isMyVote && <MyVoteTag>My Vote</MyVoteTag>}
        </EqualWrapper>
        <EqualWrapper>
          <Flex style={{ maxWidth: "30vw" }}>
            <Label>Vote</Label>
            <Ellipsis width={189}>{data.choice}</Ellipsis>
          </Flex>
        </EqualWrapper>
        <EqualWrapper>
          <BalanceWrapper>
            {
              (getEffectiveNumbers(data.weights?.balanceOf) !== getEffectiveNumbers(abbreviateBigNumber(data.weights?.balanceOf)))
              && <span>≈</span>
            }
            <div style={{marginLeft:4}}>
              <ValueDisplay value={data.weights?.balanceOf} space={space}/>
            </div>
            {data?.pinHash && (
              <ExternalLink
                href={`https://ipfs-hk.decoo.io/ipfs/${data.pinHash}`}
              >
                <Square />
              </ExternalLink>
            )}
          </BalanceWrapper>
        </EqualWrapper>
      </InfoWrapper>
      {data.remark && (
        <ContentWrapper>
          <Content>{data.remark}</Content>
        </ContentWrapper>
      )}
    </Item>
  );
}
