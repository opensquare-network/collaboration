import { cn } from "@osn/common-ui";
import { useMemo, useState } from "react";

export default function SettingsNavigation({ items }) {
  const [step, setStep] = useState(() => items[0].value);

  const content = useMemo(() => {
    return items.find((item) => item.value === step)?.content || null;
  }, [items, step]);

  return (
    <>
      <div>
        <div className="sm:w-[300px] py-[20px] bg-fillBgPrimary border border-strokeBorderDefault shadow-shadowCardDefault">
          {items.map((item) => {
            return (
              <div
                key={item.value}
                className={cn(
                  "flex gap-[8px] py-[12px] px-[16px] cursor-pointer",
                  step === item.value ? "bg-fillBgTertiary" : "",
                )}
                onClick={() => {
                  setStep(item.value);
                }}
              >
                {item.icon}
                <span className="text16Semibold text-textPrimary">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {content}
    </>
  );
}
