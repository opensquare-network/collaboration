import styled from "styled-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJoinedSpace,
  joinedSpacesSelector,
  loginAddressSelector,
} from "store/reducers/accountSlice";
import InternalLink from "../internalLink";
import { makeSquare } from "../../styles/globalCss";
import { p_18_semibold } from "../../styles/textStyles";
import SpaceLogo from "@/components/spaceLogo";
import nextApi from "services/nextApi";
import JoinButton from "./joinButton";

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  ${makeSquare(64)};
  margin-bottom: 16px;
`;

const Name = styled.div`
  white-space: nowrap;
  ${p_18_semibold};
  color: var(--textPrimary);
  text-transform: capitalize;
`;

const Symbol = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: var(--textTertiary);
`;

const Divider = styled.div`
  min-width: 116px;
  height: 1px;
  background-color: var(--fillBgTertiary);
  margin: 12px 0;
`;

const ActiveWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  color: var(--textTertiary);
`;

const ActiveCircle = styled.div`
  ${makeSquare(6)};
  border-radius: 50%;
  background-color: var(--accentGreen500a);
  margin-right: 8px;
`;

const Count = styled.span`
  margin-left: auto;
`;

const ActiveCount = styled(Count)`
  color: var(--textSecondary);
`;

const Wrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);
  background: var(--fillBgPrimary);
  padding: 24px;
  cursor: pointer;
  min-width: 200px;

  :hover {
    border-color: var(--strokeActionDefault);
    box-shadow: var(--shadowCardHover);
  }
`;

const JoinButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 15px;
`;

export default function SpaceListItem({ name, space }) {
  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);
  const joinedSpaces = useSelector(joinedSpacesSelector);

  const isSpaceJoined = useCallback(
    (spaceName) => !!joinedSpaces.find((item) => item.space === spaceName),
    [joinedSpaces],
  );

  const joinSpace = useCallback(
    async (spaceName) => {
      if (!address) {
        return;
      }
      const { result } = await nextApi.post(`account/${address}/spaces`, {
        space: spaceName,
      });
      if (result) {
        dispatch(fetchJoinedSpace(address));
      }
    },
    [dispatch, address],
  );

  const leaveSpace = useCallback(
    async (spaceName) => {
      if (!address) {
        return;
      }
      const { result } = await nextApi.delete(
        `account/${address}/spaces/${spaceName}`,
      );
      if (result) {
        dispatch(fetchJoinedSpace(address));
      }
    },
    [dispatch, address],
  );

  return (
    <Wrapper role="button">
      <IconWrapper>
        <Icon>
          <SpaceLogo space={space} />
        </Icon>
        <Name>{space.name}</Name>
        <Symbol>{space.symbol ?? "-"}</Symbol>
      </IconWrapper>
      <Divider />
      <ActiveWrapper>
        <ActiveCircle />
        <InternalLink href={`/space/${name}?tab=active`}>Active</InternalLink>
        <Count>
          <ActiveCount>{space.activeProposalsCount ?? 0}</ActiveCount>/
          {space.proposalsCount}
        </Count>
      </ActiveWrapper>
      <JoinButtonWrapper
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {!isSpaceJoined(name) ? (
          <JoinButton joined={false} onClick={() => joinSpace(name)} />
        ) : (
          <JoinButton joined={true} onClick={() => leaveSpace(name)} />
        )}
      </JoinButtonWrapper>
    </Wrapper>
  );
}
