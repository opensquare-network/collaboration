import styled from "styled-components";
import { Index } from "./styled";

const Wrapper = styled(Index)`
  background: #04d2c5;
  color: #ffffff;
  border-color: #04d2c5;
`;

export default function CurrentIndex({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
