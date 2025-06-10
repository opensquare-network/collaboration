import { cn, useIsDark } from "@osn/common-ui";
import styled from "styled-components";
import { skeleton_gradient_dark, skeleton_gradient_light } from "../styles/editorStyles";

const SkeletonDiv = styled.div`
  ${(props) => props.isDark ? skeleton_gradient_dark : skeleton_gradient_light}
`;

const Skeleton = (props) => {
  const isDark = useIsDark();
  return <SkeletonDiv {...props} isDark={isDark} />;
};

export default function LoadingEditor() {
  return (
    <div
      className={cn(
        "flex flex-col",
        "absolute top-0 right-0 bottom-0 left-0",
        "border-t border-b border-strokeActionDisable",
      )}
    >
      <div className="flex py-[12px] gap-[20px] sm:hidden px-4">
        <Skeleton className="h-[24px] grow rounded" />
        <Skeleton className="h-[24px] grow rounded" />
      </div>
      <div className="flex justify-between py-[12px] px-4 border-t border-strokeActionDisable">
        <div className="flex gap-[20px] max-sm:hidden">
          <Skeleton className="h-[24px] w-[80px] rounded" />
          <Skeleton className="h-[24px] w-[80px] rounded" />
        </div>
        <Skeleton className="h-[24px] grow sm:max-w-[240px] rounded" />
      </div>
      <div className="grow bg-fillBgInputDefault"></div>
    </div>
  );
}