import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import { useEffect } from "react";
import { getSpaceNetwork } from "frontedUtils/space";
import pick from "lodash-es/pick";
import SettingLayout from "@/components/postSettings/settingLayout";
export { getServerSideProps } from "./space";
import ProposalTemplate from "@/components/postSettings/proposalTemplate";

export default function Settings({ space, settings }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        getSpaceNetwork(space)?.map((item) =>
          pick(item, ["network", "ss58Format"]),
        ),
      ),
    );
  }, [dispatch, space]);
  return (
    <SettingLayout space={space} activeTab="proposal-template">
      <ProposalTemplate space={space} settings={settings} />
    </SettingLayout>
  );
}
