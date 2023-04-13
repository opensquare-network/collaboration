import styled from "styled-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJoinedSpace,
  joinedSpacesSelector,
  loginAddressSelector,
} from "store/reducers/accountSlice";
import InternalLink from "../internalLink";
import { shadow_100, shadow_200, makeSquare } from "../../styles/globalCss";
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
  color: #2e343d;
  text-transform: capitalize;
`;

const Symbol = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

const Divider = styled.div`
  min-width: 116px;
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

const ActiveWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

const ActiveCircle = styled.div`
  ${makeSquare(6)};
  border-radius: 50%;
  background: #56ca2f;
  margin-right: 8px;
`;

const Count = styled.span`
  margin-left: auto;
`;

const ActiveCount = styled(Count)`
  color: #506176;
`;

const Wrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  border: 1px solid #f0f3f8;
  ${shadow_100};
  background: #ffffff;
  padding: 24px;
  cursor: pointer;
  width: 200px;

  :hover {
    border-color: #e2e8f0;
    ${shadow_200}
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
    <Wrapper>
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
