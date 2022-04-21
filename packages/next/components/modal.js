import React from "react";
import styled from "styled-components";
import { Modal as SemanticModal } from "semantic-ui-react";

import Button from "@osn/common-ui/dist/styled/Button";
import CloseIcon from "@osn/common-ui/dist/imgs/icons/close.svg";

const Wrapper = styled.div``;

const StyledModal = styled(SemanticModal)`
  max-width: 400px !important;
  border-radius: 0 !important;
`;

const ContentWrapper = styled.div`
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
`;

const CloseButton = styled.img`
  cursor: pointer;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export default function Modal({
  open,
  setOpen = () => {},
  children,
  footer,
  onOk = () => {},
  onClose = () => {},
  okText = "OK",
  okButtonProps = {},
  closeBar = true,
  closeOnClickOutside = true,
}) {
  const closeModal = () => {
    onClose();
    setOpen(false);
  };

  const closeButton = (
    <CloseButton onClick={closeModal} src={CloseIcon} width={24} alt="" />
  );

  footer = footer || (
    <Button primary onClick={onOk} {...okButtonProps}>
      {okText}
    </Button>
  );

  return (
    <Wrapper>
      <StyledModal
        open={open}
        onClose={closeModal}
        dimmer
        size="tiny"
        closeOnDimmerClick={closeOnClickOutside}
      >
        <ContentWrapper>
          {closeBar && <CloseBar>{closeButton}</CloseBar>}

          {children}

          {footer && <FooterWrapper>{footer}</FooterWrapper>}
        </ContentWrapper>
      </StyledModal>
    </Wrapper>
  );
}
