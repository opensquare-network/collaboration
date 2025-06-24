/* eslint-disable react/no-unescaped-entities */
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "../../store/reducers/accountSlice";
import pick from "lodash/pick";
import SettingsNavigation from "./nav.js";
import ProposalTemplate from "./proposalTemplate.js";
import SpaceProfile from "./spaceProfile";

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

  const [step, setStep] = useState(0);
  const stepContent = useMemo(() => {
    switch (step) {
      case 0:
        return <SpaceProfile space={space} settings={settings} />;
      case 1:
        return <ProposalTemplate space={space} settings={settings} />;
      default:
        return null;
    }
  }, [settings, space, step]);

  return (
    <div className="flex mt-[20px] gap-[20px] max-sm:flex-col max-sm:mx-[-20px]">
      <SettingsNavigation step={step} setStep={setStep} />
      {stepContent}
    </div>
  );
}
