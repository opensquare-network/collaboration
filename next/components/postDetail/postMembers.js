import Modal from "@osn/common-ui/es/Modal";
import { InfoItem } from "../styled/infoItem";
import MemberList from "../memberList";
import { useState } from "react";
import { findNetworkConfig } from "services/util";

export default function PostMembers({ whitelist = [], data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const len = whitelist?.length;
  if (len <= 0) {
    return null;
  }

  const networkConfig = findNetworkConfig(
    data.networksConfig,
    data.proposerNetwork,
  );

  const handleShowModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <InfoItem>
        <div>Members</div>
        <div
          className="cursor-pointer text-textPrimary hover:underline"
          onClick={handleShowModal}
        >
          {len}
        </div>
      </InfoItem>
      <Modal
        title="Members"
        open={modalOpen}
        setOpen={setModalOpen}
        okText="Close"
        closeBar={false}
        okButtonProps={{ primary: false }}
        onOk={handleCloseModal}
      >
        <MemberList members={whitelist} space={networkConfig} />
      </Modal>
    </>
  );
}
