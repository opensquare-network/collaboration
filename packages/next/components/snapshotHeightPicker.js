import styled from "styled-components";
import DatePicker from "@/components/datePicker";
import Title from "@/components/styled/subTitle";
import Datetime from "@/components/datetime";
import Divider from "@/components/styled/divider";
import BlockHeightInput from "@/components/chain/blockHeightInput";
import Button from "@/components/button";
import { useSelector } from "react-redux";
import { spaceConfigSelector } from "../store/reducers/spaceConfigSlice";
import { useState } from "react";

const Wrapper = styled.div`
  position: relative;
`;

const DialogWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  padding: 24px;
  width: 328px;
  background: #ffffff;
  box-shadow: 0 4px 31px rgba(26, 33, 44, 0.06),
    0 0.751293px 8px rgba(26, 33, 44, 0.04);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 16px;
  margin-top: 20px;
`;

function SnapshotHeightPicker({ date, setDate, setSnapshotHeights }) {
  const spaceConfig = useSelector(spaceConfigSelector);
  const networks = spaceConfig.networks || [];
  const [showHeights, setShowHeights] = useState(false);
  const hideHeights = () => setShowHeights(false);

  const fetchHeights = () => {
    //todo: this is mock, fetch block height from server
    const snapshotHeights = [];
    spaceConfig?.networks.forEach((network) => {
      snapshotHeights.push({ network: network.network, height: 1000 });
    });
    setSnapshotHeights(snapshotHeights);
    setShowHeights(true);
  };

  return (
    <>
      <DatePicker
        date={date}
        setDate={setDate}
        onSelect={() => {
          fetchHeights();
        }}
        placeholder="Select time"
      />
      {showHeights && (
        <Wrapper>
          <DialogWrapper>
            <Title>Snapshot</Title>
            <Divider />
            <Datetime datetime={date} />
            <Title style={{ marginTop: 20 }}>Blocks height</Title>
            {networks?.map((network) => (
              <BlockHeightInput
                height={1000}
                key={network.network}
                network={network.network}
              />
            ))}
            <ButtonWrapper>
              <Button onClick={hideHeights}>Cancel</Button>
              <Button onClick={hideHeights} primary>
                Select
              </Button>
            </ButtonWrapper>
          </DialogWrapper>
        </Wrapper>
      )}
    </>
  );
}

export default SnapshotHeightPicker;
