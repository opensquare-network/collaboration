import styled from "styled-components";
import Breadcrumb from "../../breadcrumb";
// import Content from "./content";

const Wrapper = styled.div``;

export default function Index({ chainsDef, tokensDef }) {
  return (
    <Wrapper>
      <Breadcrumb
        routes={[{ name: "Home", link: "/" }, { name: "New Space" }]}
      />
      {/*<Content chainsDef={chainsDef} tokensDef={tokensDef} />*/}
    </Wrapper>
  );
}
