import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "../../store/reducers/accountSlice";
import SettingsNavigation from "./nav.js";
import ProposalTemplate from "./proposalTemplate.js";
import SpaceProfile from "./spaceProfile";
import MemberManagement from "./memberManagement.js";
import {
  SystemNewPost,
  SystemInfo,
  SystemMemberManagement,
} from "@osn/icons/opensquare";
import { getSpaceNetwork, isCollectiveSpace } from "../../frontedUtils/space";

export default function PostSettings({ space, settings }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAvailableNetworks(getSpaceNetwork(space)));
  }, [dispatch, space]);

  const items = useMemo(
    () =>
      [
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
        isCollectiveSpace(space.type) && {
          label: "Member Management",
          icon: (
            <SystemMemberManagement className="[&_path]:fill-textTertiary" />
          ),
          value: "memberManagement",
          content: <MemberManagement space={space} settings={settings} />,
        },
      ].filter(Boolean),
    [settings, space],
  );

  return (
    <div className="flex mt-[20px] gap-[20px] max-sm:flex-col max-sm:mx-[-20px]">
      <SettingsNavigation items={items} />
    </div>
  );
}
