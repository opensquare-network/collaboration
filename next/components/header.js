import styled from "styled-components";
import Link from "next/link";
import Account from "./account";
import { p_12_normal, p_18_semibold } from "../styles/textStyles";
import { useRouter } from "next/router";
import { Header as OsnHeader } from "@osn/common-ui";
import NotificationBell from "./notification/bell";
import { ReactComponent as CaretRight } from "/public/imgs/icons/caret-right-s.svg";
import { SystemApps, SystemAppsActive } from "@osn/icons/opensquare";
import LogoProductVotingLight from "@osn/icons/src/opensquare/logoProductVotingLight.png";
import LogoProductVotingDark from "@osn/icons/src/opensquare/logoProductVotingDark.png";
import { cn } from "@osn/common-ui";

const CaretRightIcon = styled(CaretRight)`
  margin-left: 16px;
`;

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  ${p_18_semibold};

  cursor: pointer;

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
  top: 56px;
  width: 360px;
  background-color: var(--fillBgPrimary);
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
    color: var(--textTertiary);
  }
`;

export default function Header({ networks }) {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <OsnHeader
      className="z-10"
      suffix={
        <AppWrapper className="group">
          <div>
            <SystemApps className="text-textSecondary mr-4 group-hover:hidden" />
            <SystemAppsActive className="text-textSecondary mr-4 hidden group-hover:block" />
          </div>
          <img
            src={LogoProductVotingLight.src}
            className="dark:hidden h-[32px]"
          />
          <img
            src={LogoProductVotingDark.src}
            className="hidden dark:block h-[32px]"
          />

          <HoverMenu className="hidden group-hover:flex flex-wrap shadow-shadowPopup">
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
      }
      logoRender={(logo) => (
        <Link href="/" passHref legacyBehavior>
          <a className="cursor-pointer">{logo}</a>
        </Link>
      )}
      links={[
        isHomePage && {
          className: "max-lg:hidden max-sm:inline-block",
          content: <Link href="/space/new">Add a Space</Link>,
        },
        {
          content: (
            <Link
              target="_blank"
              href="https://github.com/opensquare-network/collaboration/discussions"
            >
              Discussions
            </Link>
          ),
        },
      ].filter(Boolean)}
      connectButton={
        <div
          className={cn(
            "flex items-center gap-x-4",
            "max-sm:w-full max-sm:flex-col",
          )}
        >
          <Account networks={networks} />
          <NotificationBell />
        </div>
      }
    ></OsnHeader>
  );
}
