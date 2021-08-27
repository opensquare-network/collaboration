import styled from "styled-components";

import Container from "./container";

const Wrapper = styled.header`
  flex: 0 0 auto;
  background: #ffffff;
`;

const ContentWrapper = styled.div`
  height: 80px;
  padding: 0 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 226px;
  height: 40px;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #e2e8f0;
  margin: 0 24px;
`;

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  > img {
    width: 24px;
    margin-right: 8px;
  }
`;

const Button = styled.div`
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background: #191e27;
  cursor: pointer;
`;

export default function Header() {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <LeftWrapper>
            <Logo src="/imgs/opensquare-logo.svg" />
            <Divider />
            <AppWrapper>
              <img src="/imgs/icons/apps.svg" />
              Voting
            </AppWrapper>
          </LeftWrapper>
          <Button>Connect Wallet</Button>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
