import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Content from "./content";
import Choices from "./choices";
import More from "./more";
import {
  loginAccountSelector,
  loginAddressSelector,
  setAvailableNetworks,
  setBalance,
} from "store/reducers/accountSlice";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "frontedUtils/constants";
import { useRouter } from "next/router";
import { encodeAddress } from "@polkadot/util-crypto";
import pick from "lodash.pick";
import {
  setSnapshotHeights,
  snapshotHeightsSelector,
} from "../../store/reducers/snapshotHeightSlice";
import { loginNetworkSnapshotSelector } from "../../store/selectors/snapshot";
import isNil from "lodash.isnil";
import delayLoading from "../../services/delayLoading";
import {
  setBalanceLoading,
  setLoadBalanceError,
} from "../../store/reducers/statusSlice";

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
  const account = useSelector(loginAccountSelector);
  const loginAddress = useSelector(loginAddressSelector);
  const loginNetworkSnapshot = useSelector(loginNetworkSnapshotSelector);

  const snapshotHeights = useSelector(snapshotHeightsSelector);
  const router = useRouter();

  const [title, setTitle] = useState(router.query.title || "");
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [balanceError, setBalanceError] = useState(null);
  const [viewFunc, setViewFunc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [proxyPublish, setProxyPublish] = useState(false);
  const [proxyAddress, setProxyAddress] = useState("");
  const [proxyBalance, setProxyBalance] = useState(null);
  const [isInputting, setIsInputting] = useState(false);

  const threshold = space.proposeThreshold;
  const decimals = space.decimals;
  const symbol = space.symbol;

  useEffect(() => {
    dispatch(setLoadBalanceError(""));
  }, [loginAddress]);

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        space?.networks?.map((item) => pick(item, ["network", "ss58Format"])) ||
          []
      )
    );
  }, [dispatch, space]);

  useEffect(() => {
    import("frontedUtils/viewfunc").then((viewFunc) => {
      setViewFunc(viewFunc);
    });
  }, []);

  useEffect(() => {
    if (space) {
      dispatch(
        setSnapshotHeights(
          Object.keys(space.latestFinalizedHeights).map((network) => ({
            network,
            height: space.latestFinalizedHeights[network],
          }))
        )
      );
    }
  }, [space, dispatch]);

  useEffect(() => {
    // Create proposal with the connected wallet directly
    // Read the wallet balance, so that we can check
    // if the balance is above the threshold
    if (!loginAddress) {
      dispatch(setBalance(null));
      setBalanceError("Link an address to create proposal.");
      return;
    }
    setBalanceError(null);

    if (loginNetworkSnapshot <= 0) {
      return;
    }

    if (!account?.network) {
      return;
    }

    dispatch(setBalanceLoading(true));
    dispatch(setLoadBalanceError(""));
    delayLoading(
      `${space.id}/${account?.network}/account/${loginAddress}/balance?snapshot=${loginNetworkSnapshot}`
    )
      .then(([result]) => {
        if (!isNil(result?.result?.balance)) {
          dispatch(setBalance(result?.result?.balance ?? 0));
        } else {
          const message = result?.error?.message || FETCH_BALANCE_ERROR;
          dispatch(addToast({ type: TOAST_TYPES.ERROR, message }));
          dispatch(setLoadBalanceError(message));
        }
      })
      .catch((error) => {
        const message = error?.message || FETCH_BALANCE_ERROR;
        dispatch(addToast({ type: TOAST_TYPES.ERROR, message }));
        dispatch(setLoadBalanceError(message));
      })
      .finally(() => {
        dispatch(setBalanceLoading(false));
      });
  }, [
    space,
    account?.network,
    account?.address,
    account?.ss58Format,
    dispatch,
    snapshotHeights,
  ]);

  useEffect(() => {
    if (isInputting) {
      setProxyBalance(null);
    }
  }, [proxyBalance, isInputting]);

  const onPublish = async () => {
    if (isLoading) return;

    const address = account?.address ?? "";
    const ss58Format = account?.ss58Format ?? 0;
    if (!address) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: "Please connect wallet" })
      );
      return;
    }

    if (!viewFunc) {
      return;
    }
    const proposalSnapshotHeights = {};
    snapshotHeights.forEach((snapshotHeight) => {
      proposalSnapshotHeights[snapshotHeight.network] = snapshotHeight.height;
    });
    const proposal = {
      space: space.id,
      title,
      content,
      contentType: "markdown",
      choiceType: "single",
      choices: choices.filter(Boolean),
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
      snapshotHeights: proposalSnapshotHeights,
      address: encodeAddress(address, ss58Format),
      realProposer: proxyPublish
        ? encodeAddress(proxyAddress, ss58Format)
        : null,
      proposerNetwork: account.network,
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
        router.push(`/space/${space.id}/proposal/${result.cid}`);
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
      if (error.toString() === "Error: Cancelled") {
        return;
      }
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
          proxyBalance={proxyBalance}
          setProxyBalance={setProxyBalance}
          isInputting={isInputting}
          setIsInputting={setIsInputting}
        />
      </SiderWrapper>
    </Wrapper>
  );
}
