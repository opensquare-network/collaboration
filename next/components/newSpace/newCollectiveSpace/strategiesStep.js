import { Divider } from "@osn/common-ui";
import { Sections, SectionTitle } from "@/components/newSpace/styled";
import styled from "styled-components";

const Text = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border: 1px solid var(--strokeActionDefault);
  background: var(--fillBgTertiary);
  color: var(--textPrimary, #101828);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

export default function StrategiesStep({ selectedStrategies }) {
  return (
    <>
      <Divider />
      <Sections>
        <div className="space-y-4">
          <SectionTitle>Strategies</SectionTitle>
          {selectedStrategies.map((text) => (
            <Text key={text}>{text}</Text>
          ))}
        </div>
      </Sections>
    </>
  );
}
