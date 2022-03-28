import styled, { css } from "styled-components";
import ExternalLink from "components/externalLink";
import Ellipsis from "@/components/ellipsis";
import Flex from "@/components/flex";
import ValueDisplay from "@/components/valueDisplay";
import Voter from "@/components/role/voter";

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
  .center {
    justify-content: center;
  }
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
  width: 20px;
  height: 20px;
  background: url("/imgs/icons/ipfs.svg");
  ${(p) =>
    !p.noHover &&
    css`
      cursor: pointer;
      :hover {
        background: url("/imgs/icons/ipfs-active.svg");
      }
    `}
`;

const EqualWrapper = styled.div`
  width: 33%;
  display: flex;
  overflow: visible;
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
  const spaceSupportMultiChain = space?.networks?.length > 1;
  return (
    <Item>
      <InfoWrapper>
        <EqualWrapper>
          <Voter
            address={data.voter ?? data.address}
            network={data.voterNetwork}
            showNetwork={spaceSupportMultiChain}
          />
          {isMyVote && <MyVoteTag>My Vote</MyVoteTag>}
        </EqualWrapper>
        <EqualWrapper className="center">
          <Flex style={{ maxWidth: "30vw" }}>
            <Label>Vote</Label>
            <Ellipsis width={189}>{data.choice}</Ellipsis>
          </Flex>
        </EqualWrapper>
        <EqualWrapper>
          <BalanceWrapper>
            <ValueDisplay
              value={data.weights?.balanceOf}
              space={space}
              showAEM={true}
            />
            {data?.pinHash ? (
              <ExternalLink
                href={`https://ipfs-hk.decoo.io/ipfs/${data.pinHash}`}
              >
                <Square />
              </ExternalLink>
            ) : (
              <Square noHover={true} />
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
