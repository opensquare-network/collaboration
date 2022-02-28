import styled from "styled-components";
import Input from "@/components/input";
import ChainIcon from "@/components/chain/chainIcon";
import Loading from "public/imgs/icons/loading.svg";

const Wrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    left: 16px;
    top: 12px;
  }
  svg:nth-child(2) {
    left: 48px;
  }
`;
const StyledInput = styled(Input)`
  padding-left: 48px;
  width: 216px;
`;

function BlockHeightInput({ network, height, loading }) {
  return (
    <Wrapper>
      <ChainIcon chainName={network} />
      {loading && <Loading />}
      <StyledInput
        placeholder={loading ? "" : "Input Block Height"}
        type="number"
        value={loading ? "" : height}
        //todo: implement setHeight
        // onChange={(e) => setHeight(e.target.value)}
        disabled={loading}
      />
    </Wrapper>
  );
}

export default BlockHeightInput;
