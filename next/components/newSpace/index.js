import styled from "styled-components";
import Breadcrumb from "../breadcrumb";
import Content from "./content";

const Wrapper = styled.div``;

export default function NewSpace() {
  return (
    <Wrapper>
      <Breadcrumb
        routes={[{ name: "Home", link: "/" }, { name: "New Space" }]}
      />
      <Content />
    </Wrapper>
  );
}
