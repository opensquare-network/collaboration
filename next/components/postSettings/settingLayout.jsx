import Layout from "components/layout";
import Breadcrumb from "components/breadcrumb";
import { useMemo } from "react";
import { getSpaceNetwork } from "frontedUtils/space";
import { isCollectiveSpace } from "frontedUtils/space";
import {
  SystemNewPost,
  SystemInfo,
  SystemMemberManagement,
} from "@osn/icons/opensquare";
import { cn } from "@osn/common-ui";
import Link from "next/link";

export default function SettingLayout({ space, activeTab = "", children }) {
  const items = useMemo(
    () =>
      [
        {
          value: "space",
          label: "Space Profile",
          icon: <SystemInfo className="[&_path]:fill-textTertiary" />,
        },
        {
          value: "proposal-template",
          label: "Proposal Template",
          icon: <SystemNewPost className="[&_path]:fill-textTertiary" />,
        },
        isCollectiveSpace(space.type) && {
          value: "member",
          label: "Member Management",
          icon: (
            <SystemMemberManagement className="[&_path]:fill-textTertiary" />
          ),
        },
      ].filter(Boolean),
    [space],
  );

  return (
    <Layout bgHeight="183px" networks={getSpaceNetwork(space)}>
      <Breadcrumb
        routes={[
          { name: "Home", link: "/" },
          { name: space?.name, link: `/space/${space?.id}` },
          { name: "Settings" },
        ]}
      />
      <div className="flex mt-[20px] gap-[20px] max-sm:flex-col max-sm:mx-[-20px]">
        <div>
          <div className="sm:w-[300px] py-[20px] bg-fillBgPrimary border border-strokeBorderDefault shadow-shadowCardDefault">
            {items.map((item) => {
              return (
                <Link
                  href={`/space/${space.id}/settings/${item.value}`}
                  key={item.value}
                  className={cn(
                    "flex gap-[8px] py-[12px] px-[16px] cursor-pointer",
                    activeTab === item.value ? "bg-fillBgTertiary" : "",
                  )}
                >
                  {item.icon}
                  <span className="text16Semibold text-textPrimary">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        {children}
      </div>
    </Layout>
  );
}
