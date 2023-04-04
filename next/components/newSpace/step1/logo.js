import styled from "styled-components";
import LogoUploader from "@/components/logoUploader";
import { Hint, SectionTitle } from "../styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function Logo({ imageFile, setImageFile }) {
  return (
    <Wrapper>
      <SectionTitle>Logo</SectionTitle>
      <LogoWrapper>
        <LogoUploader imageFile={imageFile} setImageFile={setImageFile} />
        <Hint>
          <p>Optional</p>
          <p>Recommended size: 200x200px</p>
        </Hint>
      </LogoWrapper>
    </Wrapper>
  );
}
