import { SystemNewPost, SystemInfo } from "@osn/icons/opensquare";

export default function SettingsNavigation({ step, setStep }) {
  return (
    <div>
      <div className="sm:w-[300px] py-[20px] bg-fillBgPrimary border border-strokeBorderDefault shadow-shadowCardDefault">
        <div
          className={`flex gap-[8px] py-[12px] px-[16px] cursor-pointer ${
            step === 0 ? "bg-fillBgTertiary" : ""
          }`}
          onClick={() => {
            setStep(0);
          }}
        >
          <SystemInfo className="[&_path]:fill-textTertiary" />
          <span className="text16Semibold text-textPrimary">Space Profile</span>
        </div>
        <div
          className={`flex gap-[8px] py-[12px] px-[16px] cursor-pointer  ${
            step === 1 ? "bg-fillBgTertiary" : ""
          }`}
          onClick={() => {
            setStep(1);
          }}
        >
          <SystemNewPost className="[&_path]:fill-textTertiary" />
          <span className="text16Semibold text-textPrimary">
            Proposal Template
          </span>
        </div>
      </div>
    </div>
  );
}
