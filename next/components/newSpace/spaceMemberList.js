import {
  MemberItem,
  MemberAddressInput,
  MemberAddressErrorText,
  MemberAddressWrapper,
} from "./styled";
import { useState } from "react";
import { addressEllipsis } from "frontedUtils";
import { isAddress } from "@polkadot/util-crypto";
import { SystemDelete } from "@osn/icons/opensquare";
import { Button, Tooltip, Flex, IdentityUser } from "@osn/common-ui";
import NewAssetButton from "@/components/newSpace/newTokenWeightedSpace/step2/newButton";
import { ReactComponent as UserIcon } from "../../public/imgs/icons/user.svg";
import { ethers } from "ethers";
import { isSameAddress } from "frontedUtils/address";
import encodeAddressByChain from "frontedUtils/chain/addr";

const checkAddressIsAlreadyExists = (list, address, index) => {
  const currentIndex = list.findIndex((item) => isSameAddress(item, address));
  return currentIndex !== index;
};

export default function SpaceMemberList({
  minLength,
  addressList,
  onChange: setMembers,
}) {
  const onChange = (value, index) => {
    const newMembers = [...addressList];
    newMembers[index] = value;
    setMembers(newMembers);
    onCheckError(value, index);
  };

  const onCheckError = (value, index) => {
    setErrors((val) => {
      val[index] = !isAddress(value);
      return [...val];
    });
  };

  const onDelete = (index) => {
    const newMembers = [...addressList];
    newMembers.splice(index, 1);
    setMembers([...newMembers]);

    setErrors((val) => {
      val.splice(index, 1);
      return [...val];
    });
  };

  const addMember = () => {
    setMembers([...addressList, ""]);
    setCurrentInput(addressList.length);
  };
  const [currentInput, setCurrentInput] = useState(0);
  const [errors, setErrors] = useState([]);

  return (
    <Flex className="flex flex-col gap-4">
      {addressList.map((member, index) => {
        return (
          <MemberAddress
            defaultValue={member}
            key={`member-${index}-${member}`}
            autoFocus={currentInput === index}
            onBlur={(value) => {
              setCurrentInput(null);
              onChange(value, index);
            }}
            onFocus={() => {
              setCurrentInput(index);
            }}
            onChange={(value) => onChange(value, index)}
            isAlreadyExist={checkAddressIsAlreadyExists(
              addressList,
              member,
              index,
            )}
            error={errors[index]}
            showInput={currentInput === index ? true : !isAddress(member)}
            deleteComponent={
              <>
                <DeleteButton
                  hidden={addressList.length <= minLength}
                  onClick={() => onDelete(index)}
                />
              </>
            }
          />
        );
      })}
      <Flex className="w-full justify-start">
        <NewAssetButton onClick={addMember}>New Member</NewAssetButton>
      </Flex>
    </Flex>
  );
}

const MemberAddress = ({
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  autoFocus,
  isAlreadyExist,
  error,
  deleteComponent,
  showInput,
}) => {
  if (!showInput) {
    return (
      <div className="w-full">
        <MemberItem>
          <AddressDetail address={defaultValue} onClick={onFocus} />
          {deleteComponent}
        </MemberItem>
        <MemberAddressErrorText isError={isAlreadyExist}>
          Address already exists
        </MemberAddressErrorText>
      </div>
    );
  }

  return (
    <div className="w-full">
      <MemberItem isError={error}>
        <Flex className="gap-2 w-full">
          <UserIcon className="h-5 w-5" />
          <MemberAddressInput
            placeholder="polkadot or evm address..."
            value={defaultValue}
            onChange={(e) => {
              const value = e.target.value.trim();
              onChange(value);
              if (isAddress(value)) {
                onBlur(encodeAddressByChain(value, "polkadot"));
              }
            }}
            onBlur={(e) => {
              onBlur(e.target.value.trim());
            }}
            onFocus={() => onFocus()}
            autoFocus={autoFocus}
          />
        </Flex>
        {deleteComponent}
      </MemberItem>
      <MemberAddressErrorText isError={error}>
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
