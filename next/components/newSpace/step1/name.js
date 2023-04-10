import styled from "styled-components";
import { Hint, SectionTitle } from "../styled";
import { Input } from "@osn/common-ui";
import { ErrorMessage } from "@/components/styled/errorMessage";

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function Name({ name, setName, errorMsg }) {
  return (
    <Wrapper>
      <SectionTitle>Name</SectionTitle>
      <InputWrapper>
        <Input
          placeholder="Please enter the name of space..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Hint>
          <p>The space name cannot exceed 20 characters</p>
          <p>Special characters are not allowed</p>
        </Hint>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </InputWrapper>
    </Wrapper>
  );
}
