import Link from "next/link";
import { useMemo } from "react";
import { useSessionStorage } from "react-use";

function HydradxTip() {
  const [hidden, setHidden] = useSessionStorage("TipsHydradx", false);
  if (hidden) {
    return null;
  }
  return (
    <div>
      <div className=" mb-10 bg-fillBgTertiary px-4 py-3 text-textSecondary text14Medium flex justify-between items-center gap-2">
        <div>
          The Hydration space is now live! In case you want to check the history
          proposals{" "}
          <Link
            className="text-textLink cursor-pointer"
            href={"/space/hydration"}
          >
            here
          </Link>
          .
        </div>

        <img
          width={20} // 明确指定宽度
          height={20}
          src="/imgs/icons/close.svg"
          className="w-5 h-5"
          onClick={() => setHidden(true)}
        />
      </div>
    </div>
  );
}

export default function X({ spaceId }) {
  const Component = useMemo(() => {
    return {
      hydradx: HydradxTip,
    }[spaceId];
  }, [spaceId]);

  return Component ? <Component /> : null;
}
