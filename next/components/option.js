import { Button, cn } from "@osn/common-ui";

function Option({ children, index, active, ...props }) {
  return (
    <Button
      block
      className={cn(active && "border-textBrandPrimary text-textBrandPrimary")}
      {...props}
    >
      <span className="w-full inline-flex items-center">
        <span
          className={cn(
            "float-left",
            "text-textTertiary",
            active && "text-textBrandPrimary",
          )}
        >
          #{index}
        </span>
        <span className="grow">{children}</span>
      </span>
    </Button>
  );
}

export default Option;
