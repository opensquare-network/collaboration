import styled from "styled-components";
import { Button } from "@osn/common-ui";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../../../../store/reducers/newSpaceSlice";
import { Sections } from "../../styled";
import BackButton from "../../backButton";
import NewAssetButton from "./newAssetButton";
import Asset from "./asset";
import MyDivider from "../../myDivider";
import { Fragment, useCallback } from "react";
import { newErrorToast } from "../../../../store/reducers/toastSlice";
import uniq from "lodash.uniq";

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export default function Step2({ chainsDef, tokensDef, assets, setAssets }) {
  const dispatch = useDispatch();

  const nextStep = useCallback(() => {
    if (!assets.length) {
      dispatch(newErrorToast("At least one asset is required"));
      return;
    }

    // Verify assets
    for (const asset of assets) {
      if (!asset.chain) {
        dispatch(newErrorToast("Asset chain is required"));
        return;
      }

      if (!asset.symbol) {
        dispatch(newErrorToast("Asset symbol is required"));
        return;
      }

      if (!asset.decimals) {
        dispatch(newErrorToast("Asset decimals is required"));
        return;
      }

      if (!asset.votingThreshold) {
        dispatch(newErrorToast(`${asset.symbol} threshold is required`));
        return;
      }

      if (!asset.votingWeight) {
        dispatch(newErrorToast(`${asset.symbol} voting weight is required`));
        return;
      }

      if (isNaN(asset.votingThreshold)) {
        dispatch(newErrorToast(`${asset.symbol} threshold must be a number`));
        return;
      }

      if (asset.votingThreshold < 0) {
        dispatch(
          newErrorToast(`${asset.symbol} threshold must be greater than 0`),
        );
        return;
      }

      if (isNaN(asset.votingWeight)) {
        dispatch(
          newErrorToast(`${asset.symbol} voting weight must be a number`),
        );
        return;
      }

      if (asset.votingWeight < 1) {
        dispatch(
          newErrorToast(`${asset.symbol} voting weight must be greater than 1`),
        );
        return;
      }

      if (asset.votingWeight % 1 !== 0) {
        dispatch(
          newErrorToast(`${asset.symbol} voting weight must be an integer`),
        );
        return;
      }
    }

    const uniqAssets = uniq(
      assets.map((asset) => `${asset.chain}/${asset.symbol}`),
    );
    if (uniqAssets.length !== assets.length) {
      dispatch(newErrorToast("Duplicate assets are not allowed"));
      return;
    }

    dispatch(setCurrentStep(2));
  }, [dispatch, assets]);

  return (
    <>
      <MyDivider />
      <Sections>
        {assets?.map((asset, index) => (
          <Fragment key={asset.id}>
            <Asset
              chainsDef={chainsDef}
              tokensDef={tokensDef}
              count={assets.length}
              index={index}
              asset={asset}
              setAsset={(asset) => {
                const newAssets = [...assets];
                newAssets[index] = asset;
                setAssets(newAssets);
              }}
              removeAsset={() => {
                const newAssets = [...assets];
                newAssets.splice(index, 1);
                setAssets(newAssets);
              }}
            />
            <MyDivider />
          </Fragment>
        ))}
      </Sections>
      <Sections>
        <NewAssetButton
          onClick={() =>
            setAssets((value) => [
              ...value,
              {
                id: Date.now(),
                symbol: "",
                decimals: 10,
                votingThreshold: "1",
                votingWeight: "1",
              },
            ])
          }
        />
      </Sections>
      <MyDivider />
      <ButtonsWrapper>
        <BackButton />
        <Button block onClick={nextStep}>
          Next
        </Button>
      </ButtonsWrapper>
    </>
  );
}
