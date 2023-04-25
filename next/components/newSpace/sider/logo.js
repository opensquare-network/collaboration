import styled from "styled-components";

const Wrapper = styled.div`
  width: 64px;
  height: 64px;

  border: 1px solid #e2e8f0;
  border-radius: 50%;
  background: #fbfcfe;

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
