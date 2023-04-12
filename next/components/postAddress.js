import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIdentity } from "services/identity";
import Avatar from "./avatar";
import IdentityIcon from "@osn/common-ui/es/User/IdentityIcon";
import { ReactComponent as Loading } from "public/imgs/icons/loading.svg";
import { useWindowSize } from "frontedUtils/hooks";
import { addressEllipsis } from "frontedUtils";
import { isAddress } from "@polkadot/util-crypto";
import { newErrorToast } from "store/reducers/toastSlice";
import { p_14_normal } from "../styles/textStyles";
import {
  clearProxy,
  loginNetworkSelector,
  proxySelector,
  setProxy,
  setProxyBalance,
  setProxyDelegation,
} from "../store/reducers/accountSlice";
import delayLoading from "../services/delayLoading";
import isNil from "lodash.isnil";
import { loginNetworkSnapshotSelector } from "../store/selectors/snapshot";
import {
  setLoadBalanceError,
  setProxyBalanceLoading,
} from "../store/reducers/statusSlice";
import encodeAddressByChain from "../frontedUtils/chain/addr";
import { Flex } from "@osn/common-ui";

const FETCH_BALANCE_ERROR =
  "something went wrong while querying balance, please try again later.";

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
      padding: 11px 47px 11px 43px;
      @media screen and (max-width: 800px) {
        max-width: none;
      }
    `}
`;

const ItemWrapper = styled(Flex)`
  padding: 11px 15px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  cursor: pointer;
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

const IdentityWrapper = styled(Flex)`
  > :not(:first-child) {
    margin-left: 4px;
    white-space: nowrap;
  }
`;

export default function PostAddress({ spaceId, proposalCid, size, snapshot }) {
  const dispatch = useDispatch();
  const proxyAddress = useSelector(proxySelector);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowSize();
  const [inputAddress, setInputAddress] = useState(proxyAddress);
  const loginNetworkSnapshot = useSelector(loginNetworkSnapshotSelector);
  const [identityInfo, setIdentityInfo] = useState();
  const loginNetwork = useSelector(loginNetworkSelector);
  const { network } = loginNetwork || {};

  const accountSnapshot = snapshot || loginNetworkSnapshot;

  const ref = useRef();

  useEffect(() => {
    if (isNil(network)) {
      return;
    }

    if (!inputAddress) {
      dispatch(setProxy(null));
      dispatch(setProxyBalance(null));
      dispatch(setProxyDelegation(null));
      return;
    }

    if (!isAddress(inputAddress)) {
      dispatch(newErrorToast("Invalid proxy address"));
      return;
    }

    dispatch(setProxy(encodeAddressByChain(inputAddress, network)));
  }, [dispatch, inputAddress, network]);

  useEffect(() => {
    if (!proxyAddress || !network) {
      return;
    }

    setIsLoading(true);
    fetchIdentity(network, proxyAddress)
      .then((response) => {
        setIdentityInfo(response?.info);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [proxyAddress, inputAddress, network]);

  useEffect(() => {
    if (!proxyAddress) {
      return;
    }

    dispatch(setProxyBalanceLoading(true));
    dispatch(setLoadBalanceError(""));

    let promise;
    if (proposalCid) {
      promise = delayLoading(
        `${spaceId}/proposal/${proposalCid}/voterbalance/${network}/${proxyAddress}?snapshot=${accountSnapshot}`,
      ).then(([result]) => {
        if (!isNil(result?.result?.balanceOf)) {
          dispatch(setProxyBalance(result?.result?.balanceOf ?? 0));
          dispatch(setProxyDelegation(result?.result?.delegation ?? null));
        } else {
          const message = result?.error?.message || FETCH_BALANCE_ERROR;
          dispatch(newErrorToast(message));
          dispatch(setLoadBalanceError(message));
        }
      });
    } else {
      promise = delayLoading(
        `${spaceId}/${network}/account/${proxyAddress}/balance?snapshot=${accountSnapshot}`,
      ).then(([result]) => {
        if (!isNil(result?.result?.balance)) {
          dispatch(setProxyBalance(result?.result?.balance ?? 0));
          dispatch(setProxyDelegation(result?.result?.delegation ?? null));
        } else {
          const message = result?.error?.message || FETCH_BALANCE_ERROR;
          dispatch(newErrorToast(message));
          dispatch(setLoadBalanceError(message));
        }
      });
    }

    promise
      .catch((e) => {
        const message = e?.message || FETCH_BALANCE_ERROR;
        dispatch(newErrorToast(message));
        dispatch(setLoadBalanceError(message));
      })
      .finally(() => {
        dispatch(setProxyBalanceLoading(false));
      });
  }, [proxyAddress, dispatch, network, accountSnapshot, spaceId, proposalCid]);

  return (
    <Wrapper size={size}>
      {!proxyAddress && (
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
            onBlur={(e) => setInputAddress(e.target.value)}
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
      {proxyAddress && (
        <ItemWrapper
          size={size}
          onClick={() => {
            setInputAddress("");
            dispatch(clearProxy());

            setTimeout(() => {
              ref.current.focus();
            }, 1);
          }}
        >
          <Avatar address={proxyAddress} size={size === "small" ? 20 : 40} />
          <DetailWrapper size={size}>
            {!identityInfo && (
              <div>
                {width <= 1100 || size === "small"
                  ? addressEllipsis(proxyAddress)
                  : proxyAddress}
              </div>
            )}
            {identityInfo && (
              <IdentityWrapper>
                <IdentityIcon status={identityInfo?.status} />
                <div>{identityInfo?.display}</div>
              </IdentityWrapper>
            )}
            {size !== "small" && (
              <div>
                {width <= 1100 ? addressEllipsis(proxyAddress) : proxyAddress}
              </div>
            )}
          </DetailWrapper>
        </ItemWrapper>
      )}
    </Wrapper>
  );
}
