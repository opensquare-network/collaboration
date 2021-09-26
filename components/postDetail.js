import styled from "styled-components";

import Author from "./author";
import PostVote from "./postVote";
import { p_16_normal, p_18_semibold, p_20_semibold } from "../styles/textStyles";

const Wrapper = styled.div`
  padding: 40px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
`;

const Title = styled.div`
  ${p_20_semibold};
  margin-bottom: 16px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: #a1a8b3;
  flex-wrap: wrap;
  > :not(:first-child)::before {
    content: "·";
    margin: 0 8px;
  }
`;

const Status = styled.div`
  padding: 3px 12px;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  background: ${(p) => (p.active ? "#04d2c5" : "#e2e8f0")};
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 20px 0;
`;

const SubTitle = styled.div`
  ${p_18_semibold};
  margin-bottom: 16px;
`;

const Content = styled.div`
  ${p_16_normal};
  color: #a1a8b3;
`;

export default function PostDetail() {
  return (
    <Wrapper>
      <Title>
        Vulputate sit vel ut malesuada leo massa. Euismod vitae at convallis
        scelerisque dignissim sit leo.
      </Title>
      <InfoWrapper>
        <LeftWrapper>
          <Author username="15kU...2i86" />
          <div>End in 2 days</div>
        </LeftWrapper>
        <Status active>Active</Status>
      </InfoWrapper>
      <Divider />
      <SubTitle>Description</SubTitle>
      <Content>
        Viverra venenatis volutpat turpis vel viverra lectus amet justo. In
        luctus fermentum enim ut nulla metus. Suscipit id tortor, sit facilisis.
        Massa, ut mattis elementum tellus, viverra ut adipiscing. Non platea id
        habitant vel morbi mollis consectetur. Tristique velit facilisis nullam
        porttitor accumsan mattis in sed est. Adipiscing in lacus, viverra
        pellentesque vestibulum condimentum enim non auctor. Ullamcorper quis
        viverra commodo, odio interdum ullamcorper nunc porta. In mauris nunc
        felis diam at suspendisse sed amet egestas. Viverra venenatis volutpat
        turpis vel viverra lectus amet justo. In luctus fermentum enim ut nulla
        metus. Suscipit id tortor, sit facilisis. Massa, ut mattis elementum
        tellus, viverra ut adipiscing. Non platea id habitant vel morbi mollis
        consectetur. Sed sit sit ultricies in id aliquet tortor. Facilisis vel
        egestas eu integer luctus eget mollis mauris nulla. Egestas sollicitudin
        vulputate sed tellus quam dui magna adipiscing malesuada. Quam sit
        tincidunt id quis porttitor habitant orci a dui. A lacinia quisque mi
        faucibus sed. Convallis ut arcu eu nibh faucibus nunc, sem in. Ultrices
        aliquet porta nibh ipsum, nisi in in a euismod. Eleifend parturient nibh
        pellentesque viverra at facilisi in vel. Eu viverra arcu mattis morbi
        amet. Aliquam risus interdum phasellus ac luctus eu adipiscing donec.
        Viverra venenatis volutpat turpis vel viverra lectus amet justo. In
        luctus fermentum enim ut nulla metus. Suscipit id tortor, sit facilisis.
        Massa, ut mattis elementum tellus, viverra ut adipiscing. Non platea id
        habitant vel morbi mollis consectetur.
      </Content>
      <Divider />
      <PostVote />
    </Wrapper>
  );
}
