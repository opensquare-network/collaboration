import React from "react";
import { useWindowSize } from "frontedUtils/hooks";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  svg {
    background: white;
    box-shadow: 0 4px 31px rgba(26, 33, 44, 0.04),
      0 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
    margin-bottom: 15px;
  }
`;

const MyLoader = (props) => {
  const windowSize = useWindowSize();
  const padding = windowSize.width > 900 ? 64 : 32;
  const loaderWidth =
    windowSize.width > 1144 ? 1080 : windowSize.width - padding;

  if (isNaN(loaderWidth)) {
    return null;
  }
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={72}
      viewBox={`0 0 ${loaderWidth} 72`}
      backgroundColor="#f3f3f3"
      foregroundColor="#EFF3F9"
      {...props}
    >
      <rect
        x="24"
        y="28"
        rx="3"
        ry="3"
        width={loaderWidth - padding * 1.5}
        height="16"
      />
    </ContentLoader>
  );
};

const ListLoader = ({ style = {} }) => {
  return (
    <LoaderWrapper style={style}>
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </LoaderWrapper>
  );
};

export default ListLoader;
