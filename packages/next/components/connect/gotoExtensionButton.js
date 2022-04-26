import Button from "@osn/common-ui/es/styled/Button";
import { memo } from "react";

function GoToExtension({ text, link = "https://polkadot.js.org/extension/" }) {
  return (
    <Button
      color="orange"
      onClick={() => {
        const newWindow = window.open(link, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
      }}
    >
      {text}
    </Button>
  );
}

export default memo(GoToExtension);
