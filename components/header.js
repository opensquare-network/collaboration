import styled from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link";

import Container from "./container";
import { useWindowSize } from "utils/hooks";
import Account from "./account";

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
  @media screen and (max-width: 1144px) {
    padding: 20px 32px;
  }
  @media screen and (max-width: 800px) {
    padding: 15px 20px;
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
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding: 15px 20px;
    width: 48px;
    height: 30px;
    background-image: url("/imgs/opensquare-logo-icon.svg");
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #e2e8f0;
  margin: 0 24px;
`;

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  > img {
    width: 24px;
    margin-right: 8px;
  }
`;

const AccountWrapper = styled.div`
  @media screen and (max-width: 800px) {
    background: #ffffff;
    position: absolute;
    left: 0;
    top: 100%;
    height: 72px;
    border-top: 1px solid #f0f3f8;
    border-bottom: 1px solid #f0f3f8;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    z-index: 1;
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
  const [show, setShow] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width && windowSize.width > 800) {
      setShow(false);
    }
  }, [windowSize]);

  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
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
          <div>
            <IconWrapper onClick={() => setShow(!show)}>
              <img
                src={show ? "/imgs/icons/close.svg" : "/imgs/icons/menu.svg"}
                alt=""
              />
            </IconWrapper>
            {(windowSize.width > 800 || show) && (
              <AccountWrapper>
                <Account />
              </AccountWrapper>
            )}
          </div>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
