import styled from "styled-components";
import Author from "components/author";
import {
  MarkdownPreviewer,
  renderMentionIdentityUserPlugin,
} from "@osn/previewer";
import { IpfsSquare, MentionIdentityUser } from "@osn/common-ui";
import TimeDuration from "@/components/duration";
import { useActiveAnchor } from "hooks/notification/useAnchor";

const Item = styled.div`
  padding: 0 32px;
  padding-top: 20px;
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: var(--textTertiary);
  > :not(:first-child) {
    ::before {
      content: "·";
      font-size: 14px;
      line-height: 24px;
      margin: 0 8px;
    }
  }
`;

const ContentWrapper = styled.div`
  margin: 8px 0 0 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--strokeBorderDefault);
`;

const Content = styled.div`
  line-height: 24px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function CommitItem({ item, spaceSupportMultiChain, space }) {
  const { id, active } = useActiveAnchor(`comment_${item.cid}`);

  return (
    <Item id={id} className={active ? "bg-strokeBorderDefault" : ""}>
      <InfoWrapper>
        <DividerWrapper>
          <Author
            address={item.address}
            space={space}
            size={20}
            showNetwork={spaceSupportMultiChain}
          />
          <div>
            <TimeDuration time={item.createdAt} />
          </div>
        </DividerWrapper>
        <IpfsSquare
          href={
            item?.pinHash &&
            `${process.env.NEXT_PUBLIC_API_END_POINT}api/ipfs/files/${item.pinHash}`
          }
        />
      </InfoWrapper>
      <ContentWrapper>
        <Content>
          <MarkdownPreviewer
            content={item.content}
            plugins={[
              renderMentionIdentityUserPlugin(<MentionIdentityUser explore />),
            ]}
          />
        </Content>
      </ContentWrapper>
    </Item>
  );
}
