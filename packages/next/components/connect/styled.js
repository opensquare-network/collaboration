import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "../../styles/textStyles";

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
    fill: #9da9bb;
  }

  cursor: pointer;
`;

export const StyledTitle = styled.header`
  ${p_20_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

export const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
`;

export const StyledDescription = styled.p`
  ${p_14_normal};
  color: #ee4444;
`;

export const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
`;
