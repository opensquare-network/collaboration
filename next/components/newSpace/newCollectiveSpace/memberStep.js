import BackButton from "@/components/newSpace/backButton";
import { Button, Divider, Tooltip, FlexBetween, Flex } from "@osn/common-ui";
import { Hint, Sections, SectionTitle } from "@/components/newSpace/styled";
import NewAssetButton from "@/components/newSpace/newTokenWeightedSpace/step2/newButton";
import Avatar from "@/components/avatar";
import IdentityOrAddr from "@/components/identityOrAddr";
import { ReactComponent as UserIcon } from "../../../public/imgs/icons/user.svg";
import styled from "styled-components";
import { isAddress } from "@polkadot/util-crypto";
import { SystemDelete } from "@osn/icons/opensquare";
import { useState } from "react";

const MemberItem = styled(FlexBetween)`
  display: flex;
  padding: 12px 16px;
  gap: 8px;
  align-self: stretch;
  border-bottom: 1px solid var(--strokeActionDefault);
  background: var(--fillBgInputDefault);
`;

const Input = styled.input`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  flex-grow: 1;
  text-align: left;
  color: var(--textPrimary);
  placeholder {
    color: var(--textQuaternary);
  }
`;

export default function MemberStep({
  members,
  setMembers,
  onNextStep,
  onBackStep,
}) {
  const nextStep = () => {
    onNextStep();
  };

  return (
    <>
      <Divider />
      <Sections>
        <div className="space-y-4">
          <SectionTitle>Strategies</SectionTitle>
          <Hint>
            <p>Please input a Polkadot or EVM address to add a DAO member.</p>
            <p>The DAO creator has the authority to set the DAO space.</p>
          </Hint>
        </div>
      </Sections>
      <Divider />
      <MemeberList members={members} setMembers={setMembers} />
      <Divider />
      <div>
        <div className="flex gap-5">
          <BackButton onClick={onBackStep} />
          <Button block onClick={nextStep}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

const MemeberList = ({ members, setMembers }) => {
  return (
    <Flex className="flex flex-col gap-4">
      {members.map((member, index) => {
        return (
          <MemberItem key={index} className="px-4 py-3 justify-between">
            <MemberAddress
              address={member}
              onChange={(value) => {
                const newMembers = [...members];
                newMembers[index] = value;
                setMembers(newMembers);
              }}
            />
            <Tooltip content="Remove">
              <Button
                className="!p-0 border-none h-auto"
                onClick={() => {
                  const newMembers = [...members];
                  newMembers.splice(index, 1);
                  setMembers(newMembers);
                }}
              >
                <SystemDelete className="w-5 h-5" />
              </Button>
            </Tooltip>
          </MemberItem>
        );
      })}
      <Flex className="w-full justify-start">
        <NewAssetButton
          onClick={() => {
            setMembers([...members, ""]);
          }}
        >
          New Member
        </NewAssetButton>
      </Flex>
    </Flex>
  );
};

const MemberAddress = ({ address, onChange }) => {
  const [showInput, setShowInput] = useState(false);
  if (!showInput && isAddress(address)) {
    return (
      <Flex className="gap-2" onClick={() => setShowInput(true)}>
        <Avatar size={20} address={address} />
        <IdentityOrAddr address={address} noLink={true} />
      </Flex>
    );
  }
  return (
    <Flex className="gap-2 w-full">
      <UserIcon className="h-5 w-5" />
      <Input
        className="px-0 outline-none bg-none"
        placeholder="address..."
        value={address}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onBlur={() => {
          setShowInput(false);
        }}
        autoFocus
      />
    </Flex>
  );
};
