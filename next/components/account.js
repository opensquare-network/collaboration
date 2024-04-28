import styled, { css } from "styled-components";
import { memo, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAccountSelector,
  loginAddressSelector,
  logout,
} from "store/reducers/accountSlice";
import Avatar from "./avatar";
import { p_14_medium } from "../styles/textStyles";
import { ReactComponent as UserIcon } from "../public/imgs/icons/user.svg";
import ButtonPrimary from "@osn/common-ui/es/styled/Button";
import {
  popUpConnect,
  setShowHeaderMenu,
  showConnectSelector,
  showHeaderMenuSelector,
} from "../store/reducers/showConnectSlice";
import { ChainIcon } from "@osn/common-ui";
import IdentityOrAddr from "@/components/identityOrAddr";
import { useMetaMaskEventHandlers } from "services/metamask";
import { useOnClickOutside, useWindowSize } from "frontedUtils/hooks";
import tw from "tailwind-styled-components";

const ConnectModal = dynamic(() => import("./connect"), {
  ssr: false,
});

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding: 0;
    > :first-child {
      margin-top: 20px;
    }

    > :last-child {
      margin-bottom: 20px;
    }

    margin: 0;
    width: 100%;
    text-align: center;
  }
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};

  div {
    display: flex;
    align-items: center;
    .ui--IdentityIcon {
      display: flex !important;
      align-items: center !important;
    }
  }

  > div > :first-child {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  > div > :nth-child(2) {
    margin-right: 4px;
  }

  .button,
  .connect {
    width: 100%;
  }
`;

const AccountWrapperPC = styled(AccountWrapper)`
  border: 1px solid var(--strokeActionDefault);

  :hover {
    border: 1px solid var(--strokeActionActive);
  }

  ${(p) =>
    p.show &&
    css`
      border: 1px solid var(--strokeActionActive);
    `}
  padding: 7px 15px;
`;

const MenuWrapper = tw.div`
  cursor-auto
  min-w-60
  absolute right-0 top-full
  bg-fillBgPrimary
  border border-strokeBorderDefault
  shadow-shadowCardHover
  p-4 pb-2
  z-[1]

  max-sm:w-full
`;

const MenuItem = styled.div`
  margin-bottom: 8px;
  cursor: pointer;
`;

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};
  color: var(--textSecondary);

  :hover {
    color: var(--textPrimary);
  }
`;

function Account({ networks }) {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const account = useSelector(loginAccountSelector);
  const showConnect = useSelector(showConnectSelector);
  const [pageMounted, setPageMounted] = useState(false);
  const address = useSelector(loginAddressSelector);
  const spaceSupportMultiChain = networks?.length > 1;

  const menuRef = useRef();
  useOnClickOutside(menuRef, () => {
    dispatch(setShowHeaderMenu(false));
  });

  useMetaMaskEventHandlers();

  const showMenu = useSelector(showHeaderMenuSelector);
  useEffect(() => {
    dispatch(setShowHeaderMenu(false));
  }, [windowSize, dispatch]);

  useEffect(() => setPageMounted(true), []);

  if (!networks || networks.length === 0) {
    return null;
  }

  const onSwitch = () => {
    dispatch(popUpConnect());
    dispatch(setShowHeaderMenu(false));
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(setShowHeaderMenu(false));
  };

  const ConnectWalletButton = !account && (
    <ButtonPrimary
      primary
      onClick={() => {
        dispatch(popUpConnect());
      }}
      className="w-full"
    >
      Connect Wallet
    </ButtonPrimary>
  );

  const Menu = (
    <MenuWrapper ref={menuRef} onClick={(e) => e.stopPropagation()}>
      {!account && ConnectWalletButton}

      {address && (
        <>
          <AccountWrapper className="max-sm:!hidden">
            <div>
              <Avatar address={address} size={20} />
              {spaceSupportMultiChain && (
                <ChainIcon chainName={account?.network} size={16} />
              )}
              <IdentityOrAddr
                network={account?.network}
                address={address}
                noLink
              />
            </div>
            <UserIcon />
          </AccountWrapper>

          <hr className="my-3 max-sm:hidden" />

          <MenuItem>
            <LogoutWrapper onClick={onSwitch}>
              Switch Address
              <img src="/imgs/icons/switch.svg" alt="" />
            </LogoutWrapper>
          </MenuItem>
          <MenuItem>
            <LogoutWrapper onClick={onLogout}>
              Log out
              <img src="/imgs/icons/logout.svg" alt="" />
            </LogoutWrapper>
          </MenuItem>
        </>
      )}
    </MenuWrapper>
  );

  // if already connected, show address on right top corner
  if (address && pageMounted) {
    return (
      <Wrapper>
        <AccountWrapperPC
          show={showMenu}
          onClick={() => {
            dispatch(setShowHeaderMenu(!showMenu));
          }}
        >
          <div>
            <Avatar address={address} size={20} />
            {spaceSupportMultiChain && (
              <ChainIcon chainName={account?.network} size={16} />
            )}
            <IdentityOrAddr
              network={account?.network}
              address={address}
              noLink
            />
          </div>
        </AccountWrapperPC>
        {showMenu && Menu}
        {showConnect && <ConnectModal networks={networks} />}
      </Wrapper>
    );
  }

  // if no address connected, show ConnectButton on right top corner(PC only)
  if (!account) {
    return (
      <div className="flex w-full">
        {ConnectWalletButton}
        {showConnect && <ConnectModal networks={networks} />}
      </div>
    );
  }

  return null;
}

export default memo(Account);
