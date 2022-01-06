import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Content from "./content";
import Choices from "./choices";
import More from "./more";
import { accountSelector } from "store/reducers/accountSlice";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "frontedUtils/constants";
import nextApi from "services/nextApi";
import { useRouter } from "next/router";
import { encodeAddress } from "@polkadot/util-crypto";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const MainWrapper = styled.div`
  flex: 1 1 auto;
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const SiderWrapper = styled.div`
  flex: 0 0 290px;
  margin-left: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    flex-basis: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`;

const FETCH_BALANCE_ERROR =
  "something went wrong while querying balance, please try again later.";

export default function PostCreate({ space }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [height, setHeight] = useState(space.latestFinalizedHeight);
  const [balance, setBalance] = useState(null);
  const [balanceError, setBalanceError] = useState(null);
  const [viewFunc, setViewFunc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [proxyPublish, setProxyPublish] = useState(false);
  const [proxyAddress, setProxyAddress] = useState("");
  const [info, setInfo] = useState();
  const [proxyCount, setProxyCount] = useState(0);
  const [proxyBalance, setProxyBalance] = useState(null);
  const [proxyBalanceError, setProxyBalanceError] = useState(null);
  const [isInputting, setIsInputting] = useState(false);

  const threshold = space.proposeThreshold;
  const decimals = space.decimals;
  const symbol = space.symbol;

  useEffect(() => {
    import("frontedUtils/viewfunc").then((viewFunc) => {
      setViewFunc(viewFunc);
    });
  }, []);

  useEffect(() => {
    const address = account?.address ?? "";
    if (!address) {
      setBalance(null);
      setBalanceError("Link an address to create proposal.");
    }
    if (!address || !height > 0) {
      return;
    }
    setBalanceError(null);
    const delay = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    Promise.all([
      nextApi.fetch(`${space.name}/account/${encodeAddress(address, space.ss58Format)}/balance?snapshot=${height}`),
      delay,
    ])
      .then((results) => {
        if (
          results[0]?.result?.balance !== undefined &&
          results[0]?.result?.balance !== null
        ) {
          setBalance(results[0]?.result?.balance ?? 0);
        } else {
          const message = results[0]?.error?.message || FETCH_BALANCE_ERROR;
          dispatch(addToast({ type: TOAST_TYPES.ERROR, message }));
          setBalanceError(message);
        }
      })
      .catch((error) => {
        const message = error?.message || FETCH_BALANCE_ERROR;
        dispatch(addToast({ type: TOAST_TYPES.ERROR, message }));
        setBalanceError(message);
      });
  }, [space, height, account?.address, dispatch]);

  useEffect(() => {
    const address = proxyAddress ?? "";
    if (!address) {
      setProxyBalance(null);
      setProxyBalanceError("Link an address to create proposal.");
    }
    if (!address || !height > 0) {
      return;
    }
    setProxyBalanceError(null);
    const delay = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    Promise.all([
      nextApi.fetch(`${space.name}/account/${encodeAddress(address, space.ss58Format)}/balance?snapshot=${height}`),
      delay,
    ])
      .then((results) => {
        if (
          results[0]?.result?.balance !== undefined &&
          results[0]?.result?.balance !== null
        ) {
          setProxyBalance(results[0]?.result?.balance ?? 0);
        } else {
          const message = results[0]?.error?.message || FETCH_BALANCE_ERROR;
          dispatch(addToast({ type: TOAST_TYPES.ERROR, message }));
          setProxyBalanceError(message);
        }
      })
      .catch((error) => {
        const message = error?.message || FETCH_BALANCE_ERROR;
        dispatch(addToast({ type: TOAST_TYPES.ERROR, message }));
        setProxyBalanceError(message);
      });
  }, [space, height, proxyAddress, proxyCount, dispatch]);

  useEffect(() => {
    if (isInputting) {
      setProxyBalance(null);
    }
  }, [proxyBalance, isInputting]);

  const onPublish = async () => {
    if (isLoading) return;

    if (!account) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: "Please connect wallet" })
      );
      return;
    }

    if (!viewFunc) {
      return;
    }

    const proposal = {
      space: space.name,
      title,
      content,
      contentType: "markdown",
      choiceType: "single",
      choices: choices.filter(Boolean),
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
      snapshotHeight: Number(height),
      address: encodeAddress(account?.address, space.ss58Format),
      realProposer: proxyPublish
        ? encodeAddress(proxyAddress, space.ss58Format)
        : null,
    };
    const formError = viewFunc.validateProposal(proposal);
    if (formError) {
      dispatch(
        addToast({
          type: TOAST_TYPES.ERROR,
          message: formError,
        })
      );
      return;
    }

    setIsLoading(true);
    try {
      const { result, error } = await viewFunc.createProposal(proposal);
      if (result) {
        dispatch(
          addToast({
            type: TOAST_TYPES.SUCCESS,
            message: "Proposal created successfully!",
          })
        );
        router.push(`/space/${space.name}/proposal/${result.cid}`);
      }
      if (error) {
        dispatch(
          addToast({
            type: TOAST_TYPES.ERROR,
            message: error.message,
          })
        );
      }
    } catch (e) {
      dispatch(
        addToast({
          type: TOAST_TYPES.ERROR,
          message: e.toString(),
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <MainWrapper>
        <Content
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
        <Choices choices={choices} setChoices={setChoices} />
      </MainWrapper>
      <SiderWrapper>
        <More
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          height={height}
          setHeight={setHeight}
          balance={balance}
          onPublish={onPublish}
          isLoading={isLoading}
          threshold={threshold}
          symbol={symbol}
          decimals={decimals}
          balanceError={balanceError}
          proxyPublish={proxyPublish}
          setProxyPublish={setProxyPublish}
          proxyAddress={proxyAddress}
          setProxyAddress={setProxyAddress}
          space={space}
          info={info}
          setInfo={setInfo}
          setProxyCount={() => setProxyCount(proxyCount + 1)}
          proxyBalance={proxyBalance}
          proxyBalanceError={proxyBalanceError}
          setProxyBalance={setProxyBalance}
          isInputting={isInputting}
          setIsInputting={setIsInputting}
        />
      </SiderWrapper>
    </Wrapper>
  );
}
