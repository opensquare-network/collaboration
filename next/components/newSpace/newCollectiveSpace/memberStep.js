import BackButton from "@/components/newSpace/backButton";
import { Button, Divider } from "@osn/common-ui";
import { Hint, Sections, SectionTitle } from "@/components/newSpace/styled";
import NewAssetButton from "@/components/newSpace/newTokenWeightedSpace/step2/newButton";
import Author from "@/components/author";
import Avatar from "@/components/avatar";
import { IdentityUser } from "@osn/common-ui";
import IdentityOrAddr from "@/components/identityOrAddr";
import { ReactComponent as UserIcon } from "../../../public/imgs/icons/user.svg";
import styled from "styled-components";

const MemberItem = styled.div`
  display: flex;
  padding: 12px 16px;
  //justify-content: center;
  //align-items: center;
  gap: 8px;
  align-self: stretch;
  border-bottom: 1px solid var(--strokeActionDefault);
  background: var(--fillBgInputDefault);
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
        <div class="space-y-4">
          <SectionTitle>Strategies</SectionTitle>
          <Hint>
            <p>Please input a Polkadot or EVM address to add a DAO member.</p>
            <p>The DAO creator has the authority to set the DAO space.</p>
          </Hint>
        </div>
      </Sections>
      <Divider />
      <div class="flex flex-col gap-4">
        {members.map((member, index) => {
          return (
            <MemberItem key={index} className="px-4 py-3">
              {member ? (
                <>
                  <Avatar address={member} />
                  <IdentityOrAddr
                    network={"polkadot"}
                    address={member}
                    noLink={false}
                  />
                </>
              ) : (
                <div class={"flex gap-2"}>
                  <UserIcon />
                  <input
                    placeholder="address..."
                    value={member}
                    onChange={() => {}}
                  />
                </div>
              )}
            </MemberItem>
          );
        })}
        <NewAssetButton
          onClick={() => {
            setMembers([...members, ""]);
          }}
        >
          New Member
        </NewAssetButton>
      </div>
      <Divider />
      <div>
        <div class="flex gap-5">
          <BackButton onClick={onBackStep} />
          <Button block onClick={nextStep}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
