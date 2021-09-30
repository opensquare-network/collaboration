import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Content from "./content";
import Choices from "./choices";
import More from "./more";
import { accountSelector } from "store/reducers/accountSlice";
import { useChain } from "utils/hooks";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "utils/constants";

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
  const chain = useChain();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [height, setHeight] = useState("");
  const [viewFunc, setViewFunc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    import("utils/viewfunc").then((viewFunc) => {
      setViewFunc(viewFunc);
    });
  }, []);

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
    const result = await viewFunc.createProposal(
      chain,
      title,
      content,
      "markdown",
      "single",
      choices.filter(Boolean),
      startDate?.getTime(),
      startDate?.getTime(),
      Number(height),
      account?.address
    );
    setIsLoading(false);
    if (result.error) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: result.error.message })
      );
    } else {
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
          onPublish={onPublish}
        />
      </SiderWrapper>
    </Wrapper>
  );
}
