import styled from "styled-components";
import {
  p_14_normal,
  p_14_medium,
  p_16_semibold,
  p_20_semibold,
} from "../../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import Divider from "../styled/divider";
import ValueDisplay from "../valueDisplay";
import { Flex, FlexBetween } from "@osn/common-ui";
import uniq from "lodash.uniq";
import { getSpaceAssets } from "frontedUtils/getSpaceAssets";
import AssetList from "../assetList";
import { hasBalanceStrategy } from "frontedUtils/strategy";
import Author from "../author";
import { isCollectiveSpace } from "frontedUtils/space";
import { useMemo } from "react";

const Wrapper = styled.div``;

const LogoWrapper = styled(Flex)`
  flex-direction: column;

  // override 'SpaceLogo' margin-right
  > :first-child {
    margin-right: 0;
  }
`;

const LogoName = styled.div`
  ${p_20_semibold};
  margin-top: 16px;
  text-transform: capitalize;
  line-height: 28px;
`;

const LogoSymbol = styled.div`
  ${p_14_normal};
  color: var(--textTertiary);
`;

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailsTitle = styled.div`
  ${p_16_semibold};
`;

const DetailSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailsItem = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: 4px;
  }
  line-height: 24px;
`;

const DetailsLabel = styled.span`
  ${p_14_medium};
  color: var(--textSecondary);
`;

const DetailsValue = styled(FlexBetween)`
  ${p_14_medium};
`;

export default function Details({ space }) {
  const strategyCount = space.weightStrategy?.length || 0;
  const assets = getSpaceAssets(space);
  const whitelist = useMemo(() => {
    if (isCollectiveSpace(space.type)) {
      return space?.members;
    }
    return space?.whitelist;
  }, [space?.members, space.type, space?.whitelist]);
  const memberCount = whitelist?.length || 0;

  return (
    <Wrapper>
      <LogoWrapper>
        <SpaceLogo space={space} />
        <LogoName>{space.name}</LogoName>
        <LogoSymbol>
          {uniq(assets.map(({ symbol }) => symbol)).join(" + ")}
        </LogoSymbol>
      </LogoWrapper>

      <DetailsWrapper>
        <DetailsTitle>About</DetailsTitle>
        <img src="/imgs/icons/info.svg" alt="" />
      </DetailsWrapper>

      <Divider />

      <DetailSections>
        {space.proposeThreshold && (
          <DetailsItem>
            <DetailsLabel>Config</DetailsLabel>
            <DetailsValue>
              <span>Threshold</span>
              <ValueDisplay value={space.proposeThreshold} space={space} />
            </DetailsValue>
            {space.quorum && (
              <DetailsValue>
                <span>Quorum</span>
                <ValueDisplay value={space.quorum} space={space} />
              </DetailsValue>
            )}
          </DetailsItem>
        )}

        <DetailsItem>
          <DetailsLabel>Strategies({strategyCount})</DetailsLabel>
          <div>
            {space.weightStrategy?.map((strategy, index) => (
              <DetailsValue key={index}>{strategy}</DetailsValue>
            ))}
          </div>
        </DetailsItem>

        <DetailsItem>
          <DetailsLabel>Members({memberCount})</DetailsLabel>
          <div className="max-h-[236px] overflow-y-auto">
            {whitelist?.map((address, index) => (
              <DetailsValue key={index}>
                {/* Identity in Polkadot */}
                <Author
                  space={{ ...space, network: "polkadot" }}
                  address={address}
                  size={20}
                  isCollective={isCollectiveSpace(space.type)}
                />
              </DetailsValue>
            ))}
          </div>
        </DetailsItem>

        {hasBalanceStrategy(space?.weightStrategy) && (
          <DetailsItem>
            <DetailsLabel>Assets({assets.length})</DetailsLabel>
            <AssetList assets={assets} />
          </DetailsItem>
        )}
      </DetailSections>
    </Wrapper>
  );
}
