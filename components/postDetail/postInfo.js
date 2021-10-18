import styled from "styled-components";
import moment from "moment";

import { p_16_semibold } from "styles/textStyles";
import ExternalLink from "../externalLink";

const Wrapper = styled.div`
  padding: 40px 32px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  > :not(:first-child) {
    margin-top: 32px;
  }
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
`;

const TitleWrapper = styled.div`
  ${p_16_semibold};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  :not(:first-child) {
    margin-top: 4px;
  }
  > :first-child {
    color: #506176;
    margin-right: 8px;
  }
  > :last-child {
    flex-grow: 1;
    text-align: right;
  }
`;

const TimestampWrapper = styled.div`
  :not(:first-child) {
    margin-top: 4px;
  }
`;

const TimestampItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  > :first-child {
    color: #506176;
  }
  
  span{
    text-align: right;
  }
`;

export default function PostInfo({ data, network }) {
  return (
    <Wrapper>
      <div>
        <TitleWrapper>
          Information
          <img src="/imgs/icons/info.svg" alt="" />
        </TitleWrapper>
        <Divider />
        <div>
          <InfoItem>
            <div>Strategie(s)</div>
            <div>{data?.weightStrategy}</div>
          </InfoItem>
          <InfoItem>
            <div>Snapshot</div>
            <ExternalLink
              href={`https://${network?.network}.subscan.io/block/${data?.snapshotHeight}`}
            >
              {data?.snapshotHeight?.toLocaleString()}
            </ExternalLink>
          </InfoItem>
          {data?.pinHash && (
            <InfoItem>
              <div>IPFS</div>
              <ExternalLink
                href={`https://ipfs-hk.decoo.io/ipfs/${data?.pinHash}`}
              >{`#${data?.pinHash?.slice(0, 7)}`}</ExternalLink>
            </InfoItem>
          )}
        </div>
      </div>
      <div>
        <TitleWrapper>
          Timestamp
          <img src="/imgs/icons/timeline.svg" alt="" />
        </TitleWrapper>
        <Divider />
      </div>
      <TimestampWrapper>
        {data?.createdAt && (
          <TimestampItem>
            <div>Created</div>
            <span>{moment(data.createdAt).format("MMM DD YYYY HH:mm")}</span>
          </TimestampItem>
        )}
        {data?.startDate && (
          <TimestampItem>
            <div>Start date</div>
            <span>{moment(data.startDate).format("MMM DD YYYY HH:mm")}</span>
          </TimestampItem>
        )}
        {data?.endDate && (
          <TimestampItem>
            <div>End date</div>
            <span>{moment(data.endDate).format("MMM DD YYYY HH:mm")}</span>
          </TimestampItem>
        )}
      </TimestampWrapper>
    </Wrapper>
  );
}
