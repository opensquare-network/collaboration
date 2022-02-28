import styled from "styled-components";
import DatePicker from "@/components/datePicker";
import Title from "@/components/styled/subTitle";
import Datetime from "@/components/datetime";
import Divider from "@/components/styled/divider";
import BlockHeightInput from "@/components/chain/blockHeightInput";
import Button from "@/components/button";
import { useDispatch, useSelector } from "react-redux";
import { spaceConfigSelector } from "../store/reducers/spaceConfigSlice";
import { useEffect, useState } from "react";
import {
  setSnapshotHeight,
  snapshotHeightSelector,
} from "../store/reducers/snapshotHeightSlice";
import nextApi from "../services/nextApi";

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
  input {
    margin-bottom: 8px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 16px;
  margin-top: 20px;
`;

function SnapshotHeightPicker({ date, setDate }) {
  const dispatch = useDispatch();
  const spaceConfig = useSelector(spaceConfigSelector);
  const networks = spaceConfig.networks || [];
  const [showHeights, setShowHeights] = useState(false);
  const [loading, setLoading] = useState(true);
  const hideHeights = () => setShowHeights(false);
  const snapshotHeights = useSelector(snapshotHeightSelector);
  const fetchHeights = () => {
    setLoading(true);
    nextApi
      .fetch(`${spaceConfig.id}/networkheights`, { time: date.getTime() })
      .then(({ result }) => {
        dispatch(
          setSnapshotHeight(
            networks.map((network) => ({
              ...result[network.network],
              network: network.network,
            }))
          )
        );
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
    setShowHeights(true);
  };

  return (
    <>
      <DatePicker
        date={date}
        setDate={setDate}
        onSelect={fetchHeights}
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
                height={
                  snapshotHeights?.find(
                    (snapshot) => snapshot.network === network.network
                  )?.height
                }
                key={network.network}
                network={network.network}
                loading={loading}
              />
            ))}
            <ButtonWrapper>
              <Button onClick={hideHeights}>Cancel</Button>
              <Button onClick={hideHeights} primary isLoading={loading}>
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
