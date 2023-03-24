// copied from qa

import styled from "styled-components";
import { p_14_medium } from "@osn/common-ui/es/styles/textStyles";
import { Time, Card, Flex, FlexBetween, Dot } from "@osn/common-ui";
import {
  text_dark_minor,
  primary_turquoise_500,
  text_dark_accessory,
} from "@osn/common-ui/es/styles/colors";
import { ReactComponent as CheckIcon } from "@osn/common-ui/es/imgs/icons/check.svg";
import Link from "next/link";
import { MOBILE_SIZE } from "@osn/constants";
import { useState } from "react";
import getSpaceConfigs from "frontedUtils/consts/spaces";

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

  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: block;
  }
`;

const TitleWrapper = styled(Flex)`
  flex: 1;
  max-width: 50%;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    max-width: 100%;
    display: block;
  }
`;

const InfoWrapper = styled(FlexBetween)`
  flex: 1;
  max-width: 50%;
  display: flex;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    max-width: 100%;
    margin-top: 6px;
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

const TimeWrapper = styled(Flex)`
  flex: 1;
  justify-content: flex-end;
`;

const StatusWrapper = styled(Flex)`
  flex: 1;
  width: 18px;
  height: 18px;
  justify-content: flex-end;

  @media screen and (max-width: ${MOBILE_SIZE}px) {
    display: none;
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

const EventTypeName = {
  newProposal: "New Proposal",
  proposalStarted: "Proposal Started",
  proposalCloseToEnd: "Proposal Close to End",
  proposalEnd: "Proposal End",
};

export default function NotificationItem({ data, onMarkAsRead = () => {} }) {
  const {
    type,
    createdAt,
    read: _read,
    data: { space, title, proposalCid } = {},
  } = data;

  const configs = getSpaceConfigs(space);

  const [read, setRead] = useState(_read);

  function handleMarkAsRead(data) {
    onMarkAsRead(data);
    setRead(true);
  }

  return (
    <NotificationItemWrapper>
      <Head>
        <TitleWrapper>
          <img
            width="20px"
            height="20px"
            className="ml-4px"
            src={`/imgs/icons/projects/${configs.fromIcon}`}
            alt=""
          />
          <Dot />
          <Type>{EventTypeName[type]}</Type>
          <Dot />
          <Title>
            <Link href={`/space/${space}/proposal/${proposalCid}`} passHref>
              <a>{title}</a>
            </Link>
          </Title>
        </TitleWrapper>

        <InfoWrapper>
          <TimeWrapper>
            <Time time={createdAt} />
          </TimeWrapper>

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
        </InfoWrapper>
      </Head>
    </NotificationItemWrapper>
  );
}
