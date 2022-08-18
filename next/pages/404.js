import styled from "styled-components";
import { h3_36_bold, h4_24_bold, p_16_normal } from "../styles/textStyles";
import Header from "@/components/header";
import { Footer } from "@osn/common-ui";
import Toast from "@/components/toast";
import InternalLink from "@/components/internalLink";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  background: #fff;
  @media screen and (max-width: 800px) {
    border-top: none;
  }
  border-bottom: 1px solid #f0f3f8;
`;

const H1 = styled.h1`
  width: 1080px;
  ${h3_36_bold};
  @media screen and (max-width: 800px) {
    ${h4_24_bold};
    padding-bottom: 30px;
    padding-left: 40px;
  }
  line-height: 116px;
  margin: auto;
`;

const Content = styled.div`
  padding-top: 80px;
  height: 488px;
  ${p_16_normal};
  color: #506176;
  background-image: url("/imgs/backgrounds/bg-404.png");
  background-position-x: 50%;
  background-repeat: no-repeat;
  @media screen and (max-width: 800px) {
    padding-left: 40px;
  }
  p {
    max-width: 440px;
    @media screen and (max-width: 800px) {
      max-width: calc(100vw - 80px);
    }
  }

  a {
    display: inline-block;
    padding-left: 16px;
    padding-right: 16px;
    border: 1px solid #b7c0cc;
    line-height: 40px;
  }
`;

export default function FourOFour() {
  return (
    <Wrapper>
      <Header />
      <Section>
        <H1>404: Page Not Found</H1>
      </Section>
      <Content>
        <div style={{ maxWidth: 1080, margin: "auto" }}>
          <p>
            Sorry. the content you’re looking for doesn’t exist. Either it was
            removed, or you mistyped the link.
          </p>
          <InternalLink href="/">Back to Square</InternalLink>
        </div>
      </Content>
      <Footer github="https://github.com/opensquare-network/collaboration/" />
      <Toast />
    </Wrapper>
  );
}
