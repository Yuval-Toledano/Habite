import React from "react";
import styled from "styled-components";
import { ProgressCategoriesTitle, ProgressCategoriesIconDiv } from '../designSystem/common';

/****************** STYLED BUTTONS ******************/

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
  // max-width: 250px;
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
    // background: #E71C7D;
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

  &:hover ${ProgressCategoriesIconDiv} {
    background: #FBE536;
    box-shadow: -2px 4px 3px #E993B1;
  }

  &:hover ${ProgressCategoriesTitle} {
    font-weight: bold;
  }

  &:focus {
    outline: none;
  }
`;

/**
 * primary button component
 */
export function Button(props) {
  const { size, color, background, onClick, width, height } = props;

  return (
    <ButtonWrapper size={size} color={color} background={background} onClick={onClick} width={width} height={height}>
      {props.children}
    </ButtonWrapper>
  );
}

/**
 * disabled button component
 */
export function DisableButton(props){
  const { size, color, background } = props;

  return (
    <DisableButtonWrapper size={size} color={color} background={background}>
      {props.children}
    </DisableButtonWrapper>
  );
}

/**
 * secondary button component
 */
export function SecondaryButton(props){
  const { size, color, background, onClick, width } = props;

  return (
    <SecondaryButtonWrapper size={size} color={color} background={background} onClick={onClick} width={width}>
      {props.children}
    </SecondaryButtonWrapper>
  );
}

/**
 * link button component
 */
export function TextualButton(props){
  const { size, color, background, onClick, id } = props;

  return (
    <TextualButtonWrapper id={id} size={size} color={color} background={background} onClick={onClick}>
      {props.children}
    </TextualButtonWrapper>
  );
}

/**
 * progress page button component
 */
export function ProgressSidebarButton(props){
  const { size, color, background, onClick } = props;

  return (
    <ProgressSidebarWrapper size={size} color={color} background={background} onClick={onClick}>
      {props.children}
    </ProgressSidebarWrapper>
  );
}

