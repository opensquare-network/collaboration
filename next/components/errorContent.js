import styled from "styled-components";
import { h3_36_bold, h4_24_bold, p_16_normal } from "../styles/textStyles";
import Header from "@/components/header";
import { Footer, useIsDark } from "@osn/common-ui";
import Toast from "@/components/toast";
import Link from "next/link";

const Wrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  background: var(--fillBgPrimary);
  @media screen and (max-width: 800px) {
    border-top: none;
  }
  border-bottom: 1px solid var(--strokeBorderDefault);
`;

const H1 = styled.h1`
  width: 1080px;
  ${h3_36_bold};
  padding-top: 40px;
  padding-bottom: 8px;
  @media screen and (max-width: 800px) {
    padding-left: 40px;
  }
  margin: auto;
`;

const Description = styled.h4`
  width: 1080px;
  ${h4_24_bold};
  margin: auto;
  line-height: 36px;
  color: var(--textSecondary);
  padding-bottom: 40px;
  @media screen and (max-width: 800px) {
    padding-top: 0px;
    padding-left: 40px;
  }
`;

const Content = styled.div`
  padding-top: 40px;
  height: 488px;
  ${p_16_normal};
  color: var(--textSecondary);
  ${({ isDark }) =>
    `background-image: url("/imgs/backgrounds/bg-404${
      isDark ? "-dark" : ""
    }.png");`}
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
    border: 1px solid var(--strokeActionActive);
    line-height: 40px;
  }
`;

export default function ErrorContent({ title, subTitle, description }) {
  const isDark = useIsDark();
  return (
    <Wrapper>
      <Header />
      <Section>
        <H1>{title}</H1>
        <Description>{subTitle}</Description>
      </Section>
      <Content isDark={isDark}>
        <div style={{ maxWidth: 1080, margin: "auto" }}>
          <p>{description}</p>

          <div className="mt-4">
            <Link
              className="border-1 border-strokeActionDefault text14Semibold text-textPrimary"
              href="/"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </Content>
      <Footer github="https://github.com/opensquare-network/collaboration/" />
      <Toast />
    </Wrapper>
  );
}
