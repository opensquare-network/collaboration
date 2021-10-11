import styled from "styled-components";

import Author from "components/author";
import Pagination from "components/pagination";
import { isEmpty, bigNumber2Locale, fromAssetUnit } from "utils";

const Item = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #f0f3f8;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
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
`;

const PaginationWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BalanceWrapper = styled.div`
  display: flex;
`;

export default function PostVotes({ network, votes }) {
  // console.log({ votes, network });

  return (
    <div>
      {(votes?.items || []).map((item, index) => (
        <Item key={index}>
          <InfoWrapper>
            <Author address={item.address} size={20} />
            <div>
              <Label>Vote</Label>
              <span>{item.choice}</span>
            </div>
            <BalanceWrapper>{`${bigNumber2Locale(
              fromAssetUnit(
                item.weights.balanceOf.$numberDecimal,
                network?.decimals
              )
            )} ${network?.symbol}`}</BalanceWrapper>
          </InfoWrapper>
          {item.remark && (
            <ContentWrapper>
              <Content>{item.remark}</Content>
            </ContentWrapper>
          )}
        </Item>
      ))}
      <PaginationWrapper>
        <Pagination
          page={votes.page}
          total={votes.total}
          pageSize={votes.pageSize}
        />
      </PaginationWrapper>
    </div>
  );
}
