import styled from "styled-components";
import { p_14_medium } from "@osn/common-ui/es/styles/textStyles";
import { Time, Flex, Dot } from "@osn/common-ui";
import {
  text_dark_minor,
  primary_turquoise_500,
  text_dark_accessory,
} from "@osn/common-ui/es/styles/colors";
import { ReactComponent as CheckIcon } from "@osn/common-ui/es/imgs/icons/check.svg";
import Link from "next/link";
import { MOBILE_SIZE } from "@osn/constants";
import { useMemo, useState } from "react";
import { OnlyDesktop, OnlyMobile } from "@osn/common-ui";
import { useSpaceIconUri } from "frontedUtils/space";

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

const Head = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;

  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: block;
  }
`;

const TitleWrapper = styled(Flex)`
  flex: 1;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    max-width: 100%;
    display: block;
  }
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

const Title = styled.p`
  ${p_14_medium};
  margin: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }

  @media screen and (min-width: ${MOBILE_SIZE - 1}px) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin-top: 4px;
  }
`;

const StatusWrapper = styled(Flex)`
  flex: 1;
  width: 18px;
  height: 18px;
  justify-content: flex-end;
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
    data: { space, title, proposalCid, spaceInfo, cid } = {},
  } = data;

  const [read, setRead] = useState(_read);

  function handleMarkAsRead(data) {
    onMarkAsRead(data);
    setRead(true);
  }

  const spaceIcon = useSpaceIconUri(spaceInfo);

  const status = (
    <StatusWrapper>
      {!read ? (
        <MarkAsReadButton onClick={() => handleMarkAsRead(data)}>
          <UnreadDot className="unread-dot" />
          <CheckIcon className="check-icon" />
        </MarkAsReadButton>
      ) : (
        <div />
      )}
    </StatusWrapper>
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
      <Head>
        <TitleWrapper>
          <Flex>
            <img
              width="20px"
              height="20px"
              className="ml-4px"
              src={spaceIcon}
              alt=""
            />
            <Dot />
            <Type>{EventTypeName[type]}</Type>
            <OnlyMobile>{status}</OnlyMobile>
          </Flex>
          <OnlyDesktop>
            <Dot />
          </OnlyDesktop>
          <Title>
            <Link href={href} passHref>
              {title}
            </Link>
          </Title>
        </TitleWrapper>

        <div className="flex gap-2 items-center">
          <div>
            <Time time={createdAt} />
          </div>
          <OnlyDesktop>{status}</OnlyDesktop>
        </div>
      </Head>
    </NotificationItemWrapper>
  );
}
