import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Content from "./content";
import Choices from "./choices";
import More from "./more";
import {
  loginAccountSelector,
  loginAddressSelector,
  proxySelector,
  setAvailableNetworks,
  setBalance,
  setDelegation,
  useProxySelector,
} from "store/reducers/accountSlice";
import {
  clearToasts,
  newErrorToast,
  newPendingToast,
  newSuccessToast,
  newToastId,
  removeToast,
} from "store/reducers/toastSlice";
import { useRouter } from "next/router";
import { pick } from "lodash-es";
import {
  authoringEndDateSelector,
  authoringStartDateSelector,
  choiceTypeIndexSelector,
  setSnapshotHeights,
  snapshotHeightsSelector,
} from "../../store/reducers/authoringSlice";
import { loginNetworkSnapshotSelector } from "../../store/selectors/snapshot";
import isNil from "lodash.isnil";
import delayLoading from "../../services/delayLoading";
import {
  setBalanceLoading,
  setCreateProposalLoading,
  setLoadBalanceError,
} from "../../store/reducers/statusSlice";
import encodeAddressByChain from "../../frontedUtils/chain/addr";
import nextApi from "../../services/nextApi";
import { extensionCancelled } from "../../frontedUtils/consts/extension";
import { signProposalWith } from "frontedUtils/signData";
import useSignApiData from "hooks/useSignApiData";
import { validateProposal } from "frontedUtils/validate";
import { getSpaceNetwork } from "frontedUtils/space";

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

export default function PostCreate({ space, settings }) {
  const dispatch = useDispatch();
  const account = useSelector(loginAccountSelector);
  const loginAddress = useSelector(loginAddressSelector);
  const loginNetworkSnapshot = useSelector(loginNetworkSnapshotSelector);
  const signApiData = useSignApiData();

  const snapshotHeights = useSelector(snapshotHeightsSelector);
  const choiceTypeIndex = useSelector(choiceTypeIndexSelector);
  const router = useRouter();

  const [title, setTitle] = useState(
    router.query.title ||
      settings?.proposalTemplate?.title ||
      space?.proposalTemplate?.title ||
      "",
  );
  const [content, setContent] = useState(
    settings?.proposalTemplate?.content || space?.proposalTemplate?.body || "",
  );
  const [isSetBanner, setIsSetBanner] = useState(false);
  const [bannerUrl, setBannerUrl] = useState("");

  let options = ["", ""];
  const optionsQuery = (router.query.options || "").trim();
  if (optionsQuery) {
    options = optionsQuery.split("|");
  }
  const [choices, setChoices] = useState(options);

  const startDate = useSelector(authoringStartDateSelector);
  const endDate = useSelector(authoringEndDateSelector);

  const useProxy = useSelector(useProxySelector);
  const proxyAddress = useSelector(proxySelector);

  useEffect(() => {
    dispatch(setLoadBalanceError(""));
  }, [loginAddress, dispatch]);

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        getSpaceNetwork(space)?.map((item) =>
          pick(item, ["network", "ss58Format"]),
        ) || [],
      ),
    );
  }, [dispatch, space]);

  useEffect(() => {
    if (space) {
      dispatch(
        setSnapshotHeights(
          Object.keys(space.latestFinalizedHeights).map((network) => ({
            network,
            height: space.latestFinalizedHeights[network],
          })),
        ),
      );
    }
  }, [space, dispatch]);

  useEffect(() => {
    // Create proposal with the connected wallet directly
    // Read the wallet balance, so that we can check
    // if the balance is above the threshold
    if (!loginAddress) {
      dispatch(setBalance(null));
      dispatch(setDelegation(null));
      return;
    }

    if (loginNetworkSnapshot <= 0) {
      return;
    }

    if (!account?.network) {
      return;
    }

    dispatch(setBalanceLoading(true));
    dispatch(setLoadBalanceError(""));
    delayLoading(
      `${space.id}/${account?.network}/account/${loginAddress}/balance?snapshot=${loginNetworkSnapshot}`,
    )
      .then(([result]) => {
        if (!isNil(result?.result?.balance)) {
          dispatch(setBalance(result?.result?.balance ?? 0));
          dispatch(setDelegation(result?.result?.delegation ?? null));
        } else {
          const message = result?.error?.message || FETCH_BALANCE_ERROR;
          dispatch(newErrorToast(message));
          dispatch(setLoadBalanceError(message));
        }
      })
      .catch((error) => {
        const message = error?.message || FETCH_BALANCE_ERROR;
        dispatch(newErrorToast(message));
        dispatch(setLoadBalanceError(message));
      })
      .finally(() => {
        dispatch(setBalanceLoading(false));
      });
  }, [space, account?.network, dispatch, loginAddress, loginNetworkSnapshot]);

  const onPublish = async () => {
    if (!account?.address) {
      dispatch(newErrorToast("Please connect wallet"));
      return;
    }

    const proposalSnapshotHeights = Object.fromEntries(
      snapshotHeights.map((item) => [item.network, item.height]),
    );
    const proposal = {
      space: space.id,
      networksConfig: {
        ...pick(space, [
          "type",
          "symbol",
          "decimals",
          "networks",
          "accessibility",
          "whitelist",
          "members",
          "quorum",
          "version",
        ]),
        strategies: space.weightStrategy,
      },
      title,
      content,
      contentType: "markdown",
      choiceType: choiceTypeIndex === 0 ? "single" : "multiple",
      choices: choices.filter(Boolean),
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
      snapshotHeights: proposalSnapshotHeights,
      address: encodeAddressByChain(account?.address, account?.network),
      realProposer: useProxy ? proxyAddress : null,
      proposerNetwork: account.network,
      ...(isSetBanner && bannerUrl ? { banner: bannerUrl } : {}),
    };

    return await signAndSendProposal(proposal);
  };

  const signAndSendProposal = async (proposal) => {
    const formError = validateProposal(proposal);
    if (formError) {
      dispatch(newErrorToast(formError));
      return;
    }

    dispatch(setCreateProposalLoading(true));
    let signedData;
    try {
      signedData = await signProposalWith(signApiData, proposal);
    } catch (e) {
      const errorMessage = e.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      dispatch(setCreateProposalLoading(false));
      return;
    }

    const toastId = newToastId();
    dispatch(
      newPendingToast(toastId, "Saving and uploading proposal to IPFS..."),
    );
    try {
      const { result, error } = await nextApi.post(
        `${proposal.space}/proposals`,
        signedData,
      );
      if (result) {
        dispatch(removeToast(toastId));
        dispatch(newSuccessToast("Proposal created successfully!"));
        router
          .push(`/space/${space.id}/proposal/${result.cid}`)
          .then((redirected) => redirected && dispatch(clearToasts()));
      }
      if (error) {
        dispatch(removeToast(toastId));
        dispatch(newErrorToast(error.message));
      }
    } finally {
      dispatch(removeToast(toastId));
      dispatch(setCreateProposalLoading(false));
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
          isSetBanner={isSetBanner}
          setIsSetBanner={setIsSetBanner}
          setBannerUrl={setBannerUrl}
        />
        <Choices
          maxOptionsCount={space?.maxOptionsCount || 10}
          choices={choices}
          setChoices={setChoices}
        />
      </MainWrapper>
      <SiderWrapper>
        <More onPublish={onPublish} space={space} />
      </SiderWrapper>
    </Wrapper>
  );
}
