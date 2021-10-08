import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import Container from "./container";
import { useOnClickOutside, useWindowSize } from "utils/hooks";
import Account from "./account";
import { p_18_semibold } from "../styles/textStyles";

const Wrapper = styled.header`
  flex: 0 0 auto;
  background: #ffffff;
  position: relative;
`;

const ContentWrapper = styled.div`
  padding: 20px 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 1144px) {
    padding: 20px 32px;
  }
  @media screen and (max-width: 800px) {
    padding: 15px 20px;
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
  width: 226px;
  height: 40px;
  background-image: url("/imgs/opensquare-logo.svg");
  background-position: center;
  background-repeat: no-repeat;
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

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();
  //todo : this line seems to be buggy
  // useOnClickOutside(ref, () => setShowMenu(false));

  return (
    <Wrapper>
      <Container>
        <ContentWrapper ref={ref} >
          <LeftWrapper>
            <Link href="/" passHref>
              <Logo/>
            </Link>
            <Divider/>
            <AppWrapper>
              <img src="/imgs/icons/apps.svg" alt=""/>
              Voting
            </AppWrapper>
          </LeftWrapper>
          <IconWrapper onClick={() => {
            setShowMenu(!showMenu)
          }}>
            <img
              src={showMenu ? "/imgs/icons/close.svg" : "/imgs/icons/menu.svg"}
              alt=""
            />
          </IconWrapper>
          <svg width="375" height="1" viewBox="0 0 375 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="375" height="1" fill="#F0F3F8"/>
          </svg>
          <AccountWrapper onClick={()=>{setShowMenu(!showMenu)}}>
            <Account showMenu={showMenu} setShowMenu={setShowMenu}/>
          </AccountWrapper>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
