import { cn } from "@osn/common-ui";

export default function MultiLineInput({ children, ...props }) {
  return (
    <textarea
      className={cn(
        "auto-resize resize-none h-[44px] py-[12px] px-[16px] overflow-hidden w-full",
        "text14Medium text-textPrimary placeholder-textTertiary bg-fillBgSecondary",
        "outline-none border-b border-strokeActionDefault",
        "hover:border-strokeActionActive focus:border-strokeActionActive",
        "active:border-strokeActionActive focus-within:border-strokeActionActive",
      )}
      onInput={() => {
        document.querySelectorAll(".auto-resize").forEach((el) => {
          el.style.height = "44px";
          el.style.height = el.scrollHeight + "px";
        });
      }}
      {...props}
    >
      {children}
    </textarea>
  );
}
