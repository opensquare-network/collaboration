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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [height, setHeight] = useState("");
  const [balance, setBalance] = useState(0);
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
        const { latestFinalizedHeight } = response.result;
        setHeight(latestFinalizedHeight);
      }
    })
  }, [space]);

  useEffect(()=> {
    const address = account?.address ?? ``;
    if(!address || !height > 0){
      return;
    }
    nextApi.fetch(`/api/spaces/polkadot/account/${address}/balance?snapshot=${height}`)
      .then(res => {
        setBalance(res?.result ?? 0);
      })
  }, [height, account?.address]);

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
    setIsLoading(true);
    let result;
    try {
      result = await viewFunc.createProposal(
        space,
        title,
        content,
        "markdown",
        "single",
        choices.filter(Boolean),
        startDate?.getTime(),
        endDate?.getTime(),
        Number(height),
        account?.address
      );
    } catch (error) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: error.toString() })
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    if (result?.error) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: result.error.message })
      );
    } else if (result) {
      dispatch(
        addToast({
          type: TOAST_TYPES.SUCCESS,
          message: "Create proposal successfully!",
        })
      );
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
        />
      </SiderWrapper>
    </Wrapper>
  );
}
