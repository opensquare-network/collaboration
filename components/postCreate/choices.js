import styled from "styled-components";

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

const Item = styled.div`
  padding: 12px 24px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  justify-content: space-between;
  .text {
    color: #9da9bb;
    font-weight: 600;
    text-align: center;
  }
  :hover {
    border-color: #b7c0cc;
  }
`;

const Button = styled.div`
  padding: 12px 24px;
  border: 1px solid #b7c0cc;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
`;

export default function Choices() {
  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Choices</Title>
        <ItemList>
          <Item>
            <div>#1</div>
            <input className="text" />
            <img src="/imgs/icons/substract.svg" alt="" />
          </Item>
          <Item>
            <div>#2</div>
            <div className="text">AGAINST</div>
            <img src="/imgs/icons/substract.svg" alt="" />
          </Item>
        </ItemList>
      </InnerWrapper>
      <Button>Add</Button>
    </Wrapper>
  );
}
