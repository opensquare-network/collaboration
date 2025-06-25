import {
  MemberItem,
  MemberAddressInput,
  MemberAddressErrorText,
  MemberAddressWrapper,
} from "./styled";
import { useState } from "react";
import { IdentityUser } from "@osn/common-ui";
import { addressEllipsis } from "frontedUtils";
import { isAddress } from "@polkadot/util-crypto";
import { SystemDelete } from "@osn/icons/opensquare";
import { Button, Tooltip, Flex } from "@osn/common-ui";
import NewAssetButton from "@/components/newSpace/newTokenWeightedSpace/step2/newButton";
import { ReactComponent as UserIcon } from "../../public/imgs/icons/user.svg";
import { ethers } from "ethers";

export default function SpaceMemeberList({ members, setMembers }) {
  const onChange = (value, index) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const onDelete = (index) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers([...newMembers]);
  };

  const addAMember = () => {
    setMembers([...members, ""]);
    setCurrentInput(members.length);
  };
  const [currentInput, setCurrentInput] = useState(0);

  return (
    <Flex className="flex flex-col gap-4">
      {members.map((member, index) => {
        return (
          <MemberAddress
            autoFocus={currentInput === index}
            onBlur={() => {
              setCurrentInput(null);
            }}
            onFocus={() => {
              setCurrentInput(index);
            }}
            key={`member-${index}-${member}`}
            address={member}
            onChange={(value) => onChange(value, index)}
            onDelete={() => onDelete(index)}
            hiddenDelete={members.length <= 2}
          />
        );
      })}
      <Flex className="w-full justify-start">
        <NewAssetButton onClick={addAMember}>New Member</NewAssetButton>
      </Flex>
    </Flex>
  );
}

const MemberAddress = ({
  hiddenDelete,
  address,
  onChange,
  onDelete,
  onFocus,
  onBlur,
  autoFocus,
}) => {
  const [showInput, setShowInput] = useState(!isAddress(address));
  const [showError, setShowError] = useState(false);
  if (!showInput) {
    return (
      <MemberItem>
        <AddressDetail address={address} onClick={() => setShowInput(true)} />
        <DeleteButton hidden={hiddenDelete} onClick={onDelete} />
      </MemberItem>
    );
  }

  return (
    <div className="w-full">
      <MemberItem isError={showError}>
        <Flex className="gap-2 w-full">
          <UserIcon className="h-5 w-5" />
          <MemberAddressInput
            placeholder="polkadot or evm address..."
            // value={address}
            defaultValue={address}
            onChange={(e) => {
              onChange(e.target.value.trim());
            }}
            onBlur={(e) => {
              const isValid = isAddress(e.target.value.trim());
              if (isValid) {
                setShowError(false);
                setShowInput(false);
              } else {
                setShowError(true);
                setShowInput(true);
              }
              onBlur();
            }}
            onFocus={() => {
              onFocus();
            }}
            autoFocus={autoFocus}
          />
        </Flex>
        <DeleteButton hidden={hiddenDelete} onClick={onDelete} />
      </MemberItem>
      <MemberAddressErrorText isError={showError}>
        Invalid address
      </MemberAddressErrorText>
    </div>
  );
};

const AddressDetail = ({ onClick, address }) => {
  return (
    <MemberAddressWrapper onClick={onClick}>
      <IdentityUser
        items={["avatarIcon", "identityIcon", "text"]}
        network={ethers.utils.isAddress(address) ? "ethereum" : "polkadot"}
        ellipsis={false}
        address={address}
        noLink={true}
        textRender={(text) => {
          if (addressEllipsis(address) === text) {
            return address;
          } else {
            return text;
          }
        }}
      />
    </MemberAddressWrapper>
  );
};

const DeleteButton = ({ hidden, onClick }) => {
  if (hidden) {
    return;
  }
  return (
    <Tooltip content="Remove">
      <Button className="!p-0 border-none h-5" onClick={onClick}>
        <SystemDelete className="w-5 h-5" />
      </Button>
    </Tooltip>
  );
};
