import styled from "styled-components";
import { useRef } from "react";
import Link from "next/link";
import { useOnClickOutside } from "frontedUtils/hooks";
import Account from "./account";
import { p_18_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowHeaderMenu,
  showHeaderMenuSelector,
} from "../store/reducers/showConnectSlice";
import OsnHeader from "@osn/common-ui/es/Header";

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  > svg {
    margin: 20px -20px;
    @media screen and (min-width: 800px) {
      display: none;
    }
  }
`;

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  ${p_18_semibold};

  > img {
    width: 24px;
    margin-right: 8px;
  }
`;

const AccountWrapper = styled.div`
  @media screen and (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100vw - 40px);
    z-index: 1;
    position: absolute;
    top: 68px;
  }
`;

const IconWrapper = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
    cursor: pointer;
  }
`;

export default function Header({ space }) {
  const dispatch = useDispatch();
  const showMenu = useSelector(showHeaderMenuSelector);

  const ref = useRef();
  useOnClickOutside(ref, (event) => {
    // connect modal is at body level, doesn't contained in the <Header/>, so exclude manually
    if (document?.querySelector(".modals")?.contains(event.target)) {
      return;
    }
    dispatch(setShowHeaderMenu(false));
  });
  const router = useRouter();
  const showConnect = [
    "/space/[space]/proposal/[id]",
    "/space/[space]/create",
  ].includes(router.pathname);

  return (
    <OsnHeader
      logoRender={(logo) => (
        <Link href="/" passHref>
          {logo}
        </Link>
      )}
    >
      <ContentWrapper ref={ref}>
        <AppWrapper>
          <img src="/imgs/icons/apps.svg" alt="" />
          Voting
        </AppWrapper>
        <IconWrapper
          onClick={() => {
            dispatch(setShowHeaderMenu(!showMenu));
          }}
        >
          <img
            src={showMenu ? "/imgs/icons/close.svg" : "/imgs/icons/menu.svg"}
            alt=""
          />
        </IconWrapper>
        {showConnect && (
          <AccountWrapper>
            <Account space={space} />
          </AccountWrapper>
        )}
      </ContentWrapper>
    </OsnHeader>
  );
}
