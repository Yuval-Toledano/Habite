import styled from "styled-components";
import { deviceSize } from "./responsive";

/**** DESKTOP DESIGN SYSTEM ****/

/**** TITLES ****/
export const StandAloneTitle = styled.h6`
  font-family: "Open sans";
  font-style: normal;
  font-weight: 700;
  font-size: ${({ size }) => (size ? size + "px" : "16px")};
  color: ${({ color }) => (color ? color : "#333331")};
`;

export const SemiTitle = styled.h2`
  font-family: "Oleo Script";
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 50px;
  color: ${({ color }) => (color ? color : "#333331")};
`;

export const Title = styled.h1`
  font-family: "Oleo Script";
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  // line-height: 50px;
  text-transform: uppercase;
  color: #333331;
  text-shadow: -3px 0px 0px #e993b1;
`;

export const SubTitle = styled.h6`
  font-family: "Open sans";
  font-style: normal;
  font-size: ${({ size }) => (size ? size + "px" : "18px")};
  color: ${({ color }) => (color ? color : "#333331")};
  margin-bottom: 16px;
`;

export const TextInPage = styled.div`
  font-family: "Open sans";
  font-style: normal;
  font-weight: 500;
  font-size: ${({ size }) => (size ? size + "px" : "16px")};
  line-height: 160%;
  text-decoration: ${({ decoration }) => (decoration ? decoration : "none")};
  color: ${({ color }) => (color ? color : "#333331")};
`;

export const H4 = styled.h4`
  // font-family: "Quicksand";
  font-style: normal;
  font-size: 18px;
//   font-weight: ${({ weight }) => (weight ? weight : "500")};
//   font-size: ${({ size }) => (size ? size + "px" : "16px")};
  line-height: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ color }) => (color ? color : "#333331")};
`;

export const NiceTitle = styled.h2`
  font-family: "Oleo Script";
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 149.58%;
  color: #000000;
`;

export const Logo = styled.h2`
  font-family: "Oleo Script";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 149.58%;
  color: #e71c7d;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

/**** LINKS ****/
export const ExternalLink = styled.a`
  // font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: ${({ size }) => (size ? size : "24px")};;
  line-height: 149.58%;
  text-decoration-line: underline;
  cursor: pointer;
  color: ${({ color }) => (color ? color : "#00397b")};

  &:hover {
    color: #FD35BD;
  }
`;

export const PinkLink = styled.a`
  font-family: Oswald;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 149.58%;
  color: #E71C7D;
`;

/**** TEXT ****/
export const IndicationText = styled.h5`
  font-size: 14px !important;
  line-height: 160%;
`;

/**** CONTAINERS ****/
export const ContentContainer = styled.div`
  width: 100%;
  padding: 50px;
`;

export const PointsText = styled.p`
font-size: 18px;
font-weight: bold;
align-items: center;
color: #333333;
`;

export const IndicationButton = styled.button`
background-color: #F8F7F5;
border: 1px solid #E4DCD3;
border-radius: 5px;
padding: 8px;
font-size: 12px;
// font-family: 'Quicksand';
`;

export const VoteBox = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #E4DCD3;
  border-radius: 10px;
  padding: 24px;
  // font-family: 'Quicksand';
  // margin: 16px;
  border: 3px solid #E993B1;
`;

export const SingleVoter = styled.div`
  margin-right: 16px;
  float: left !important;
`;

export const InfoBox = styled.div`
  background-color: #F8F7F5;
  border: 1px solid #E4DCD3;
  border-radius: 10px;
  padding: 24px;
  margin: 16px 0px 16px 0px;
`;

export const ChallengeBoard = styled.div`
  background-color: #F8F7F5;
  border: 1px solid #E4DCD3;
  border-radius: 10px;
  padding: 24px;
  max-height: 30rem;
  min-height: 30rem;
`;

export const ChallengeBoxContainer = styled.div`
  background: ${({ background }) => (background ? background : "#FEFDFB")};
  padding: 24px;
  margin: 0px 0px 0.5rem 0px;
  border: 1px #E4DCD3 solid;
  border-radius: 10px;
  max-height: 6.5rem;
`;

export const FoodLabel = styled.div`
  height: 40px;
  // font-family: "Quicksand";
  font-style: normal;
  font-size: 14px;
  align-items: center;
  background-color: ${({ color }) => (color ? color : "#F8F7F5")};
  border-radius: 27px;
  border: 2px solid #E0E0E0;
  padding: 8px 16px;
  margin: 2px 4px;
  width: calc(5%*1.5);
`;

export const FoodLabelName = styled.p`
  font-weight: 600;
  text-align: center;
  color: #FFFFFF;
  top: 50%;
  left: 50%;
`;

/**** STATBOX CSS ****/
export const StatBoxContainer = styled.div`
  background-color: #FAF0E4;
  border: 1px solid #E4DCD3;
  border-radius: 10px;
  padding: 1rem 0rem 0rem 1.5rem;
  // font-family: 'Quicksand';
  margin: 1rem 0rem 0.5rem 0rem;
`;

export const StatBoxNumber = styled.h1`
  font-family: "Oleo Script";
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  color: #333331;
  text-shadow: -3px 0px 0px #e993b1;
  margin: 0.2rem 0rem 0.5rem 0.3rem;
`;

export const StatBoxText = styled.h1`
// font-family: "Quicksand";
font-style: normal;
font-size: 18px;
color: "#333331";
padding: 0rem 0rem 0rem 0.2rem;
`;

/**** SIDEBAR CSS ****/
export const SidebarTitle = styled.h2`
  font-style: normal;
  margin-bottom: 0px;
  font-size: ${({ size }) => (size ? size : "18px")};
  color: ${({ color }) => (color ? color : "#333331")};
  height: 100%;
  align-items: center;
`;

/**** PROGRESS CATEGORIES CSS ****/
export const ProgressCategoriesTitle = styled.h2`
  font-style: normal;
  margin-bottom: 0px;
  margin-left: 1rem;
  // font-weight: bold;
  font-size: 1.2rem;
  color: #333331;
`;

export const ProgressCategoriesIconDiv = styled.div`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 50%;
`;

/**** PROGRESS PAGE CSS ****/

export const BadgeCollectionDiv = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #E4DCD3;
  border-radius: 10px;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  // font-family: 'Quicksand';
  // margin: 16px;
  border: 3px solid #E993B1;
`;

export const BadgePosterDiv = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  text-align: center;
`;

export const BadgePoster = styled.div`
  min-width: 18rem;
  max-height: 21rem;
`;

export const BadgeStars = styled.div`
  min-height: 2.2rem;
  align-content: center;
`;

export const BadgeTitle = styled.div`
  font-size: 1rem !important;
  line-height: 160%;
`;

export const CurrPeronalAvatarDiv = styled.div`
background-color: #FAF0E4;
height: 8rem;
width: 8rem;
border-radius: 50%;
border: 0.2rem solid #E993B1;
`;

export const PrevPeronalAvatarDiv = styled.div`
background-color: #FAF0E4;
height: 6rem;
width: 6rem;
border-radius: 50%;
`;

export const onHoverIconChange = styled.div`
  hover {
    color: #FD35BD;
  }
`;