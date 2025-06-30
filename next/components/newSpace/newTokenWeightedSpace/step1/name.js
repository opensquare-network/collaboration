import styled from "styled-components";
import { Hint, SectionTitle } from "../../styled";
import { Input } from "@osn/common-ui";
import { ErrorMessage } from "@/components/styled/errorMessage";

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const checkName = (name) => {
  if (!name) {
    return "Space name cannot be empty";
  }

  if (name.length > 20) {
    return "Space name cannot exceed 20 characters";
  }

  if (!/^[a-zA-Z0-9_\-\s]+$/.test(name)) {
    return "Only letters, numbers, spaces, underscores and hyphens are allowed";
  }
};

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
