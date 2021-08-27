import styled, { css } from "styled-components";

import { TIMELINE_ITEMS_1, TIMELINE_ITEMS_2 } from "utils/constants";

const Wrapper = styled.div`
  padding: 40px 32px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  > :not(:first-child) {
    margin-top: 32px;
  }
`;

const TitleWrapper = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  :not(:first-child) {
    margin-top: 4px;
  }
  > :first-child {
    color: #a1a8b3;
  }
`;

const Timeline = styled.div`
  :not(:first-child) {
    margin-top: 12px;
  }
`;

const TimelineWrapper = styled.div`
  :first-child {
    .up-bar {
      visibility: hidden;
    }
  }
  :last-child {
    .down-bar {
      visibility: hidden;
    }
  }
  ${(p) =>
    p.active &&
    css`
      .circle {
        background: #56ca2f !important;
      }
    `}
`;

const TimelineItem = styled.div`
  display: flex;
`;

const TimelineNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
  margin-right: 8px;
  .up-bar {
    height: 6px;
    width: 2px;
    background: #e2e8f0;
  }
  .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e2e8f0;
    margin: 4px 0;
  }
  .down-bar {
    flex-grow: 1;
    width: 2px;
    background: #e2e8f0;
  }
`;

const TimelineName = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`;

const TimelineBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12px;
  margin-right: 8px;
  .down-bar {
    flex-grow: 1;
    width: 2px;
    background: #e2e8f0;
  }
`;

const TimelineDetail = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: #a1a8b3;
  padding-bottom: 8px;
`;

export default function PostInfo() {
  return (
    <Wrapper>
      <div>
        <TitleWrapper>
          Information
          <img src="/imgs/icons/info.svg" />
        </TitleWrapper>
        <Divider />
        <div>
          <InfoItem>
            <div>Strategie(s)</div>
            <div>balance-of</div>
          </InfoItem>
          <InfoItem>
            <div>Snapshot</div>
            <div>65,408,852</div>
          </InfoItem>
        </div>
      </div>
      <div>
        <TitleWrapper>
          Timeline
          <img src="/imgs/icons/timeline.svg" />
        </TitleWrapper>
        <Divider />
      </div>
      <div>
        <Timeline>
          {TIMELINE_ITEMS_1.map((item, index) => (
            <TimelineWrapper key={index} active={item.active}>
              <TimelineItem>
                <TimelineNode>
                  <div className="up-bar" />
                  <div className="circle" />
                  <div className="down-bar" />
                </TimelineNode>
                <TimelineName>{item.name}</TimelineName>
              </TimelineItem>
              <TimelineItem>
                <TimelineBar>
                  <div className="down-bar" />
                </TimelineBar>
                <TimelineDetail>{item.time}</TimelineDetail>
              </TimelineItem>
            </TimelineWrapper>
          ))}
        </Timeline>
        <Timeline>
          {TIMELINE_ITEMS_2.map((item, index) => (
            <TimelineWrapper key={index} active={item.active}>
              <TimelineItem>
                <TimelineNode>
                  <div className="up-bar" />
                  <div className="circle" />
                  <div className="down-bar" />
                </TimelineNode>
                <TimelineName>{item.name}</TimelineName>
              </TimelineItem>
              <TimelineItem>
                <TimelineBar>
                  <div className="down-bar" />
                </TimelineBar>
                <TimelineDetail>{item.time}</TimelineDetail>
              </TimelineItem>
            </TimelineWrapper>
          ))}
        </Timeline>
      </div>
    </Wrapper>
  );
}
