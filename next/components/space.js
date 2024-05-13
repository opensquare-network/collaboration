import styled from "styled-components";
import { useEffect } from "react";

import InternalLink from "./internalLink";
import { h3_36_bold } from "../styles/textStyles";
import { loginAddressSelector } from "store/reducers/accountSlice";
import SpaceListItem from "./spaceListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedSpace } from "store/reducers/accountSlice";
import { cn } from "@osn/common-ui";
import Pagination from "./pagination";

const Title = styled.div`
  ${h3_36_bold};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export default function Space({ spaces }) {
  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);

  useEffect(() => {
    if (!address) {
      return;
    }
    dispatch(fetchJoinedSpace(address));
  }, [dispatch, address]);

  const sortedSpaces = spaces.items;

  return (
    <div>
      <TitleWrapper>
        <Title>Space</Title>
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
        {(sortedSpaces || []).map((space, index) => (
          <InternalLink href={`/space/${space.id}`} key={index}>
            <SpaceListItem name={space.id} space={space} />
          </InternalLink>
        ))}
      </div>
      <div className="flex justify-center mt-[20px]">
        <Pagination
          page={spaces.page}
          total={spaces.total}
          pageSize={spaces.pageSize}
        />
      </div>
    </div>
  );
}
