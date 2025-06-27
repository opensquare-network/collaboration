import { cn, Flex } from "@osn/common-ui";
import { Title } from "../postCreate/content";
import Save from "./save";
import { Divider } from "../postDetail/strategyResult/common/styled";
import { useMemo, useState } from "react";
import SpaceMemberList from "../newSpace/spaceMemberList";
import { Hint } from "../newSpace/styled";
import nextApi from "services/nextApi";
import { useDispatch } from "react-redux";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import useSignApiData from "hooks/useSignApiData";
import { extensionCancelled } from "frontedUtils/consts/extension";
import { isAddress } from "@polkadot/util-crypto";

export default function MemberManagement({ space }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <MemberCard space={space} />
      <AdminsCard space={space} />
    </div>
  );
}

const MemberCard = ({ space }) => {
  const [members, setMembers] = useState(space.members || []);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const signData = useSignApiData();

  const onSubmit = async () => {
    setIsLoading(true);
    const signedData = await signData({ members }).catch((e) => {
      const errorMessage = e.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
    });

    if (!signedData) {
      return;
    }
    const { result, error } = await nextApi
      .post(`spaces/${space.id}/members`, signedData)
      .finally(() => {
        setIsLoading(false);
      });

    if (result) {
      dispatch(newSuccessToast("Settings saved successfully!"));
    }
    if (error) {
      dispatch(newErrorToast(error.message));
    }
  };

  const addressAllIsValid = useMemo(() => {
    for (const member of members) {
      if (!isAddress(member)) {
        return false;
      }
    }

    return new Set(members).size === members.length;
  }, [members]);

  return (
    <div
      className={cn(
        "flex flex-col grow p-[32px] max-sm:p-[20px] gap-[32px]",
        "border border-strokeBorderDefault bg-fillBgPrimary shadow-shadowCardDefault",
      )}
    >
      <div className="flex flex-col gap-[20px]">
        <Title>Members {members.lenght}</Title>
        <Hint>
          <p>Please input a Polkadot or EVM address to add a DAO member.</p>
          <p>Add at least 2 more members to this DAO.</p>
        </Hint>
        <Divider className="!m-0" />
        <SpaceMemberList
          minLength={2}
          members={members}
          setMembers={setMembers}
        />
        <Flex className="justify-end">
          <Save
            disabled={!addressAllIsValid}
            loading={isLoading}
            onSave={onSubmit}
          />
        </Flex>
      </div>
    </div>
  );
};

const AdminsCard = ({ space }) => {
  const [admins, setAdmins] = useState(space.admins || []);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const signData = useSignApiData();

  const onSubmit = async () => {
    setIsLoading(true);
    const signedData = await signData({ admins }).catch((e) => {
      const errorMessage = e.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
    });
    if (!signedData) {
      return;
    }

    const { result, error } = await nextApi
      .post(`spaces/${space.id}/admins`, signedData)
      .finally(() => {
        setIsLoading(false);
      });

    if (result) {
      dispatch(newSuccessToast("Settings saved successfully!"));
    }
    if (error) {
      dispatch(newErrorToast(error.message));
    }
  };

  const addressAllIsValid = useMemo(() => {
    for (const member of admins) {
      if (!isAddress(member)) {
        return false;
      }
    }

    return new Set(admins).size === admins.length;
  }, [admins]);

  return (
    <div
      className={cn(
        "flex flex-col grow p-[32px] max-sm:p-[20px] gap-[32px]",
        "border border-strokeBorderDefault bg-fillBgPrimary shadow-shadowCardDefault",
      )}
    >
      <div className="flex flex-col gap-[20px]">
        <Title>Admins {admins.lenght}</Title>
        <Hint>
          <p>Please input a Polkadot or EVM address to add a DAO member.</p>
          <p>Add at least 2 more members to this DAO.</p>
        </Hint>
        <Divider className="!m-0" />
        <SpaceMemberList
          minLength={1}
          members={admins}
          setMembers={setAdmins}
        />

        <Flex className="justify-end">
          <Save
            disabled={!addressAllIsValid}
            loading={isLoading}
            onSave={onSubmit}
          />
        </Flex>
      </div>
    </div>
  );
};
