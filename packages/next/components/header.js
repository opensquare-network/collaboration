import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Container from "./container";
import { useOnClickOutside, useWindowSize } from "frontedUtils/hooks";
import Account from "./account";
import { p_18_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";

const Wrapper = styled.header`
  flex: 0 0 auto;
  background: #ffffff;
  position: relative;
`;

const ContentWrapper = styled.div`
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 80px;
  @media screen and (max-width: 800px) {
    padding: 15px 20px;
    min-height: 62px;
  }
  > svg {
    margin: 20px -20px;
    @media screen and (min-width: 800px) {
      display: none;
    }
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 200px;
  height: 36px;
  background-image: url("/imgs/opensquare-logo.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding: 15px 20px;
    width: 48px;
    height: 32px;
    background-image: url("/imgs/opensquare-logo-icon.svg");
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #e2e8f0;
  margin: 0 16px;
`;

const DividerLine = styled.svg`
  background: #f0f3f8;
  height: 1px;
  width: 100vw;
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
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
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, (event) => {
    // connect modal is at body level, doesn't contained in the <Header/>, so exclude manually
    if (document?.querySelector(".modals")?.contains(event.target)) {
      return;
    }
    setShowMenu(false);
  });
  const router = useRouter();
  const showConnect = [
    "/space/[space]/proposal/[id]",
    "/space/[space]/create"
  ].includes(router.pathname);

  return (
    <Wrapper>
      <Container>
        <ContentWrapper ref={ref}>
          <LeftWrapper>
            <Link href="/" passHref>
              <Logo />
            </Link>
            <Divider />
            <AppWrapper>
              <img src="/imgs/icons/apps.svg" alt="" />
              Voting
            </AppWrapper>
          </LeftWrapper>
          <IconWrapper
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <img
              src={showMenu ? "/imgs/icons/close.svg" : "/imgs/icons/menu.svg"}
              alt=""
            />
          </IconWrapper>
          {showConnect && <AccountWrapper
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <Account
              space={space}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          </AccountWrapper>}
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
