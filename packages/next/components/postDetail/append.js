import styled, { css } from "styled-components";

import { useRouter } from "next/router";

import ButtonPrimary from "@/components/button";
import Panel from "@/components/postDetail/panel";

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 20px 0;
  ${(p) =>
    p.margin &&
    css`
      margin: ${p.margin}px 0;
    `}
`;

export default function Append({ proposal, space }) {
  const onAppend = async () => {};

  return (
    <Panel>
      <Title>Append to proposal</Title>
      <Divider margin={20} />

      <ButtonPrimary primary large onClick={onAppend}>
        Append
      </ButtonPrimary>
    </Panel>
  );
}
