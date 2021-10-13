import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchIdentity } from "services/identity";
import Avatar from "../avatar";
import IdentityIcon from "../identityIcon";
import Loading from "public/imgs/icons/loading.svg";
import { useWindowSize } from "utils/hooks";
import { addressEllipsis } from "utils";
import { encodeAddress } from "@polkadot/util-crypto";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "utils/constants";

const Wrapper = styled.div`
  padding: 20px;
  background: #fbfcfe;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  > img {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 16px;
    top: 16px;
    pointer-events: none;
  }
  > svg {
    position: absolute;
    top: 24px;
    right: 16px;
  }
`;

const Input = styled.input`
  all: unset;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 23px 47px 23px 71px;
  font-size: 16px;
  line-height: 24px;
  ::placeholder {
    color: #c0c8d5;
  }
  :focus {
    border-color: #b7c0cc;
  }
  ${(p) =>
    p.isLoading &&
    css`
      pointer-events: none;
    `}
`;

const ItemWrapper = styled.div`
  padding: 11px 15px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DetailWrapper = styled.div`
  flex-grow: 1;
  margin-left: 16px;
  > :first-child {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  > :last-child {
    font-size: 14px;
    line-height: 24px;
    color: #506176;
  }
`;

const IdentityWrapper = styled.div`
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 4px;
  }
`;

export default function PostAddress({
  network,
  address,
  setAddress,
  info,
  setInfo,
  setProxyBalance,
  getProxyBalance,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const { width } = useWindowSize();

  const ref = useRef();

  const onBlur = async () => {
    if (!address || !network) {
      return;
    }

    try {
      const spaceAddr = encodeAddress(address, network.ss58Format);
      setAddress(spaceAddr);

      const chain = network.relay || network;
      const idenAddr = encodeAddress(address, chain.ss58Format);

      setIsLoading(true);
      const response = await fetchIdentity(chain.network, idenAddr);
      setInfo(response?.info);
      getProxyBalance();
    } catch (e) {
      dispatch(
        addToast({
          type: TOAST_TYPES.ERROR,
          message: e.message,
        })
      );
    } finally {
      setIsLoading(false);
      setIsInput(false);
    }
  };

  useEffect(() => {
    if (!address && !isInput) {
      setIsInput(true);
    }
  }, [address, isInput]);

  useEffect(() => {
    if (isInput) {
      ref.current.focus();
      setProxyBalance(null);
    }
  }, [isInput, setProxyBalance]);

  return (
    <Wrapper>
      {isInput && (
        <InputWrapper>
          <Input
            isLoading={isLoading}
            ref={ref}
            placeholder="Please fill the proxy address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={onBlur}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                ref.current.blur();
              }
            }}
          />
          <img src="/imgs/avatar-polkadot.png" alt="" />
          {isLoading && <Loading />}
        </InputWrapper>
      )}
      {!isInput && (
        <ItemWrapper
          onClick={() => {
            setIsInput(true);
          }}
        >
          <Avatar address={address} size={40} />
          <DetailWrapper>
            {!info && (
              <div>{width <= 1100 ? addressEllipsis(address) : address}</div>
            )}
            {info && (
              <IdentityWrapper>
                <IdentityIcon status={info?.status} />
                <div>{info?.display}</div>
              </IdentityWrapper>
            )}
            <div>{width <= 1100 ? addressEllipsis(address) : address}</div>
          </DetailWrapper>
        </ItemWrapper>
      )}
    </Wrapper>
  );
}
