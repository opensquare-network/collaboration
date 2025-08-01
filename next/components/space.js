import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { h3_36_bold } from "../styles/textStyles";
import { loginAddressSelector } from "store/reducers/accountSlice";
import SpaceListItem from "./spaceListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedSpace } from "store/reducers/accountSlice";
import { cn, Pagination } from "@osn/common-ui";
import SearchForm from "./searchForm";
import useSpaces from "hooks/useSpaces";

const Title = styled.div`
  ${h3_36_bold};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const EmptyResult = styled.div`
  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);

  :hover {
    border-color: var(--strokeActionDefault);
    box-shadow: var(--shadowCardHover);
  }
`;

export default function Space({ spaces: initialSpaces }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { spaces, isLoading } = useSpaces({
    initialSpaces,
    search,
    page,
  });
  const dispatch = useDispatch();
  const address = useSelector(loginAddressSelector);

  useEffect(() => {
    if (!address) {
      return;
    }
    dispatch(fetchJoinedSpace(address));
  }, [dispatch, address]);

  const handleSearch = useCallback((value) => {
    setPage(1);
    setSearch(value);
  }, []);

  return (
    <div>
      <TitleWrapper>
        <Title>Space</Title>
        <SearchForm
          placeholder="Search for space"
          onInput={handleSearch}
          loading={isLoading}
        />
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
        {(spaces.items || []).map((space, index) => (
          <Link href={`/space/${space.id}`} key={index}>
            <SpaceListItem name={space.id} space={space} />
          </Link>
        ))}
        {spaces.items.length === 0 && (
          <EmptyResult className="col-span-full h-[130px] flex items-center justify-center bg-white text-textTertiary">
            Result not found
          </EmptyResult>
        )}
      </div>
      <div className="flex justify-center mt-[20px]">
        <Pagination
          page={page}
          setPage={setPage}
          total={spaces.total}
          pageSize={spaces.pageSize}
        />
      </div>
    </div>
  );
}
