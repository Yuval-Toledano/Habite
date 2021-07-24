import React from 'react';
import styled from 'styled-components';
import {Marginer} from '../../../components/marginer/marginer';

import TopSectionBackground from "../../../images/header_clean.svg";  

const TopSectionContainer = styled.div`
  width: 100%;
  height: 720px;
  background-image: url(${TopSectionBackground});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopSectionInnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    flex-direction: column;

`;

const MainTitle = styled.h1`
    margin: 0;
    font-size: 172px;
    line-height: 149.58%;
    font-family: Oleo Script;
    text-shadow: -6px 2px 0px #E993B1, -11px 3px 0px #F16643, -15px 4px 0px #0890A7;
    transform: rotate(-4.51deg);
    color: #FBE536;
    -webkit-text-stroke: 4px #333331;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
     user-select: none;

`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const SloganText = styled.h4`
    margin: 0;
    font-size: 24px;
    font-family: Oswald;
    color: #333331;
`;

/**
 * web top section of the landing page
 */
export function TopSection(props){
    const {children} = props;

    return (
    <TopSectionContainer>
        {children}
        <TopSectionInnerContainer>
            <TitleContainer>
            <MainTitle>HABITE</MainTitle>
            <Marginer direction="vertical" margin={10}/>
            <SloganText>Regaining control back on your mind and life, together!</SloganText>
            </TitleContainer>
            <a className="Button-primary Big-link" href="#yesContainer">Me? sugar-free?</a>
        </TopSectionInnerContainer>    
    </TopSectionContainer>
    );

}


