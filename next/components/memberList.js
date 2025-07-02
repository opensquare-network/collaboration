import Author from "@/components/author";
import { Divider } from "@osn/common-ui";

export default function MemberList({
  members = [],
  space,
  isCollective = false,
}) {
  return (
    <div>
      <header className="text16Semibold flex items-center gap-x-1">
        <span>Members</span>
        <span className="text-textTertiary">·</span>
        <span className="text-textTertiary">{members?.length ?? 0}</span>
      </header>
      <Divider />
      <div className="max-h-[236px] overflow-y-auto">
        {members?.map((member) => (
          <div key={member}>
            <Author
              space={space}
              address={member}
              isCollective={isCollective}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
