import styled from "styled-components";
import { Modal } from "@osn/common-ui";
import { p_14_normal, p_16_semibold } from "../../styles/textStyles";

export const StyledModal = styled(Modal)`
  max-width: 400px !important;
  border-radius: 0 !important;
`;

export const StyledCard = styled.div`
  margin: 0 !important;
  padding: 24px !important;
  position: relative !important;
  width: 100% !important;
`;

export const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > svg path {
    fill: var(--textTertiary);
  }

  cursor: pointer;
`;

export const StyledTitle = styled.header`
  ${p_16_semibold};
  color: var(--textPrimary);
`;

export const StyledText = styled.p`
  ${p_16_semibold};
  color: var(--textPrimary);
`;

export const StyledDescription = styled.p`
  ${p_14_normal};
  color: var(--textFeedbackError);
`;

export const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
`;
