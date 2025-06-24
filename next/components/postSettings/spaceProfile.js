import { useState } from "react";
import { cn } from "@osn/common-ui";
import { Title } from "../postCreate/content";
import Save from "./save";
import { Divider } from "../postDetail/strategyResult/common/styled";
import Logo from "../newSpace/step1/logo";
import Name from "../newSpace/step1/name";
import { getSpaceIconUrl } from "frontedUtils/space";

export default function SpaceProfile({ space }) {
  const [imageFile, setImageFile] = useState(getSpaceIconUrl(space));

  const [name, setName] = useState(space?.name || "");

  const disabled = !name || !imageFile;

  const onSave = () => {
    console.log({
      name,
      imageFile,
    });
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
        <Name name={name} setName={setName} />
        <div className="flex justify-end">
          <Save disabled={disabled} onSave={onSave} />
        </div>
      </div>
    </div>
  );
}
