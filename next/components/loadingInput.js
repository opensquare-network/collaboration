import styled from "styled-components";
import { ReactComponent as Loading } from "public/imgs/icons/loading.svg";
import { Input } from "@osn/common-ui";

const Wrapper = styled.div`
  position: relative;
  .loading {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }
`;

export default function LoadingInput({ isLoading, ...props }) {
  return (
    <Wrapper>
      <Input {...props} />
      {isLoading && <Loading className="loading" />}
    </Wrapper>
  );
}
