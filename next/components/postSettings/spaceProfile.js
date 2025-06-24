import { useMemo, useState } from "react";
import { cn, Flex } from "@osn/common-ui";
import { Title } from "../postCreate/content";
import Save from "./save";
import { Divider } from "../postDetail/strategyResult/common/styled";
import Logo from "../newSpace/step1/logo";
import Name, { checkName } from "../newSpace/step1/name";
import { getSpaceIconUrl } from "frontedUtils/space";
import { loginAccountSelector } from "../../store/reducers/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  newErrorToast,
  newSuccessToast,
} from "../../store/reducers/toastSlice";
import useSignApiData from "hooks/useSignApiData";
import { extensionCancelled } from "../../frontedUtils/consts/extension";
import nextApi from "../../services/nextApi";
import encodeAddressByChain from "../../frontedUtils/chain/addr";

export default function SpaceProfile({ space }) {
  const sourceLogo = getSpaceIconUrl(space);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(sourceLogo);
  const [name, setName] = useState(space?.name || "");
  const signApiData = useSignApiData();
  const account = useSelector(loginAccountSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");

  const disabled = useMemo(() => {
    return (
      !name || !imageFile || (name === space.name && imageFile === sourceLogo)
    );
  }, [imageFile, name, sourceLogo, space.name]);

  const isValidName = (name) => {
    const nameError = checkName(name);
    if (nameError) {
      setNameError(nameError);
      return false;
    }
    setNameError("");
    return true;
  };

  const onSave = async () => {
    if (!isValidName(name)) {
      return;
    }

    const address = account?.address ?? "";
    if (!address) {
      dispatch(newErrorToast("Please connect wallet"));
      return;
    }

    const signData =
      sourceLogo === imageFile ? { name } : { logo: imageFile, name };

    setIsLoading(true);
    const signedData = await signApiData(
      signData,
      encodeAddressByChain(address, account?.network),
    ).catch((e) => {
      const errorMessage = e.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
    });

    if (signedData) {
      const { result, error } = await nextApi
        .patch(`spaces/${space.id}`, signedData)
        .finally(() => {
          setIsLoading(false);
        });

      if (result) {
        dispatch(newSuccessToast("Settings saved successfully!"));
      }
      if (error) {
        dispatch(newErrorToast(error.message));
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col grow p-[32px] max-sm:p-[20px] gap-[32px]",
        "border border-strokeBorderDefault bg-fillBgPrimary shadow-shadowCardDefault",
      )}
    >
      <div className="flex flex-col gap-[20px]">
        <Title>Space Profile</Title>
        <Divider className="!m-0" />
        <Logo imageFile={imageFile} setImageFile={setImageFile} />
        <Name errorMsg={nameError} name={name} setName={setName} />
        <Flex className="justify-end">
          <Save disabled={disabled} loading={isLoading} onSave={onSave} />
        </Flex>
      </div>
    </div>
  );
}
