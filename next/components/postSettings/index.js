import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "../../store/reducers/accountSlice";
import { pick } from "lodash-es";
import SettingsNavigation from "./nav.js";
import ProposalTemplate from "./proposalTemplate.js";
import SpaceProfile from "./spaceProfile";
import { SystemNewPost, SystemInfo } from "@osn/icons/opensquare";

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

  const items = useMemo(
    () => [
      {
        label: "Space Profile",
        icon: <SystemInfo className="[&_path]:fill-textTertiary" />,
        value: "spaceProfile",
        content: <SpaceProfile space={space} settings={settings} />,
      },
      {
        label: "Proposal Template",
        icon: <SystemNewPost className="[&_path]:fill-textTertiary" />,
        value: "proposalTemplate",
        content: <ProposalTemplate space={space} settings={settings} />,
      },
    ],
    [settings, space],
  );

  return (
    <div className="flex mt-[20px] gap-[20px] max-sm:flex-col max-sm:mx-[-20px]">
      <SettingsNavigation items={items} />
    </div>
  );
}
