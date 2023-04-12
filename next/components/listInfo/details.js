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
import { ChainIcon, Flex, FlexBetween } from "@osn/common-ui";
import Tooltip from "../tooltip";
import SymbolIcon from "@/components/symbolIcon";

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
  color: #a1a8b3;
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
  color: #506176;
`;

const DetailsValue = styled(FlexBetween)`
  ${p_14_medium};
`;

const voteText = (n) => `${n} ${n === 1 ? "vote" : "votes"}`;

export default function Details({ space }) {
  const strategyCount = space.weightStrategy?.length || 0;

  const symbolMultiplier = {};
  const symbolSet = new Set();

  if (space.networks?.length > 0) {
    for (const network of space.networks) {
      if (network.assets?.length > 0) {
        for (const asset of network.assets) {
          const symbol = asset?.symbol ?? network?.symbol ?? space?.symbol;
          const multiplier = asset?.multiplier ?? network?.multiplier;
          const networkName = network?.network ?? space?.network;
          symbolSet.add(`${networkName}/${symbol}`);
          symbolMultiplier[`${networkName}/${symbol}`] = multiplier;
        }
      } else {
        const symbol = network?.symbol ?? space?.symbol;
        const multiplier = network?.multiplier;
        const networkName = network?.network ?? space?.network;
        symbolSet.add(`${networkName}/${symbol}`);
        symbolMultiplier[`${networkName}/${symbol}`] = multiplier;
      }
    }
  } else {
    console.log(4);
    const symbol = space?.symbol;
    const network = space?.network;
    symbolSet.add(`${network}/${symbol}`);
  }

  const symbols = [...symbolSet].map((item) => {
    const [network, symbol] = item.split("/");
    return { network, symbol };
  });

  return (
    <Wrapper>
      <LogoWrapper>
        <SpaceLogo spaceId={space.id} />
        <LogoName>{space.name}</LogoName>
        <LogoSymbol>
          {symbols.map(({ symbol }) => symbol).join(" + ")}
        </LogoSymbol>
      </LogoWrapper>

      <DetailsWrapper>
        <DetailsTitle>About</DetailsTitle>
        <img src="/imgs/icons/info.svg" alt="" />
      </DetailsWrapper>

      <Divider />

      <DetailSections>
        <DetailsItem>
          <DetailsLabel>Config</DetailsLabel>
          <DetailsValue>
            <span>Threshold</span>
            <ValueDisplay value={space.proposeThreshold} space={space} />
          </DetailsValue>
          <DetailsValue>
            <span>Delegation</span>
            <span>Democracy</span>
          </DetailsValue>
        </DetailsItem>

        <DetailsItem>
          <DetailsLabel>Strategies({strategyCount})</DetailsLabel>
          <div>
            {space.weightStrategy?.map((strategy, index) => (
              <DetailsValue key={index}>{strategy}</DetailsValue>
            ))}
          </div>
        </DetailsItem>

        <DetailsItem>
          <DetailsLabel>Assets({symbols.length})</DetailsLabel>
          {symbols?.map(({ network, symbol }, index) => (
            <DetailsValue key={index}>
              <Flex style={{ gap: "8px" }}>
                <ChainIcon chainName={network} size={20} />
                <span>{symbol}</span>
              </Flex>
              <Tooltip
                content={`1 ${symbol} = ${voteText(
                  symbolMultiplier[`${network}/${symbol}`] ?? 1,
                )}`}
              >
                <div>{`x${symbolMultiplier[`${network}/${symbol}`] ?? 1}`}</div>
              </Tooltip>
            </DetailsValue>
          ))}
        </DetailsItem>
      </DetailSections>
    </Wrapper>
  );
}
