import BackButton from "@/components/newSpace/backButton";
import { Button, Divider } from "@osn/common-ui";
import { Hint, Sections, SectionTitle } from "@/components/newSpace/styled";
import SpaceMemberList from "@/components/newSpace/spaceMemberList";
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

    return new Set(members).size === members.length;
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
            <p>Please add polkadot or ethereum addresses</p>
            <p>At least 2 members</p>
            <p>You will be the admin by default</p>
          </Hint>
        </div>
      </Sections>
      <Divider />
      <SpaceMemberList
        addressList={members}
        onChange={setMembers}
        minLength={2}
        defaultFocus={0}
      />
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
