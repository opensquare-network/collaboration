import { cn, Flex } from "@osn/common-ui";
import { Title } from "../postCreate/content";
import Save from "./save";
import { Divider } from "../postDetail/strategyResult/common/styled";
import { useState } from "react";
import SpaceMemeberList from "../newSpace/spaceMemberList";
import { Hint } from "../newSpace/styled";
import nextApi from "services/nextApi";
import { useDispatch, useSelector } from "react-redux";
import {
  newErrorToast,
  newSuccessToast,
} from "../../store/reducers/toastSlice";
import useSignApiData from "hooks/useSignApiData";
import { extensionCancelled } from "../../frontedUtils/consts/extension";
import { loginAccountSelector } from "../../store/reducers/accountSlice";
import encodeAddressByChain from "../../frontedUtils/chain/addr";

export default function MemberManagement({ space }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <MemeberCard space={space} />
      <AdminsCard space={space} />
    </div>
  );
}

const MemeberCard = ({ space }) => {
  const [members, setMembers] = useState(space.members || []);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(loginAccountSelector);
  const signApiData = useSignApiData();

  const onSubmit = async () => {
    setIsLoading(true);
    const signedData = await signApiData(
      { members },
      encodeAddressByChain(account.address, account?.network),
    ).catch((e) => {
      const errorMessage = e.message;
      if (extensionCancelled !== errorMessage) {
        dispatch(newErrorToast(errorMessage));
      }
      setIsLoading(false);
    });
    if (!signedData) {
      return;
    }
    // return console.log("signedData", signedData);

    const { result, error } = await nextApi
      .post(`/spaces/${space.id}/members`, {
        ...signedData,
        data: members,
      })
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
        <SpaceMemeberList
          minLength={2}
          members={members}
          setMembers={setMembers}
        />
        <Flex className="justify-end">
          <Save loading={isLoading} onSave={onSubmit} />
        </Flex>
      </div>
    </div>
  );
};

const AdminsCard = ({ space }) => {
  const [admins, setAdmins] = useState(space.admins || []);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector(loginAccountSelector);
  const signApiData = useSignApiData();

  const onSubmit = async () => {
    setIsLoading(true);
    const signedData = await signApiData(
      { admins },
      encodeAddressByChain(account.address, account?.network),
    ).catch((e) => {
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
      .post(`/spaces/${space.id}/admins`, {
        ...signedData,
        data: admins,
      })
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
        <SpaceMemeberList
          minLength={1}
          members={admins}
          setMembers={setAdmins}
        />

        <Flex className="justify-end">
          <Save loading={isLoading} onSave={onSubmit} />
        </Flex>
      </div>
    </div>
  );
};
