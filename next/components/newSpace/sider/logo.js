import styled from "styled-components";

const Wrapper = styled.div`
  width: 64px;
  height: 64px;

  border: 1px solid var(--strokeActionDefault);
  border-radius: 50%;
  background: var(--fillBgSecondary);

  overflow: hidden;
`;

export default function Logo({ imageFile }) {
  return (
    <Wrapper>
      {imageFile && (
        <img
          style={{ objectFit: "cover" }}
          width="100%"
          height="100%"
          src={imageFile}
          alt=""
        />
      )}
    </Wrapper>
  );
}
