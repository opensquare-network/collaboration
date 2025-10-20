import styled from "styled-components";
import { p_14_medium } from "@osn/common-ui/es/styles/textStyles";
import { Time, Flex, Dot, MentionIdentityUser } from "@osn/common-ui";
import { ReactComponent as CheckIcon } from "@osn/common-ui/es/imgs/icons/check.svg";
import { useMemo, useState } from "react";
import { useSpaceIconUri } from "frontedUtils/space";
import {
  MarkdownPreviewer,
  renderMentionIdentityUserPlugin,
} from "@osn/previewer";

const MarkDown = styled(MarkdownPreviewer)`
  ${p_14_medium};
`;

const EventTypeName = {
  newProposal: "New Proposal",
  proposalStarted: "Proposal Started",
  proposalCloseToEnd: "Proposal Close to End",
  proposalEnd: "Proposal End",
  proposalTerminated: "Proposal Terminated",
  commentMentionUser: "Comment Mentioned",
  appendantMentionUser: "Appendant Mentioned",
  voteMentionUser: "Vote Mentioned",
};

export default function NotificationItem({ data, onMarkAsRead = () => {} }) {
  const { type, data: { space, proposalCid, cid, content } = {} } = data;

  const href = useMemo(() => {
    let anchor = "";
    if (type === "commentMentionUser") {
      anchor = `comment_${cid}`;
    }
    if (type === "voteMentionUser") {
      anchor = `vote_${cid}`;
    }
    if (type === "appendantMentionUser") {
      anchor = `appendant_${cid}`;
    }
    return `/space/${space}/proposal/${proposalCid}?anchor=${anchor}`;
  }, [cid, proposalCid, space, type]);

  return (
    <div className="group bg-fillBgPrimary p-6 border border-strokeBorderDefault shadow-shadowCardDefault">
      <NotificationItemHeader data={data} onMarkAsRead={onMarkAsRead} />
      {content && (
        <a className="hover:underline" href={href}>
          <MarkDown
            content={content}
            plugins={[
              renderMentionIdentityUserPlugin(
                <MentionIdentityUser className="px-0" explore />,
              ),
            ]}
            maxLines={2}
            markedOptions={{
              breaks: true,
            }}
          />
        </a>
      )}
      <NotificationItemFooter data={data} />
    </div>
  );
}

function NotificationItemHeader({ onMarkAsRead, data }) {
  const { type, read: _read, data: { spaceInfo } = {} } = data;
  const [read, setRead] = useState(_read);

  function handleMarkAsRead(data) {
    onMarkAsRead(data);
    setRead(true);
  }

  const spaceIcon = useSpaceIconUri(spaceInfo);

  return (
    <Flex className="justify-between items-center pb-3">
      <div className="flex">
        <img
          width="20px"
          height="20px"
          className="ml-4px"
          src={spaceIcon}
          alt=""
        />
        <Dot />
        <div className="text-textSecondary text-sm">{EventTypeName[type]}</div>
      </div>
      {!read ? (
        <button
          onClick={() => handleMarkAsRead(data)}
          className=" w-5 h-5 flex justify-center items-center"
        >
          <div className="w-2 h-2 bg-textBrandSecondary max-sm:hidden group-hover:hidden " />
          <CheckIcon className="w-4 sm:hidden group-hover:block" />
        </button>
      ) : null}
    </Flex>
  );
}

function NotificationItemFooter({ data }) {
  const { createdAt, data: { space, title, proposalCid } = {} } = data;

  return (
    <div className="flex md:flex-row flex-col gap-2 justify-between border-t border-fillBgQuaternary pt-3 mt-3">
      <a
        href={`/space/${space}/proposal/${proposalCid}`}
        className="hover:underline text-xs font-bold overflow-hidden line-clamp-1 "
      >
        {title}
      </a>
      <div className="text-end">
        <Time className="text-xs" time={createdAt} />
      </div>
    </div>
  );
}
