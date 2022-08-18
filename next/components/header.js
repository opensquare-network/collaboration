import styled from "styled-components";
import { useRef } from "react";
import Link from "next/link";
import { useOnClickOutside } from "frontedUtils/hooks";
import Account from "./account";
import { p_16_semibold, p_18_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowHeaderMenu,
  showHeaderMenuSelector,
} from "../store/reducers/showConnectSlice";
import { Header as OsnHeader } from "@osn/common-ui";
import { ReactComponent as Plus } from "../public/imgs/icons/plus.svg";
import { ReactComponent as Discussions } from "../public/imgs/icons/discussions.svg";
import { Flex } from "@osn/common-ui";
import Menu from "@/components/menu";

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

const HeaderItemWrapper = styled.div`
  @media screen and (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    z-index: 1;
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
  }
  background-color: white;
`;

const SecondaryHeaderItemWrapper = styled(HeaderItemWrapper)`
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: flex;
    cursor: pointer;
  }
`;

const ExternalLinkWrapper = styled(Flex)`
  gap: 32px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const ExternalLink = styled.a`
  ${p_16_semibold};
  color: #506176;
  display: none;
  @media screen and (min-width: 800px) {
    display: flex;
  }
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  &:hover {
    color: #506176;
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
          <a>{logo}</a>
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
        {showConnect ? (
          <HeaderItemWrapper>
            <Account space={space} />
          </HeaderItemWrapper>
        ) : (
          <ExternalLinkWrapper>
            <ExternalLink
              target="_blank"
              href="https://github.com/opensquare-network/collaboration/discussions/813"
            >
              <Plus />
              Add a Space
            </ExternalLink>
            <ExternalLink
              target="_blank"
              href="https://github.com/opensquare-network/collaboration/discussions"
            >
              <Discussions />
              Discussions
            </ExternalLink>
          </ExternalLinkWrapper>
        )}
        {!showConnect && showMenu && (
          <SecondaryHeaderItemWrapper>
            <Menu />
          </SecondaryHeaderItemWrapper>
        )}
      </ContentWrapper>
    </OsnHeader>
  );
}
