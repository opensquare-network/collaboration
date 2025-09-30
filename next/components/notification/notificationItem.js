import styled from "styled-components";
import { p_14_medium } from "@osn/common-ui/es/styles/textStyles";
import { Time, Flex, Dot } from "@osn/common-ui";
import {
  text_dark_minor,
  primary_turquoise_500,
  text_dark_accessory,
} from "@osn/common-ui/es/styles/colors";
import { ReactComponent as CheckIcon } from "@osn/common-ui/es/imgs/icons/check.svg";
import { MOBILE_SIZE } from "@osn/constants";
import { useMemo, useState } from "react";
import { useSpaceIconUri } from "frontedUtils/space";
import {
  MarkdownPreviewer,
  renderMentionIdentityUserPlugin,
} from "@osn/previewer";
import IdentityOrAddr from "../identityOrAddr";

const NotificationItemWrapper = styled.div`
  &:hover {
    .unread-dot {
      display: none;
    }
    .check-icon {
      display: block;
      path {
        fill: ${text_dark_accessory};
      }
    }
  }
`;

const Head = styled.div`
  padding: 24px;
  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);
`;

const Type = styled.div`
  text-transform: capitalize;
  color: ${text_dark_minor};

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    &::after {
      display: none;
    }
  }
`;

const MarkAsReadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background-color: transparent;

  .check-icon {
    display: none;
  }

  &:hover {
    .unread-dot {
      display: none;
    }

    .check-icon {
      display: block;

      path {
        fill: ${text_dark_minor};
      }
    }
  }
`;

const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${primary_turquoise_500};
`;

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
  const {
    type,
    createdAt,
    read: _read,
    data: { space, title, proposalCid, spaceInfo, cid, content } = {},
  } = data;

  const [read, setRead] = useState(_read);

  function handleMarkAsRead(data) {
    onMarkAsRead(data);
    setRead(true);
  }

  const spaceIcon = useSpaceIconUri(spaceInfo);

  const status = (
    <>
      {!read ? (
        <MarkAsReadButton onClick={() => handleMarkAsRead(data)}>
          <UnreadDot className="unread-dot" />
          <CheckIcon className="check-icon" />
        </MarkAsReadButton>
      ) : (
        <div />
      )}
    </>
  );

  const href = useMemo(() => {
    if (type === "commentMentionUser") {
      return `/space/${space}/proposal/${proposalCid}#comment_${cid}`;
    }
    if (type === "voteMentionUser") {
      return `/space/${space}/proposal/${proposalCid}#vote_${cid}`;
    }
    if (type === "appendantMentionUser") {
      return `/space/${space}/proposal/${proposalCid}#appendant_${cid}`;
    }
    return `/space/${space}/proposal/${proposalCid}`;
  }, [cid, proposalCid, space, type]);

  return (
    <NotificationItemWrapper>
      <Head className="  space-y-2">
        <Flex className="justify-between items-center">
          <div className="flex">
            <img
              width="20px"
              height="20px"
              className="ml-4px"
              src={spaceIcon}
              alt=""
            />
            <Dot />
            <Type>{EventTypeName[type]}</Type>
          </div>
          {status}
        </Flex>
        {content && (
          <a className="hover:underline" href={href}>
            <MarkDown
              content={content}
              plugins={[renderMentionIdentityUserPlugin(<IdentityOrAddr />)]}
              maxLines={2}
              markedOptions={{
                breaks: true,
              }}
            />
          </a>
        )}

        <div className="flex md:flex-row flex-col gap-2 justify-between">
          <a
            href={`/space/${space}/proposal/${proposalCid}`}
            className="hover:underline text-xs font-bold overflow-hidden line-clamp-1 "
          >
            {title}
          </a>
          <div>
            <Time time={createdAt} />
          </div>
        </div>
      </Head>
    </NotificationItemWrapper>
  );
}
