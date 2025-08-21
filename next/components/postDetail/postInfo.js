import moment from "moment";

import ExternalLink from "@osn/common-ui/es/ExternalLink";
import { getExplorer } from "../../frontedUtils";
import { ChainIcon } from "components/chainIcon";
import { Tooltip } from "@osn/common-ui";
import SideSectionTitle from "@/components/sideBar/sideSectionTitle";
import AssetList from "../assetList";
import { getSpaceAssets } from "frontedUtils/getSpaceAssets";
import { hasBalanceStrategy } from "frontedUtils/strategy";
import { getChainDisplayName } from "frontedUtils/chain";

import {
  Wrapper,
  Divider,
  InfoItem,
  SnapshotsWrapper,
  TimestampWrapper,
  TimestampItem,
} from "../styled/infoItem";
import PostMembers from "./postMembers";
import { useMemo } from "react";
import { hasWhitelist, isCollectiveSpace } from "frontedUtils/space";

function Snapshot({ space, snapshotHeights }) {
  if (isCollectiveSpace(space?.type) || hasWhitelist(space)) {
    return null;
  }

  return (
    <InfoItem>
      <div>Snapshot</div>
      <SnapshotsWrapper>
        {Object.keys(snapshotHeights).map((networkName) => {
          const height = snapshotHeights[networkName];
          const explorer = getExplorer(networkName);
          const link = `https://${networkName}.${explorer}.io/block/${height}`;
          return (
            <Tooltip
              key={networkName}
              content={`${getChainDisplayName(
                networkName,
              )} ${height.toLocaleString()}`}
              size="fit"
            >
              <div>
                <ExternalLink href={link}>
                  <ChainIcon chainName={networkName} />
                </ExternalLink>
              </div>
            </Tooltip>
          );
        })}
      </SnapshotsWrapper>
    </InfoItem>
  );
}

function PinHash({ pinHash }) {
  return (
    <InfoItem>
      <div>IPFS</div>
      <ExternalLink
        href={`${process.env.NEXT_PUBLIC_API_END_POINT}api/ipfs/files/${pinHash}`}
      >{`#${pinHash?.slice(0, 7)}`}</ExternalLink>
    </InfoItem>
  );
}

// eslint-disable-next-line
export default function PostInfo({ data, space }) {
  const assets = getSpaceAssets(data.networksConfig);

  const whitelist = useMemo(() => {
    if (!space) return null;
    if (isCollectiveSpace(space.type)) {
      return space.members;
    }
    return space.whitelist;
  }, [space]);

  return (
    <Wrapper>
      <div>
        <SideSectionTitle title="Information" img="/imgs/icons/info.svg" />
        <Divider />
        <div>
          <Snapshot space={space} snapshotHeights={data?.snapshotHeights} />
          {data?.pinHash && <PinHash pinHash={data?.pinHash} />}
          <PostMembers whitelist={whitelist} data={data} />
        </div>
      </div>
      {hasBalanceStrategy(space?.weightStrategy) && (
        <div>
          <SideSectionTitle
            title={`Assets(${assets.length})`}
            img="/imgs/icons/asset.svg"
          />
          <Divider />
          <AssetList assets={assets} />
        </div>
      )}
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
