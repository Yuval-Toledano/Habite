// mobile design system - only for mobile
// import this file if you work on mobile version

import styled, { css } from 'styled-components';

const px = "px";

const colors = {
    main_cta: "#E71C7D", bg: "#FAF0E4", text: "#333331", accent: "#F8F7F5", link: "#00397B",
    shadow_main: "#E993B1", shadow_orange: "#F16643", shadow_teal: "#0891A8", shadow_yellow: "#FBE536",
    pink_hover: "#FD35BD"
};

// typography

const typography = {
    big: "36", medium: "24", small: "18", tiny: "14", line_height_1: "50", line_height_2: "36"
};

export const Title = styled.h1`
  font-family: "Oleo script";
  font-style: Bold;
  font-size: ${({ size }) => (size ? size + px : typography.big + px)};
  color: ${({ color }) => (color ? color : colors.accent)};
  line-height: line_height;
`;

export const Subtitle = styled.h2`
  font-family: "Oswald";
  font-style: Regular;
  font-size: ${({ size }) => (size ? size + px : typography.medium + px)};
  color: ${({ color }) => (color ? color : colors.text)};
  line-height: line_height_2;
`;

export const SubtitleLanding = styled.h3`
  font-family: "Oswald";
  font-style: Regular;
  font-size: ${({ size }) => (size ? size + px : typography.medium + px)};
  color: ${({ color }) => (color ? color : colors.main_cta)};
  line-height: line_height_2;
`;

export const BtnText = styled.p`
  font-family: "Oswald";
  font-style: Medium;
  font-size: ${({ size }) => (size ? size + px : typography.small + px)};
  color: ${({ color }) => (color ? color : colors.accent)};
`;

export const Text = styled.p`
  font-family: "Open sans";
  font-style: Regular;
  font-size: ${({ size }) => (size ? size + px : typography.tiny + px)};
  color: ${({ color }) => (color ? color : colors.text)};
`;

export const Link = styled.a`
  font-family: "Open sans";
  font-style: Bold;
  font-size: ${({ size }) => (size ? size + px : typography.tiny + px)};
  color: ${({ color }) => (color ? color : colors.text)};
`;


// buttons

const ButtonWrapper = styled.button`
  border: none;
  outline: none;
  color: ${({ color }) => (color ? color : "#FAF0E4")};
  padding: 6px 2em;
  font-size: ${({ size }) => (size ? size + "px" : "20px")};
  font-weight: 500;
  border-radius: 27px;
  box-shadow: -2px 4px 0px rgba(160, 160, 160, 0.25);
  background: ${({ background }) => (background ? background : "#E71C7D")};
  font-family: "Oswald";
  cursor: pointer;
  transition: all 200ms ease-in-out;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 1;
  height: ${({ height }) => (height ? height + "px" : "auto")};

  &:hover {
    color: #FFF4E6;
    background-color: #FD35BD;
    box-shadow: 0px 0px 0px rgba(160, 160, 160, 0.25);
  }

  &:focus {
    outline: none;
  }
`;

const SecondaryButtonWrapper = styled.button`
  border: 2px solid #E71C7D;
  padding: 4px 2em;
  box-sizing: border-box;
  background: none;
  border-radius: 27px;
  font-size: ${({ size }) => (size ? size + "px" : "20px")};
  font-family: Oswald;
  font-style: normal;
  font-weight: 500;
  line-height: 149.58%;
  color: #E71C7D; 
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    color: #fd35bd;
    border: 2px solid #fd35bd;
  }
`;

const TextualButtonWrapper = styled.button`
  border: 0px solid;
  padding: 4px 1em;
  max-width: 250px;  
  box-sizing: border-box;
  background: none;
  border-radius: 27px;
  font-family: Oswald;
  font-weight: 500;
  font-size:  ${({ size }) => (size ? size + "px" : "18px")};
  line-height: 149.58%;
  color: ${({ color }) => (color ? color : "#E71C7D")};
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    color: #FD35BD;
  }

  &:focus {
    outline: none;
  }
`;

const DisableButtonWrapper = styled.button`
  background: linear-gradient(0deg, #D8D8D8, #D8D8D8), #E71C7D;
  border-radius: 27px;
  border: none;
  outline: none;
  color: #666662;
  font-family: "Oswald";
  cursor: not-allowed !important;
  padding: 6px 2em;
  font-size: ${({ size }) => (size ? size + "px" : "20px")};
  font-weight: 500;
  transition: all 200ms ease-in-out;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const ProgressSidebarWrapper = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 1rem 1rem;
  background-color: #FAF0E4;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 1;

  &:focus {
    outline: none;
  }
`;

const Button = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  ${props => props.primary && css`
    background: white;
    color: palevioletred;
  `}
`

export function MobileButton(props) {
  const { size, color, background, onClick, width, height } = props;

  return (
    <>
      <MobileButton>I am a button</MobileButton>
      <MobileButton primary>I am a primary button</MobileButton>
    </>
  );
}