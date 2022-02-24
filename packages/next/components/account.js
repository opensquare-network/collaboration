import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import {
  accountSelector,
  logout,
  setAccount,
} from "store/reducers/accountSlice";
import { addressEllipsis } from "frontedUtils";
import Avatar from "./avatar";
import { p_14_medium } from "../styles/textStyles";
import UserIcon from "../public/imgs/icons/user.svg";
import { shadow_200 } from "../styles/globalCss";
import { useWindowSize, useIsMounted } from "../frontedUtils/hooks";
import { fetchIdentity } from "services/identity";
import IdentityIcon from "components/identityIcon";
import { encodeAddress } from "@polkadot/util-crypto";
import ButtonPrimary from "components/button";
import {
  popUpConnect,
  showConnectSelector,
} from "../store/reducers/showConnectSlice";

const Connect = dynamic(() => import("./connect"), {
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
  }

  > div > :first-child {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .button,
  .connect {
    width: 100%;
  }
`;

const AccountWrapperPC = styled(AccountWrapper)`
  border: 1px solid #e2e8f0;

  :hover {
    border: 1px solid #b7c0cc;
  }

  ${(p) =>
    p.show &&
    css`
      border: 1px solid #b7c0cc;
    `}
  padding: 7px 15px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  cursor: auto;
  min-width: 209px;
  position: absolute;
  right: 0;
  top: 100%;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  ${shadow_200};
  padding: 16px;
  z-index: 1;
  @media screen and (max-width: 800px) {
    margin-top: 19px;
    border: none;
    box-shadow: none;
    width: 100%;
    position: initial;
    padding: 0;
    border-bottom: 20px solid white;
  }

  .connect {
    margin: auto;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
`;

const MenuDivider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${p_14_medium};
  color: #506176;

  :hover {
    color: #1e2134;
  }
`;

const DarkButton = styled(ButtonPrimary)`
  @media screen and (max-width: 800px) {
    padding: 8px 16px;
    margin: auto;
    width: 100%;
    text-align: center;
  }
`;

const Shade = styled.div`
  @media screen and (min-width: 800px) {
    display: none;
  }
  margin-left: -20px;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.4;
`;

const IdentityWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;

  > :not(:first-child) {
    margin-left: 4px;
  }
`;

export default function Account({ space, showMenu, setShowMenu }) {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const windowSize = useWindowSize();
  const account = useSelector(accountSelector);
  const showConnect = useSelector(showConnectSelector);
  const [pageMounted, setPageMounted] = useState(false);
  const [identity, setIdentity] = useState();
  const [address, setAddress] = useState(account?.[space?.id]?.address);
  const chain = space?.identity || space;
  useEffect(() => setPageMounted(true), []);

  useEffect(() => {
    if (account) {
      if (
        account?.[space?.id]?.address &&
        space?.networks?.[0]?.ss58Format !== undefined
      ) {
        const spaceAddr = encodeAddress(
          account?.[space?.id]?.address,
          space?.networks?.[0]?.ss58Format
        );
        setAddress(spaceAddr);
      }
    }
  }, [space?.ss58Format, account, address, space?.id, space?.networks]);

  useEffect(() => {
    if (chain && address) {
      const idenAddr = encodeAddress(address, chain.ss58Format);
      fetchIdentity(chain.network, idenAddr)
        .then((identity) => {
          if (isMounted.current) {
            setIdentity(identity);
          }
        })
        .catch(() => {});
    }
  }, [chain, account, isMounted, space.networks, address]);

  if (!space) {
    return null;
  }

  const onLogout = () => {
    dispatch(logout());
    setShowMenu(false);
  };

  const ConnectWallet = (
    <div className="connect">
      <DarkButton
        primary
        onClick={() => dispatch(popUpConnect())}
        className="button"
      >
        Connect Wallet
      </DarkButton>
      {showConnect && <Connect space={space} setShowMenu={setShowMenu} />}
    </div>
  );

  const Menu = (
    <MenuWrapper onClick={(e) => e.stopPropagation()}>
      {!account && windowSize.width <= 800 && ConnectWallet}
      {account && (
        <>
          <AccountWrapper>
            <div>
              <Avatar address={address} size={20} />
              {identity?.info && identity?.info?.status !== "NO_ID" ? (
                <IdentityWrapper>
                  <IdentityIcon status={identity.info.status} />
                  <div>{identity.info.display}</div>
                </IdentityWrapper>
              ) : (
                <>{addressEllipsis(address)}</>
              )}
            </div>
            <UserIcon />
          </AccountWrapper>
          <MenuDivider />
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

  if (address && pageMounted) {
    return (
      <Wrapper>
        <AccountWrapperPC show={showMenu}>
          <div>
            <Avatar address={address} size={20} />

            {identity?.info && identity?.info?.status !== "NO_ID" ? (
              <IdentityWrapper>
                <IdentityIcon
                  status={identity.info.status}
                  position="down"
                  offset="10px"
                  showTooltip
                />
                <div>{identity.info.display}</div>
              </IdentityWrapper>
            ) : (
              <>{addressEllipsis(address)}</>
            )}
          </div>
        </AccountWrapperPC>
        {showMenu && Menu}
        {showMenu && <Shade />}
      </Wrapper>
    );
  }

  if (windowSize.width > 800 && !address) {
    return ConnectWallet;
  }

  if (showMenu) {
    return (
      <Wrapper>
        {Menu}
        <Shade />
      </Wrapper>
    );
  }

  return null;
}
