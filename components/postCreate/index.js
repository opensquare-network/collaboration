import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Content from "./content";
import Choices from "./choices";
import More from "./more";
import { accountSelector } from "store/reducers/accountSlice";
import { useSpace } from "utils/hooks";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "utils/constants";
import nextApi from "services/nextApi";
import { useRouter } from "next/router";

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

export default function PostCreate() {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const space = useSpace();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [height, setHeight] = useState("");
  const [balance, setBalance] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [decimals,setDecimals] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [viewFunc, setViewFunc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    import("utils/viewfunc").then((viewFunc) => {
      setViewFunc(viewFunc);
    });
  }, []);

  useEffect(() => {
    nextApi
      .fetch(`spaces/${space}`)
      .then((response) => {
      if (response.result) {
        const { latestFinalizedHeight, proposeThreshold, symbol, decimals } = response.result;
        setSymbol(symbol);
        setHeight(latestFinalizedHeight);
        setThreshold(proposeThreshold);
        setDecimals(decimals);
      }
    })
  }, [space]);

  useEffect(()=> {
    const address = account?.address ?? ``;
    if(!address || !height > 0){
      return;
    }
    nextApi.fetch(`${space}/account/${address}/balance?snapshot=${height}`)
      .then(res => {
        setBalance(res?.result ?? 0);
      })
  }, [space, height, account?.address]);

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
      space, title, content,
      contentType: "markdown",
      choiceType: "single",
      choices: choices.filter(Boolean),
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
      snapshotHeight: Number(height),
      address: account?.address,
    };
    const formError =  viewFunc.validateProposal(proposal);
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
            message: "Create proposal successfully!",
          })
        );
        router.push(`/space/${space}/${result.cid}`);
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
        />
      </SiderWrapper>
    </Wrapper>
  );
}
