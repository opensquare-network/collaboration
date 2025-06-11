/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "../../store/reducers/accountSlice";
import pick from "lodash/pick";
import SettingsNavigation from "./nav.js";
import ProposalTemplate from "./proposalTemplate.js";

export default function PostSettings({ space, settings }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        space?.networks?.map((item) => pick(item, ["network", "ss58Format"])) ||
          [],
      ),
    );
  }, [dispatch, space]);

  return (
    <div className="flex mt-[20px] gap-[20px] max-sm:flex-col max-sm:mx-[-20px]">
      <SettingsNavigation />
      <ProposalTemplate space={space} settings={settings} />
    </div>
  );
}
