import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchIdentity } from "services/identity";
import Avatar from "./avatar";
import IdentityIcon from "./identityIcon";
import Loading from "public/imgs/icons/loading.svg";
import { useWindowSize } from "frontedUtils/hooks";
import { addressEllipsis } from "frontedUtils";
import { encodeAddress } from "@polkadot/util-crypto";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "frontedUtils/constants";
import { p_14_normal } from "../styles/textStyles";

const Wrapper = styled.div`
  padding: 20px;
  background: #fbfcfe;
  ${(p) =>
    p.size === "small" &&
    css`
      padding: 0;
    `}
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
  ${(p) =>
    p.size === "small" &&
    css`
      > img {
        width: 20px;
        height: 20px;
        left: 16px;
        top: 14px;
      }
      > svg {
        top: 12px;
        right: 16px;
      }
    `}
`;

const Input = styled.input`
  all: unset;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 23px 47px 23px 71px;
  ${p_14_normal};
  ::placeholder {
    color: #a1a8b3;
  }
  :focus {
    border-color: #b7c0cc;
  }
  ${(p) =>
    p.isLoading &&
    css`
      pointer-events: none;
    `}
  ${(p) =>
    p.size === "small" &&
    css`
      max-width: 144px;
      padding: 12px 48px 12px 44px;
      border: none;
      @media screen and (max-width: 800px) {
        max-width: none;
      }
    `}
`;

const ItemWrapper = styled.div`
  padding: 11px 15px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(p) =>
    p.size === "small" &&
    css`
      max-width: 236px;
      @media screen and (max-width: 800px) {
        max-width: none;
      }
    `}
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
  ${(p) =>
    p.size === "small" &&
    css`
      margin-left: 8px;
    `}
`;

const IdentityWrapper = styled.div`
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 4px;
    white-space: nowrap;
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
  size,
  setIsInputting,
  flag,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const { width } = useWindowSize();
  const [inputAddress, setInputAddress] = useState(address);

  const ref = useRef();

  const onBlur = async () => {
    if (!inputAddress || !network) {
      return;
    }

    try {
      const spaceAddr = encodeAddress(inputAddress, network.ss58Format);
      setAddress(spaceAddr);

      const chain = network.relay || network;
      const idenAddr = encodeAddress(inputAddress, chain.ss58Format);

      setIsLoading(true);
      const response = await fetchIdentity(chain.network, idenAddr);
      setInfo(response?.info);
      getProxyBalance();
    } catch (e) {
      setAddress(inputAddress);
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
      setInfo(null);
      if (flag) {
        setAddress("");
      }
    }
  }, [isInput, setProxyBalance, setInfo, setAddress, flag]);

  useEffect(() => {
    if (setIsInputting) {
      setIsInputting(isInput);
    }
  }, [isInput, setIsInputting]);

  return (
    <Wrapper size={size}>
      {isInput && (
        <InputWrapper size={size}>
          <Input
            size={size}
            isLoading={isLoading}
            ref={ref}
            placeholder={
              size === "small"
                ? "Proxy source address"
                : "Please fill the proxy source address"
            }
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
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
          size={size}
          onClick={() => {
            setIsInput(true);
          }}
        >
          <Avatar address={address} size={size === "small" ? 20 : 40} />
          <DetailWrapper size={size}>
            {!info && (
              <div>
                {width <= 1100 || size === "small"
                  ? addressEllipsis(address)
                  : address}
              </div>
            )}
            {info && (
              <IdentityWrapper>
                <IdentityIcon status={info?.status} />
                <div>{info?.display}</div>
              </IdentityWrapper>
            )}
            {size !== "small" && (
              <div>{width <= 1100 ? addressEllipsis(address) : address}</div>
            )}
          </DetailWrapper>
        </ItemWrapper>
      )}
    </Wrapper>
  );
}
