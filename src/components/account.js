import styled from "styled-components";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";

import { useOnClickOutside } from "utils/hooks";

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
  > img {
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

export default function Account() {
  const [isLogin, setIsLogin] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setShow(false));

  return (
    <>
      {!isLogin && <Connect />}
      {isLogin && (
        <Wrapper ref={ref} onClick={() => setShow(!show)}>
          <AccountWrapper>
            <img src="/imgs/avatar.png" />
            12wt...Rm6c
          </AccountWrapper>
          {show && (
            <MenuWrapper onClick={(e) => e.stopPropagation()}>
              <AccountWrapper>
                <img src="/imgs/avatar.png" />
                12wt...Rm6c
              </AccountWrapper>
              <MenuDivider />
              <MenuItem>
                <LogoutWrapper
                  onClick={() => {
                    setIsLogin(false);
                    setShow(false);
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
