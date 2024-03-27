import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";

import InternalLink from "./internalLink";
import { h3_36_bold, p_16_semibold } from "../styles/textStyles";
import { useWindowSize } from "../frontedUtils/hooks";
import { setCookie } from "frontedUtils/cookie";
import { loginAddressSelector } from "store/reducers/accountSlice";
import SpaceListItem from "./spaceListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedSpace } from "store/reducers/accountSlice";
import { cn } from "@osn/common-ui";

const Title = styled.div`
  ${h3_36_bold};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SpaceButton = styled.div`
  cursor: pointer;
  ${p_16_semibold};
  color: var(--textSecondary);
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

export default function Space({ spaces, showAllSpace }) {
  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);

  useEffect(() => {
    if (!address) {
      return;
    }
    dispatch(fetchJoinedSpace(address));
  }, [dispatch, address]);

  const [show, setShow] = useState(showAllSpace === "1");
  const [showCount, setShowCount] = useState(5);

  const sortedSpaces = Object.entries(spaces).sort(([, a], [, b]) => {
    return b.proposalsCount - a.proposalsCount;
  });

  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width > 800) {
      setShowCount(5);
    } else {
      setShowCount(2);
    }
  }, [windowSize.width, setShowCount]);

  const setShowAllSpace = useCallback((show) => {
    setShow(show);
    setCookie("showallspace", show ? "1" : "0", 365);
  }, []);

  return (
    <div>
      <TitleWrapper>
        <Title>Space</Title>
        <ButtonWrapper>
          <SpaceButton onClick={() => setShowAllSpace(!show)}>
            {sortedSpaces.length > showCount && show
              ? "Hide Spaces"
              : `All Spaces(${sortedSpaces.length})`}
          </SpaceButton>
        </ButtonWrapper>
      </TitleWrapper>

      <div
        className={cn(
          "grid gap-5",
          "grid-cols-5",
          "max-xl:grid-cols-4",
          "max-lg:grid-cols-3",
          "max-md:grid-cols-2",
          "max-sm:grid-cols-1",
        )}
      >
        {(show ? sortedSpaces : sortedSpaces.slice(0, showCount)).map(
          ([name, space], index) => (
            <InternalLink href={`/space/${name}`} key={index}>
              <SpaceListItem name={name} space={space} />
            </InternalLink>
          ),
        )}
      </div>
    </div>
  );
}
