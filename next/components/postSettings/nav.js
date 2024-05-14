import { SystemNewPost } from "@osn/icons/opensquare";

export default function SettingsNavigation() {
  return (
    <div>
      <div className="w-[300px] py-[20px] bg-fillBgPrimary border border-strokeBorderDefault shadow-shadowCardDefault">
        <div className="flex gap-[8px] py-[12px] px-[16px] bg-fillBgTertiary">
          <SystemNewPost className="[&_path]:fill-textTertiary" />
          <span className="text16Semibold text-textPrimary">
            Proposal Template
          </span>
        </div>
      </div>
    </div>
  );
}
