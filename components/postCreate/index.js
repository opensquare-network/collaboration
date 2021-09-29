import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Content from "./content";
import Choices from "./choices";
import More from "./more";
import { accountSelector } from "store/reducers/accountSlice";
import { useChain } from "utils/hooks";

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
  const account = useSelector(accountSelector);
  const chain = useChain();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [viewFunc, setViewFunc] = useState(null);

  useEffect(() => {
    import("utils/viewfunc").then(
      (viewFunc) => {
        setViewFunc(viewFunc);
      }
    );
  }, []);

  const onSubmit = async () => {
    if (!viewFunc) {
      return;
    }

    const result = await viewFunc.createProposal(
      "polkadot",
      title,
      content,
      "markdown",
      "single",
      ["test", "test2"],
      new Date().getTime(),
      new Date().getTime(),
      0,
      account.address,
    );
    console.log({ result });
  };

  return (
    <Wrapper>
      <MainWrapper>
        <Content
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onSubmit={onSubmit}
        />
        <Choices />
      </MainWrapper>
      <SiderWrapper>
        <More />
      </SiderWrapper>
    </Wrapper>
  );
}
