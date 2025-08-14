import { Flex, Divider } from "@osn/common-ui";
import { Title } from "../postCreate/content";
import Save from "./save";
import { useMemo, useState } from "react";
import SpaceMemberList from "../newSpace/spaceMemberList";
import { Hint } from "../newSpace/styled";
import nextApi from "services/nextApi";
import { useDispatch } from "react-redux";
import { newErrorToast, newSuccessToast } from "store/reducers/toastSlice";
import useSignApiData from "hooks/useSignApiData";
import { extensionCancelled } from "frontedUtils/consts/extension";
import { isAddress } from "@polkadot/util-crypto";
import styled from "styled-components";
import { useRouter } from "next/router";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 32px;
  gap: 20px;
  border: 1px solid var(--strokeBorderDefault);
  background-color: var(--fillBgPrimary);
  @media (max-width: 639px) {
    padding: 20px;
  }
`;

export default function MemberManagement({ space }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <MemberCard space={space} />
      <AdminsCard space={space} />
    </div>
  );
}

const MemberCard = ({ space }) => {
  const router = useRouter();
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
      router.replace(router.asPath);
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
    <CardWrapper className={"shadow-shadowCardDefault"}>
      <Title>
        Members <span className="text-textTertiary">· {members.length}</span>
      </Title>
      <Hint>
        <p>Please add polkadot or ethereum addresses</p>
        <p>At least 2 members</p>
      </Hint>
      <Divider className="!m-0" />
      <SpaceMemberList
        minLength={2}
        addressList={members}
        onChange={setMembers}
      />
      <Flex className="justify-end">
        <Save
          disabled={!addressAllIsValid}
          loading={isLoading}
          onSave={onSubmit}
        />
      </Flex>
    </CardWrapper>
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
    <CardWrapper className={"shadow-shadowCardDefault"}>
      <Title>
        Admins <span className="text-textTertiary">· {admins.length}</span>
      </Title>
      <Hint>
        <p>Please add polkadot or ethereum addresses</p>
        <p>At least 2 members</p>
      </Hint>
      <Divider className="!m-0" />
      <SpaceMemberList
        minLength={1}
        addressList={admins}
        onChange={setAdmins}
      />

      <Flex className="justify-end">
        <Save
          disabled={!addressAllIsValid}
          loading={isLoading}
          onSave={onSubmit}
        />
      </Flex>
    </CardWrapper>
  );
};
