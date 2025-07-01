import { Button, cn } from "@osn/common-ui";
import styled from "styled-components";

const OptionButton = styled(Button)`
  height: auto;
  background-color: var(--fillBgPrimary);
  border-color: var(--strokeActionDefault);
`;

function Option({ item, index, active, ...props }) {
  return (
    <OptionButton block className={active} active={active} {...props}>
      <span
        className={cn(
          "float-left",
          "text-textTertiary",
          active && "text-textBrandPrimary",
        )}
      >
        #{index}
      </span>
      <div
        title={item}
        className="w-full px-2 overflow-hidden text-ellipsis sm:text-nowrap text-wrap"
      >
        {item}
      </div>
    </OptionButton>
  );
}

export default Option;
