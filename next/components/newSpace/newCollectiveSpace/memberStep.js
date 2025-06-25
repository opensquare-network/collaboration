import BackButton from "@/components/newSpace/backButton";
import { Button, Divider } from "@osn/common-ui";
import { Hint, Sections, SectionTitle } from "@/components/newSpace/styled";
import SpaceMemeberList from "@/components/newSpace/spaceMemberList";
import { useMemo } from "react";
import { newErrorToast } from "store/reducers/toastSlice";
import { useDispatch } from "react-redux";
import { isAddress } from "@polkadot/util-crypto";

const hasDuplicate = (list) => {
  const set = new Set(list);
  return set.size !== list.length;
};

export default function MemberStep({
  members,
  setMembers,
  onNextStep,
  onBackStep,
}) {
  const dispatch = useDispatch();
  const addressAllIsValid = useMemo(() => {
    for (const member of members) {
      if (!isAddress(member)) {
        return false;
      }
    }
    return true;
  }, [members]);

  const nextStep = () => {
    if (members.length === 0) {
      dispatch(newErrorToast("At least two members is required"));
      return;
    }
    if (!addressAllIsValid) {
      dispatch(newErrorToast("Invalid address"));
      return;
    }
    if (hasDuplicate(members)) {
      dispatch(newErrorToast("Duplicate members are not allowed"));
      return;
    }
    onNextStep();
  };

  return (
    <>
      <Divider />
      <Sections>
        <div className="space-y-4">
          <SectionTitle>Members</SectionTitle>
          <Hint>
            <p>Please input a Polkadot or EVM address to add a DAO member.</p>
            <p>Add at least two more members to this DAO.</p>
            <p>The DAO creator has the authority to set the DAO space.</p>
          </Hint>
        </div>
      </Sections>
      <Divider />
      <SpaceMemeberList members={members} setMembers={setMembers} />
      <Divider />
      <div>
        <div className="flex gap-5">
          <BackButton onClick={onBackStep} />
          <Button disabled={!addressAllIsValid} block onClick={nextStep}>
            Next Step
          </Button>
        </div>
      </div>
    </>
  );
}
