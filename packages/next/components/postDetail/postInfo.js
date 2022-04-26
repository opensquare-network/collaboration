import styled from "styled-components";
import moment from "moment";

import ExternalLink from "@osn/common-ui/es/ExternalLink";
import { capitalize, getExplorer } from "../../frontedUtils";
import ChainIcon from "@/components/chain/chainIcon";
import Tooltip from "@/components/tooltip";
import Panel from "@/components/postDetail/panel";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";

const Wrapper = styled(Panel)`
  > :not(:first-child) {
    margin-top: 20px;
  }
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

  > :first-child {
    color: #506176;
    margin-right: 8px;
  }

  > :last-child {
    flex-grow: 1;
    text-align: right;
    justify-content: end;
  }
`;

const TimestampWrapper = styled.div``;

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

  span {
    text-align: right;
  }
`;

const SnapshotsWrapper = styled.div`
  display: flex;
  justify-content: end;
  > div {
    line-height: 0;
  }

  & > div:not(:first-child) {
    margin-left: 4px;
  }
`;

export default function PostInfo({ data, space }) {
  return (
    <Wrapper>
      <div>
        <SideSectionTitle title="Information" img="/imgs/icons/info.svg" />
        <Divider />
        <div>
          <InfoItem>
            <div>Snapshot</div>
            <SnapshotsWrapper>
              {Object.keys(data.snapshotHeights).map((networkName) => {
                const height = data.snapshotHeights[networkName];
                const explorer = getExplorer(networkName);
                const link = `https://${networkName}.${explorer}.io/block/${height}`;
                return (
                  <Tooltip
                    key={networkName}
                    content={`${capitalize(
                      networkName
                    )} ${height.toLocaleString()}`}
                    size="fit"
                  >
                    <ExternalLink href={link}>
                      <ChainIcon chainName={networkName} />
                    </ExternalLink>
                  </Tooltip>
                );
              })}
            </SnapshotsWrapper>
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
        <SideSectionTitle title="Timestamp" img="/imgs/icons/timeline.svg" />
        <Divider />
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
      </div>
    </Wrapper>
  );
}
