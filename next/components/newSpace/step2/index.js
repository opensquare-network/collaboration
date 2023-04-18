import styled from "styled-components";
import Steps from "../../steps";
import { Button } from "@osn/common-ui";
import { useDispatch, useSelector } from "react-redux";
import {
  currentStepSelector,
  setCurrentStep,
} from "store/reducers/newSpaceSlice";
import { MyPanel, Sections } from "../styled";
import BackButton from "../backButton";
import NewAssetButton from "./newAssetButton";
import Asset from "./asset";
import MyDivider from "../myDivider";
import { Fragment } from "react";

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export default function Step2({ steps, assets, setAssets }) {
  const dispatch = useDispatch();
  const currentStep = useSelector(currentStepSelector);

  return (
    <MyPanel>
      <Steps steps={steps} currentStep={currentStep} />
      <MyDivider />
      <Sections>
        {assets?.map((asset, index) => (
          <Fragment key={index}>
            <Asset
              index={index}
              asset={asset}
              setAsset={(asset) => {
                const newAssets = [...assets];
                newAssets[index] = asset;
                setAssets(newAssets);
              }}
            />
            <MyDivider />
          </Fragment>
        ))}
      </Sections>
      <Sections>
        <NewAssetButton onClick={() => setAssets((value) => [...value, {}])} />
      </Sections>
      <MyDivider />
      <ButtonsWrapper>
        <BackButton />
        <Button block onClick={() => dispatch(setCurrentStep(2))}>
          Next
        </Button>
      </ButtonsWrapper>
    </MyPanel>
  );
}
