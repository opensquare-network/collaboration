import styled from "styled-components";
import { useState } from "react";

import Choice from "./choice";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  padding: 40px;
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
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const ItemList = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Button = styled.div`
  padding: 12px 24px;
  border: 1px solid #e2e8f0;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  :hover {
    border-color: #b7c0cc;
  }
`;

export default function Choices() {
  const [choices, setChoices] = useState([]);

  const onAdd = () => {
    setChoices([...choices, ""]);
  };

  const onChange = (value, index) => {
    setChoices(
      choices.map((item, id) => {
        if (index === id) return value;
        return item;
      })
    );
  };

  const onDelete = (index) => {
    setChoices(choices.filter((item, id) => index !== id));
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
            />
          ))}
        </ItemList>
      </InnerWrapper>
      <Button onClick={onAdd}>Add</Button>
    </Wrapper>
  );
}
