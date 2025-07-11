import {
  SelectTypeItem,
  SelectTypeItemDesc,
  SelectTypeItemTitle,
  SelectTypeTitle,
} from "@/components/newSpace/styled";
import { useIsDark } from "@osn/common-ui";
import { useMemo } from "react";

export default function SelectSpaceType() {
  const isDark = useIsDark();
  const logoURL = useMemo(() => {
    return {
      collectives: `/imgs/img-space-collectives-${
        isDark ? "dark" : "light"
      }.svg`,
      tokenWeighted: `/imgs/img-space-token-weighted-${
        isDark ? "dark" : "light"
      }.svg`,
    };
  }, [isDark]);

  return (
    <>
      <SelectTypeTitle className="text-center text-textPrimary font-bold">
        Choose Space Type
      </SelectTypeTitle>

      <div className="flex justify-center gap-5 pb-[118px]">
        <SelectTypeItem href={"new/collectives"}>
          <img
            className="w-[234px] h-[234px]"
            src={logoURL.collectives}
            alt="collectives"
          />
          <SelectTypeItemTitle>Collectives DAO</SelectTypeItemTitle>
          <SelectTypeItemDesc>One person, one vote</SelectTypeItemDesc>
        </SelectTypeItem>
        <SelectTypeItem href={"new/token-weighted"}>
          <img
            className="w-[234px] h-[234px]"
            src={logoURL.tokenWeighted}
            alt="tokenWeighted"
          />
          <SelectTypeItemTitle>Token-weighted DAO</SelectTypeItemTitle>
          <SelectTypeItemDesc>Voting by balance</SelectTypeItemDesc>
        </SelectTypeItem>
      </div>
    </>
  );
}
