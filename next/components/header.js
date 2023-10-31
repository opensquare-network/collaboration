import styled from "styled-components";
import { useRef } from "react";
import Link from "next/link";
import { useOnClickOutside } from "frontedUtils/hooks";
import Account from "./account";
import {
  p_12_normal,
  p_16_semibold,
  p_18_semibold,
} from "../styles/textStyles";
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
import NotificationBell from "./notification/bell";
import { ReactComponent as CaretRight } from "/public/imgs/icons/caret-right-s.svg";

const CaretRightIcon = styled(CaretRight)`
  margin-left: 16px;
`;

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
  height: 36px;

  cursor: pointer;

  &:hover {
    .hoverMenu {
      display: flex;
      flex-wrap: wrap;
    }
    .onHoverReverse {
      transform: rotate(180deg);
    }
  }

  > img {
    width: 24px;
    margin-right: 8px;
  }

  span {
    margin-right: 4px;
  }
`;

const HoverMenu = styled.div`
  padding: 16px;
  position: absolute;
  display: none;
  gap: 24px;
  &:hover {
    display: flex;
    flex-wrap: wrap;
  }
  z-index: 1;
  top: 60px;
  width: 360px;
  box-shadow: 0 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
  background: white;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
  p,
  span {
    margin: 0;
    width: 232px;
  }
  p {
    margin-left: 16px;
    font-size: 16px;
  }
  span {
    ${p_12_normal};
    color: #a1a8b3;
  }
`;

const HeaderItemWrapper = styled.div`
  display: flex;
  gap: 32px;

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

const InternalLink = ExternalLink;

const AccountAndBell = styled.div`
  display: flex;
  gap: 16px;
`;

export default function Header({ networks }) {
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
  const isHomePage = router.pathname === "/";

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
          <span>Voting</span>
          <img
            className="onHoverReverse"
            src="/imgs/icons/caret-down-s.svg"
            alt=""
          />
          <HoverMenu className="hoverMenu">
            <MenuItem href="/">
              <img src="/imgs/icons/voting.svg" alt="" />
              <p>Off-chain Voting</p>
              <CaretRightIcon />
              <span>
                Multi-chain assets off-chain voting platform for Polkadot
                ecosystem
              </span>
            </MenuItem>
            <MenuItem href="https://bounties.opensquare.io/">
              <img src="/imgs/icons/short-term-employment.svg" alt="" />
              <p>Bounties</p>
              <CaretRightIcon />
              <span>Decentralized bounty collaboration platform</span>
            </MenuItem>
          </HoverMenu>
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
        <HeaderItemWrapper>
          {isHomePage && (
            <ExternalLinkWrapper>
              <Link href="/space/new" passHref legacyBehavior>
                <InternalLink>
                  <Plus />
                  Add a Space
                </InternalLink>
              </Link>
              <ExternalLink
                target="_blank"
                href="https://github.com/opensquare-network/collaboration/discussions"
              >
                <Discussions />
                Discussions
              </ExternalLink>
            </ExternalLinkWrapper>
          )}
          <AccountAndBell>
            <Account networks={networks} />
            <NotificationBell />
          </AccountAndBell>
        </HeaderItemWrapper>
        {showMenu && (
          <SecondaryHeaderItemWrapper>
            <Menu />
          </SecondaryHeaderItemWrapper>
        )}
      </ContentWrapper>
    </OsnHeader>
  );
}
