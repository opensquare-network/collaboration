import { cn } from "@osn/common-ui";
import dynamic from "next/dynamic";
import { useState } from "react";
import LoadingEditor from "./loading";

const RichEditor = dynamic(
  () => import("@osn/common-ui").then((mod) => mod.RichEditor),
  { ssr: false },
);

export default function Editor(props) {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <div
      className={cn(
        "relative",
        isPreview
          ? "min-h-[182px] max-sm:min-h-[182px]"
          : "min-h-[182px] max-sm:min-h-[222px]",
        "[&_.rich-editor]:bg-fillBgPrimary",
      )}
    >
      <LoadingEditor />
      <div className="absolute top-0 right-0 bottom-0 left-0 z-10">
        <RichEditor {...props} onChangePreviewMode={setIsPreview} />
      </div>
    </div>
  );
}