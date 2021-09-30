import styled from "styled-components";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector, logout } from "store/reducers/accountSlice";
import { addressEllipsis } from "utils";
import Avatar from "./avatar";
import { p_14_medium, p_16_semibold } from "../styles/textStyles";
import UserIcon from "../public/imgs/icons/user.svg"
import {  shadow_200 } from "../styles/globalCss";

const Connect = dynamic(() => import("./connect"), {
  ssr: false,
});

const Wrapper = styled.div`
  padding: 7px 15px;
  position: relative;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding: 20px 0;
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
`

const AccountWrapperPC = styled(AccountWrapper)`
  @media screen and (max-width: 800px) {
    display: none;
  }
`

const MenuWrapper = styled.div`
  cursor: auto;
  min-width: 209px;
  position: absolute;
  right: 32px;
  top: calc(100% - 20px);
  background: #ffffff;
  border: 1px solid #f0f3f8;
  ${shadow_200};
  padding: 16px;
  z-index: 1;
  @media screen and (max-width: 800px) {
    border: none;
    box-shadow: none;
    width: 100%;
    position: initial;
    padding: 0;
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

const Button = styled.div`
  padding: 8px 16px;
  ${p_16_semibold};
  color: #191e27;
  cursor: pointer;
  border: 1px solid #E2E8F0;
  @media screen and (max-width: 800px) {
    border: none;
    padding: 0;
    margin-left: -40px;
    margin-right: -40px;
    width: 100%;
    text-align: center;
  }
`;

export default function Account({showMenu, setShowMenu}) {
  const [showConnect, setShowConnect] = useState(false);
  const account = useSelector(accountSelector);
  const dispatch = useDispatch();

  const onLogout = ()=>{
    dispatch(logout());
    setShowMenu(false);
  }

  const Menu = <MenuWrapper onClick={(e) => e.stopPropagation()}>
    <AccountWrapper>
      <div>
        <Avatar address={account?.address}/>
        {addressEllipsis(account?.address)}
      </div>
      <UserIcon/>
    </AccountWrapper>
    <MenuDivider/>
    <MenuItem>
      <LogoutWrapper onClick={onLogout}>
        Log out
        <img src="/imgs/icons/logout.svg" alt=""/>
      </LogoutWrapper>
    </MenuItem>
  </MenuWrapper>;

  return (
    <>
      {!account && (
        <>
          <Button onClick={() => setShowConnect(!showConnect)}>
            Connect Wallet
          </Button>
          <Connect show={showConnect} setShow={setShowConnect}/>
        </>
      )}
      {account && (
        <Wrapper>
          <AccountWrapperPC>
            <div>
              <Avatar address={account.address}/>
              {addressEllipsis(account.address)}
            </div>
          </AccountWrapperPC>
          {(showMenu) && Menu}
        </Wrapper>
      )}
    </>
  );
}
