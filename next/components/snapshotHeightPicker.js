import styled from "styled-components";
import DatePicker from "@/components/datePicker";
import SubTitle from "@osn/common-ui/es/styled/SubTitle";
import Datetime from "@/components/datetime";
import Divider from "@/components/styled/divider";
import BlockHeightInput from "@/components/chain/blockHeightInput";
import Button from "@osn/common-ui/es/styled/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setSnapshotHeights,
  snapshotHeightsSelector,
} from "../store/reducers/authoringSlice";
import nextApi from "../services/nextApi";
import { newErrorToast } from "store/reducers/toastSlice";
import { useIsMountedBool } from "../frontedUtils/hooks";

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

function SnapshotHeightPicker({ space }) {
  const dispatch = useDispatch();
  const networks = space?.networks || [];
  const [showHeights, setShowHeights] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();

  const hideHeights = () => setShowHeights(false);
  const snapshotHeights = useSelector(snapshotHeightsSelector);
  const isMounted = useIsMountedBool();

  const fetchHeights = () => {
    setLoading(true);
    nextApi
      .fetch(`${space.id}/networkheights`, { time: date.getTime() })
      .then(({ result, error }) => {
        if (result && isMounted) {
          dispatch(
            setSnapshotHeights(
              networks.map((network) => ({
                ...result[network.network],
                network: network.network,
              })),
            ),
          );
        }
        if (error) {
          throw new Error(error.message);
        }
      })
      .catch((e) => {
        dispatch(newErrorToast(e.message));
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    setShowHeights(true);
  };

  return (
    <>
      <DatePicker
        date={date}
        setDate={setDate}
        maxDate={new Date()}
        onSelect={fetchHeights}
        placeholder="Select time"
        defaultTime="now"
      />
      {showHeights && (
        <Wrapper>
          <DialogWrapper>
            <SubTitle>Snapshot</SubTitle>
            <Divider />
            <Datetime datetime={date} />
            <SubTitle style={{ marginTop: 20, marginBottom: 8 }}>
              Blocks height
            </SubTitle>
            {networks?.map((network) => (
              <BlockHeightInput
                height={
                  snapshotHeights?.find(
                    (snapshot) => snapshot.network === network.network,
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
