import styled from "styled-components";
import { Modal as SemanticModal } from "semantic-ui-react";

const Wrapper = styled.div``;

const StyledModal = styled(SemanticModal)`
  max-width: 400px !important;
  border-radius: 0 !important;
`;

const StyledCard = styled.div`
  margin: 0 !important;
  padding: 24px !important;
  position: relative !important;
  width: 100% !important;
`;

const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > svg path {
    fill: #9da9bb;
  }

  cursor: pointer;
`;

export default function Modal({ open, setOpen, children }) {
  const closeModal = () => setOpen(false);

  const closeButton = (
    <img onClick={closeModal} src="/imgs/icons/close.svg" width={24} alt="" />
  );

  return (
    <Wrapper>
      <StyledModal open={open} onClose={closeModal} dimmer size="tiny">
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>

          {children}
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
