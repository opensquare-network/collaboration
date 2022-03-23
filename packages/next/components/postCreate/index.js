import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Content from "./content";
import Choices from "./choices";
import More from "./more";
import {
  loginAccountSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "frontedUtils/constants";
import nextApi from "services/nextApi";
import { useRouter } from "next/router";
import { encodeAddress, isAddress } from "@polkadot/util-crypto";
import pick from "lodash.pick";
import {
  setSnapshotHeights,
  snapshotHeightsSelector,
} from "../../store/reducers/snapshotHeightSlice";

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
  const snapshotHeights = useSelector(snapshotHeightsSelector);
  const router = useRouter();

  const [title, setTitle] = useState(router.query.title);
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [balance, setBalance] = useState(null);
  const [balanceError, setBalanceError] = useState(null);
  const [viewFunc, setViewFunc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [proxyPublish, setProxyPublish] = useState(false);
  const [proxyAddress, setProxyAddress] = useState("");
  const [info, setInfo] = useState();
  const [proxyBalance, setProxyBalance] = useState(null);
  const [proxyBalanceError, setProxyBalanceError] = useState(
    "Link an address to create proposal."
  );
  const [isInputting, setIsInputting] = useState(false);

  const threshold = space.proposeThreshold;
  const decimals = space.decimals;
  const symbol = space.symbol;

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
    const address = account?.address ?? "";
    const ss58Format = account?.ss58Format ?? 0;
    if (!address) {
      setBalance(null);
      setBalanceError("Link an address to create proposal.");
      return;
    }
    setBalanceError(null);
    const height =
      snapshotHeights?.find(
        (snapshotHeight) => account?.network === snapshotHeight.network
      )?.height || 0;
    if (!(height > 0)) {
      return;
    }
    if (!account?.network) {
      return;
    }
    const delay = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    Promise.all([
      nextApi.fetch(
        `${space.id}/${account?.network}/account/${encodeAddress(
          address,
          ss58Format
        )}/balance?snapshot=${height}`
      ),
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
  }, [
    space,
    account?.network,
    account?.address,
    account?.ss58Format,
    dispatch,
    snapshotHeights,
  ]);

  const getProxyBalance = (proxyAddress) => {
    // Create proposal with the proxy address
    // We need to check the balance of the proxy address
    const address = proxyAddress ?? "";
    const ss58Format = account?.ss58Format ?? 0;
    if (!address || !isAddress(address)) {
      setProxyBalance(null);
      setProxyBalanceError("Link an address to create proposal.");
      return;
    }
    setProxyBalanceError(null);
    const height =
      snapshotHeights?.find(
        (snapshotHeight) => account?.network === snapshotHeight.network
      )?.height || 0;
    if (!(height > 0)) {
      setProxyBalanceError("Please set snapshot height.");
      return;
    }
    if (!account?.network) {
      return;
    }
    const delay = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    Promise.all([
      nextApi.fetch(
        `${space.id}/${account?.network}/account/${encodeAddress(
          address,
          ss58Format
        )}/balance?snapshot=${height}`
      ),
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
  };

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

  const connectedNetworkConfig = account && {
    network: account.network,
    ss58Format: account.ss58Format,
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
          space={connectedNetworkConfig}
          info={info}
          setInfo={setInfo}
          getProxyBalance={getProxyBalance}
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
