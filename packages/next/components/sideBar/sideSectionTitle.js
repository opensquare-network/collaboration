import styled from "styled-components";
import { p_16_semibold } from "../../styles/textStyles";
import { memo } from "react";
import Flex from "@/components/styled/flex";
import Title from "@/components/styled/subTitle";
import Tooltip from "@/components/tooltip";
import { ReactComponent as QuestionMark } from "../../public/imgs/icons/question-mark.svg";

const TitleWrapper = styled.div`
  ${p_16_semibold};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function SideSectionTitle({ title, tooltip, img }) {
  let info = title;
  if (tooltip) {
    info = (
      <Flex style={{ gap: 4 }}>
        <Title>Snapshot</Title>
        <Tooltip content={"Support multiple chain voting"} size="fit">
          <QuestionMark />
        </Tooltip>
      </Flex>
    );
  }

  return (
    <TitleWrapper>
      {info}
      <img src={img} alt="" />
    </TitleWrapper>
  );
}

export default memo(SideSectionTitle);
