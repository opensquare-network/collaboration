import { cn, useIsDark } from "@osn/common-ui";
import styled, { css } from "styled-components";

const SkeletonDiv = styled.div`
  ${(props) =>
    props.isDark
      ? css`
          background: linear-gradient(
            90deg,
            var(--fillBgTertiary) 0%,
            var(--neutralGray900) 49.5%,
            var(--fillBgTertiary) 100%
          );
        `
      : css`
          background: linear-gradient(
            270deg,
            var(--fillBgTertiary) 0%,
            var(--neutralGray50) 50%,
            var(--fillBgTertiary) 100%
          );
        `}
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
      <div className="flex py-[12px] gap-[20px] sm:hidden">
        <Skeleton className="h-[24px] grow" />
        <Skeleton className="h-[24px] grow" />
      </div>
      <div className="flex justify-between py-[12px] border-t border-strokeActionDisable">
        <div className="flex gap-[20px] max-sm:hidden">
          <Skeleton className="h-[24px] w-[80px]" />
          <Skeleton className="h-[24px] w-[80px]" />
        </div>
        <Skeleton className="h-[24px] grow sm:max-w-[240px]" />
      </div>
      <div className="grow bg-fillBgInputDefault"></div>
    </div>
  );
}
