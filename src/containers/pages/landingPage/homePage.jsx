import styled from "styled-components";
import { Footer } from "../../../components/footer/footer";
import { Marginer } from "../../../components/marginer/marginer";
import { Navbar } from "../../../components/navbar/navbar";
import {
  InnerPageContainer,
  PageContainer,
} from "../../../components/pageContainers/pageContainer";
import { TopSection } from "./topSection";
import { ContentContainer } from "../../../components/designSystem/common";
import { Link } from "react-router-dom";

const Title = styled.h2`
  font-family: "Oleo Script";
  font-style: normal;
  font-weight: bold;
  font-size: ${({ size }) => size ? size : "48px"};
  line-height: 149.58%;
  color: ${({ color }) => color ? color : "#e71c96"};
  
`;

const SubTitle = styled.h6`
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 149.58%;
  color: ${({ color }) => color ? color : "#333331"};
`;

const Paragraph = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: #333331;
`;

const HowContainer = styled.div`
    display: flex;
    flex-direction: col;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    
`;

const HowWrapper = styled.div`
    align-items: flex-start;
    width: 248px; 
    margin-top: 50px;
    
`;

const HomepageWhiteButtonWrapper = styled.button`
  border: none;
  outline: none;
  max-width: 250px;
  color: ${({ color }) => (color ? color : "#E71C7D")};
  padding: 6px 2em;
  font-size: ${({ size }) => (size ? size + "px" : "24px")};
  font-weight: 500;
  border-radius: 27px;
  box-shadow: -2px 4px 0px rgba(160, 160, 160, 0.25);
  background: ${({ background }) => (background ? background : "#FAF0E4")};
  font-family: "Oswald";
  cursor: pointer;
  transition: all 200ms ease-in-out;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    color: #FAF0E4;
    background: #E71C7D;
    box-shadow: 0px 0px 0px;
  }

  &:focus {
    outline: none;
  }
`;

export function HomePage(props) {
  return (
    <PageContainer>

      {/* HEADER */}

      <TopSection>
        <Navbar />
      </TopSection>

      {/* YOU CAN DO IT */}

      <InnerPageContainer id='yesContainer'>
        <ContentContainer>
          <Title>YES!</Title>
          <SubTitle>
            With a friend or a group, we believe cutting off on sugar is
            possible. and fun too!
          </SubTitle>
          <Marginer direction="vertical" margin={40} />
          <Paragraph>
            Sugar. Gluten. Simple carbs. So tasty. But when is it too much
            sugar? <b>Habite</b> is a safe place for those who are willing to change
            their nutrition habits and start a healthier chapter in their lives
            - to intake sugar in a more responsible way or even stop consuming
            it. We made the process of sugar-sobriety totaly digital and
            sharable, so you’ll have fun on the way to regain the control of
            your mind and life back to yourself.
          </Paragraph>
        </ContentContainer>
        {/* <Link to="/containers/mainpage"> */}
        <a className="Button-primary Big-link" href="#howContainer">How does it work?</a>
        {/* <Button>start now</Button> */}
        {/* </Link> */}
      </InnerPageContainer>

      {/* HOW */}

      <InnerPageContainer background={"#F7AFC4"} id='howContainer'>
        <ContentContainer>
          <Title>HOW?</Title>
          <HowContainer>
            <HowWrapper >
              <SubTitle>Be aware</SubTitle>
              <Paragraph>Awareness is the biggest step towards the change you desire</Paragraph>
            </HowWrapper>
            {/* <Marginer direction="horizontal" margin={100} /> */}
            <HowWrapper >
              <SubTitle>Walk together</SubTitle>
              <Paragraph>Participate in small nutrition challenges with group members who share your goal</Paragraph>
            </HowWrapper>
            {/* <Marginer direction="horizontal" margin={100} /> */}
            <HowWrapper >
              <SubTitle>Kudos to all</SubTitle>
              <Paragraph>Express the love and help each other earn points and achievements</Paragraph>
            </HowWrapper>
            {/* <Marginer direction="horizontal" margin={100} /> */}
            <HowWrapper >
              <SubTitle>Repeat</SubTitle>
              <Paragraph>Establish your new healthy habit, fast</Paragraph>
            </HowWrapper>
          </HowContainer>
        </ContentContainer>
        <a className="Button-primary Big-link" href="#startContainer">start now</a>
      </InnerPageContainer>

      {/* TAKE CONTROL BACK */}

      <InnerPageContainer background={"#E71C7D;"} id="startContainer">
        <ContentContainer style={{ textAlign: "center" }}>
          <SubTitle color="#FAF0E4">So, are you up for the challenge?</SubTitle>
          <Marginer direction="vertical" margin={50} />
          <Title color="#FAF0E4" size="64px">TAKE CONTROL BACK</Title>
          <Marginer direction="vertical" margin={30} />
          <Link to={"/signup"}><HomepageWhiteButtonWrapper>Sign up now</HomepageWhiteButtonWrapper></Link>
        </ContentContainer>

      </InnerPageContainer>

      {/* FOOTER */}

      <Footer></Footer>

    </PageContainer>
  );
}
