import styled from "styled-components";
import Input from "@/components/input";
import ChainIcon from "@/components/chain/chainIcon";
import Loading from "public/imgs/icons/loading.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setSnapshotsHeight,
  snapshotHeightsSelector,
} from "../../store/reducers/snapshotHeightSlice";

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
  const snapshotHeights = useSelector(snapshotHeightsSelector);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <ChainIcon chainName={network} />
      {loading && <Loading />}
      <StyledInput
        placeholder={loading ? "" : "Input Block Height"}
        type="number"
        value={loading ? "" : height}
        onChange={(e) => {
          dispatch(
            setSnapshotsHeight(
              snapshotHeights.map((snapshotHeight) =>
                snapshotHeight.network === network
                  ? { network, height: e.target.value }
                  : snapshotHeight
              )
            )
          );
        }}
        disabled={loading}
      />
    </Wrapper>
  );
}

export default BlockHeightInput;
