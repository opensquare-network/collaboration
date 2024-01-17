import styled from "styled-components";

import Choice from "./choice";
import { Button } from "@osn/common-ui";
import { p_16_semibold } from "../../styles/textStyles";

const Wrapper = styled.div`
  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);
  padding: 32px;
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const Title = styled.div`
  ${p_16_semibold};
`;

const ItemList = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

export default function Choices({ maxOptionsCount, choices, setChoices }) {
  const onAdd = () => {
    if (choices.length >= maxOptionsCount) return;
    setChoices([...choices, ""]);
  };

  const onChange = (value, index) => {
    setChoices(
      choices.map((item, id) => {
        if (index === id) return value;
        return item;
      }),
    );
  };

  const onDelete = (index) => {
    if (index < 2) return;
    setChoices(choices.filter((_, id) => index !== id));
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Choices</Title>
        <ItemList>
          {(choices || []).map((item, index) => (
            <Choice
              key={index}
              index={index}
              value={item}
              onChange={onChange}
              onDelete={onDelete}
              unDeletable={index < 2}
            />
          ))}
        </ItemList>
      </InnerWrapper>
      <Button onClick={onAdd} large block>
        Add choice
      </Button>
    </Wrapper>
  );
}
