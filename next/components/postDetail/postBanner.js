import styled from "styled-components";

const Banner = styled.img`
  margin-bottom: 16px;
  width: 100%;
`;

export default function PostBanner({ bannerUrl }) {
  if (!bannerUrl) {
    return null;
  }
  return <Banner src={bannerUrl} alt="" />;
}
