import styled from "styled-components";
import Input from "@/components/input";
import ChainIcon from "@/components/chain/chainIcon";

const Wrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 16px;
    top: 12px;
  }
`;
const StyledInput = styled(Input)`
  padding-left: 48px;
  width: 216px;
`;

function BlockHeightInput({ network, height, setHeight, loading }) {
  return (
    <Wrapper>
      <ChainIcon chainName={network} />
      <StyledInput
        placeholder="Input Block Height"
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        disabled={loading}
      />
    </Wrapper>
  );
}

export default BlockHeightInput;
