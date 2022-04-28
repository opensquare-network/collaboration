import styled from "styled-components";
import { p_16_semibold } from "../../styles/textStyles";
import { memo } from "react";
import { Flex, FlexBetween } from "@osn/common-ui";
import SubTitle from "@osn/common-ui/es/styled/SubTitle";
import Tooltip from "@/components/tooltip";
import { ReactComponent as QuestionMark } from "../../public/imgs/icons/question-mark.svg";

const TitleWrapper = styled(FlexBetween)`
  ${p_16_semibold};
`;

function SideSectionTitle({ title, tooltip, img }) {
  let info = title;
  if (tooltip) {
    info = (
      <Flex style={{ gap: 4 }}>
        <SubTitle>Snapshot</SubTitle>
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
