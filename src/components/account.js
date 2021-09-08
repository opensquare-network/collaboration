import styled from "styled-components";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";

import { useOnClickOutside } from "utils/hooks";
import { accountSelector, logout } from "store/reducers/accountSlice";
import { addressEllipsis } from "utils";
import Avatar from "./avatar";

const Connect = dynamic(() => import("./connect"), {
  ssr: false,
});

const Wrapper = styled.div`
  border: 1px solid #e2e8f0;
  padding: 7px 15px;
  position: relative;
  cursor: pointer;
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  > :first-child {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const MenuWrapper = styled.div`
  cursor: auto;
  min-width: 209px;
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
  padding: 16px;
  z-index: 1;
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
  font-weight: 600;
  line-height: 24px;
`;

const Button = styled.div`
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background: #191e27;
  cursor: pointer;
`;

export default function Account() {
  const [showMenu, setShowMenu] = useState(false);
  const [showConnet, setShowConnect] = useState(false);
  const ref = useRef();
  const account = useSelector(accountSelector);
  const dispatch = useDispatch();

  useOnClickOutside(ref, () => setShowMenu(false));

  return (
    <>
      {!account && (
        <>
          <Button onClick={() => setShowConnect(!showConnet)}>
            Connect Wallet
          </Button>
          <Connect show={showConnet} setShow={setShowConnect} />
        </>
      )}
      {account && (
        <Wrapper ref={ref} onClick={() => setShowMenu(!showMenu)}>
          <AccountWrapper>
            <Avatar address={account.address} />
            {addressEllipsis(account.address)}
          </AccountWrapper>
          {showMenu && (
            <MenuWrapper onClick={(e) => e.stopPropagation()}>
              <AccountWrapper>
                <Avatar address={account.address} />
                {addressEllipsis(account.address)}
              </AccountWrapper>
              <MenuDivider />
              <MenuItem>
                <LogoutWrapper
                  onClick={() => {
                    dispatch(logout());
                    setShowMenu(false);
                  }}
                >
                  Log out
                  <img src="/imgs/icons/logout.svg" />
                </LogoutWrapper>
              </MenuItem>
            </MenuWrapper>
          )}
        </Wrapper>
      )}
    </>
  );
}
