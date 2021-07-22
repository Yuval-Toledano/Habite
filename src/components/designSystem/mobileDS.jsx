// mobile design system - only for mobile
// import this file if you work on mobile version

import { MicNoneSharp, MicNoneTwoTone, PinDropRounded } from '@material-ui/icons';
import styled from 'styled-components';

const px = "px";
const rem = "rem";
const shadow = "-2px 4px 0px rgba(160, 160, 160, 0.25)";

const colors = {
    main_cta: "#E71C7D", bg: "#FAF0E4", text: "#333331", accent: "#F8F7F5", link: "#00397B",
    shadow_main: "#E993B1", shadow_orange: "#F16643", shadow_teal: "#0891A8", shadow_yellow: "#FBE536",
    pink_hover: "#FD35BD", light_gray: "#D8D8D8", mid_gray: "#999896", dark_gray: "#666662"
};


// typography

const typography = {
    big: "36", medium: "24", small: "18", tiny: "14"
};

export const StyledTitleWrapper = styled.h1`
    margin-bottom: 0.5rem;
    font-family: ${props => {
        switch (props.type) {
            case 'title':
            case 'landingTitle':
                return "Oleo script";
            case 'subtitle':
                return "Oswald";
            default:
                return "Open sans";
        }
    }};
    font-style: ${props => {
        switch (props.type) {
            case 'title':
                return "Bold";
            default:
                return "Regular";
        }
    }};
    line-height: ${props => {
        switch (props.type) {
            case 'title':
                return typography.line_height_1 + px;
            case 'subtitle':
            case 'landingTitle':
                return typography.line_height_2 + px;
        }
    }};
    font-size: ${props => (props.size ? props.size + px : () => {
        switch (props.type) {
            case 'title':
                return typography.big + px;
            case 'subtitle':
            case 'landingTitle':
                return typography.medium + px;
        }
    }
    )};
    color: ${props => (props.color ? props.color : () => {
        switch (props.type) {
            case 'title':
                return (props.mode == "over_dark" ? colors.accent : colors.text);
            case 'subtitle':
                return (props.mode == "over_dark" ? colors.accent : colors.text);
            case 'landingTitle':
                return colors.main_cta;
        }
    }
    )};
`;

export const StyledText = styled.p`
  font-family: "Open sans";
  font-style: Regular;
  font-size: ${({ size }) => (size ? size + px : typography.tiny + px)};
  color: ${({ mode }) => (mode == "over_dark" ? colors.accent : colors.text)};
`;

export const StyledLinkWrapper = styled.a`
  font-family: "Open sans";
  font-style: Bold;
  font-size: ${({ size }) => (size ? size + px : typography.tiny + px)};
  color: ${props => (props.color ? props.color : () => {
        switch (props.mode) {
            case 'over_bright':
                return colors.text;
            case 'over_dark':
                return colors.accent;
            case 'main':
                return colors.main_cta;
            default:
                return colors.link;
        }
    }
    )};
  
  &:hover {
    color: ${colors.pink_hover};
  };
  &:active {
    color: ${colors.pink_hover};
  };
  &:focused {
    color: ${colors.pink_hover};
  };
`;


// buttons

const StyledButtonWrapper = styled.button`
    margin: 0.5rem;
    background: ${props => {
        switch (props.type) {
            case 'primary':
                return colors.main_cta;
            case 'secondary':
            case 'textual':
                return colors.accent;
            case 'disabled':
                return colors.light_gray;
        }
    }};
    color: ${props => {
        switch (props.type) {
            case 'primary':
                return colors.accent;
            case 'secondary':
            case 'textual':
                return colors.main_cta;
            case 'disabled':
                return colors.dark_gray;
        }
    }};
    font-size: ${({ size }) => (size ? size + px : typography.small + px)};
    font-family: "Oswald";
    box-shadow: ${props => {
        switch (props.type) {
            case 'disabled':
                return "none";
            default:
                return shadow;
        }
    }};
    border: none;
    outline: ${props => {
        switch (props.type) {
            case 'secondary':
                return colors.main_cta + " solid 2px";
            default:
                return "none";
        };
    }};
    outline-offset: -1px;
    border-radius: 27px;
    padding: 0.5rem 2rem;
    width: ${({ width, wide }) => (width ? width : wide ? "100%" : "fit-content")};
    transition: all 200ms ease-in-out;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    &:hover {
        box-shadow: ${props => {
        switch (props.type) {
            case 'primary':
            case 'secondary':
                return "none";
        }
    }};
        background: ${props => {
        switch (props.type) {
            case 'primary':
            case 'secondary':
            case 'textual':
                return colors.pink_hover;
            case 'disabled':
                return colors.light_gray;
        }
    }};
        color: ${props => {
        switch (props.type) {
            case 'primary':
            case 'secondary':
            case 'textual':
                return colors.accent;
            case 'disabled':
                return colors.dark_gray;
        }
    }};
    }
`;

const LogoWrapper = styled.h2`
    font-family: "Oleo script";
    font-weight: Bold;
    font-size: ${({ size }) => (size ? size + px : typography.medium + px)};
    text-shadow: -5px 1px 0px ${colors.shadow_main}, -7px 2px 0px ${colors.shadow_orange}, -9px 3px 0px ${colors.shadow_teal};
    color: ${colors.shadow_yellow};
    -webkit-text-stroke: 4px ${colors.text};
    paint-order: stroke fill;
    text-transform: uppercase;
    & :before {
        content: attr(title);
        position: absolute;
        -webkit-text-stroke: 0.2em #000000;
        left: 0;
        z-index: -1;
    }
`;

export const ChallengeButton = styled.button`
    background: ${colors.accent};
    border: none;
`;

// menus

const BottombarWrapper = styled.div`
    align-items: center;
    width: 100%;
    position: fixed;
    z-index: 8;
`;

const BottombarButtonWrapper = styled.button`
    display: inline-block;
    color: ${colors.mid_gray};
    background: ${colors.accent};
    padding: 20px;
    border: ${colors.accent};
    width: 25%;
    &:hover {
        border-top: 5px solid ${colors.main_cta};
        color: ${colors.main_cta};
    }};
    &:active {
        border-top: 5px solid ${colors.main_cta};
        color: ${colors.main_cta};
    }};
    }
    &:focus {
        border-top: 5px solid ${colors.main_cta};
        color: ${colors.main_cta};
    }};
    }
`;

// images

export const BackgroundCircle = styled.img`
    width: 100%;
    position: relative;
    z-index: 0;
`;

export const LeaderBoardPhotoWrapper = styled.img`
    height: 45px;
    width: 45px;
    border-radius: 56px;
    border: ${props => {
        switch (props.color) {
            default:
                return (props.color)
        }
    }};
`;

export const TopThreeMiddle= styled.img`
    height: 70px;
    width: 70px;
    border-radius: 50%;
    border: 2px #F16643 solid;
`;

export const TopThreeLeft = styled.img`
    height: 55px;
    width: 55px;
    border-radius: 50%;
    border: 2px #0891A8 solid;
`;

export const TopThreeRight = styled.img`
    height: 55px;
    width: 55px;
    border-radius: 50%;
    border: 2px #E993B1 solid;
`;

export const FirstPlaceCircle = styled.img`
    height: 32px;
    width: 32px;
    margin-top: -15px;
`;

export const GeneralPlaceCircle = styled.img`
    height: 28px;
    width: 28px;
    margin-top: -15px;
`;

export const FirstCrown = styled.img`
    margin-bottom: -13px;
`;

export const VoterPhoto = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 3px #FBE536 solid;
    margin: 0px 3px 10px 3px;
`;

// containers

export const FlyingBoxWrapper = styled.div`
    z-index: ${({ zindx }) => (zindx ? zindx : zindx)};
    position: absolute;
    top: ${({ top }) => (top ? top + px : 0 + px)};
    height: ${({ height }) => (height ? height + "%" : "calc(100vh - 16%)")};
    width: 100%;
    overflow-x: hidden
`;

export const InfoBoxDiv = styled.div`
    background-color: ${colors.accent};
    overflow: visible;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 1rem;
    margin: 1.5rem;
    border-radius: 5%;
    box-shadow: -2px 4px 4px 0px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 2;
`;

export const InfoBoxBar = styled.div`
    background-color: ${colors.accent};
`

export const LeaderboardDivWrapper = styled.div`
    background-color: ${colors.accent};
    padding: 5px 5px 5px 5px;
    width: 85%;
    border-radius: 5%;
    border: ${props => {
        switch (props.color) {
            default:
                return (props.color)
        }
    }};
`;

export const LeaderboardContainer = styled.div`
    display: flex;
    position: relative;
    align-items: center;
`;

export const SingleChallengeDiv = styled.div`
    background-color: ${colors.accent};
    overflow: visible;
    width: 90%;
    display: flex;
    text-align: center;
    padding: 15px 15px 0px 15px;
    margin: 12px;
    border-radius: 5%;
    box-shadow: -2px 4px 4px 0px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 2;
`;

export const MobileBadgeDiv = styled.div`
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: -2px 4px 4px 0px rgba(0, 0, 0, 0.15);
    padding: 15px;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    text-align: center;
    width: 85%;
`;

export const RulesPageDiv = styled.div`
    background-color: transparent;
    border-radius: 10px;
    padding: 15px;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    width: 85%;
`;

export const SingleRuleDiv = styled.div`
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 2px solid ${colors.main_cta};
    box-shadow: -2px 4px 4px 0px rgba(0, 0, 0, 0.15);
    padding: 15px;
    min-width: 75%;
`;

export function LeaderBoardPhoto(props) {
    const { color, src } = props;
    return (
        <LeaderBoardPhotoWrapper src={src} color={color}></LeaderBoardPhotoWrapper>
    )
}

export function LeaderboardDiv(props) {
    const { color} = props;
    return (
        <LeaderboardDivWrapper color={color} className="d-flex flex-row m-1 d-flex justify-content-around">
            {props.children}
        </LeaderboardDivWrapper>
    )
}


export function StyledButton(props) {
    const { type, size, color, background, onClick, width, wide } = props;

    return (
        <StyledButtonWrapper type={type} size={size} color={color} background={background} onClick={onClick} width={width} wide={wide}>
            {props.children}
        </StyledButtonWrapper>
    );
}

export function StyledTitle(props) {
    const { type, size, color, mode } = props;

    return (
        <StyledTitleWrapper type={type} mode={mode} size={size} color={color}>
            {props.children}
        </StyledTitleWrapper>
    );
}

export function StyledLink(props) {
    const { mode, onClick } = props;

    return (
        <StyledLinkWrapper mode={mode} onClick={onClick}>
            {props.children}
        </StyledLinkWrapper>
    );
}

export function Logo(props) {
    const { size } = props;

    return (
        <LogoWrapper size={size}>
            {props.children}
        </LogoWrapper>
    )
}

export function StyledBottombar(props) {
    const { size } = props;
    return <BottombarWrapper className="bottom-0 end-0">
        {props.children}
    </BottombarWrapper>
}

export function StyledBottombarButton(props) {
    const { onClick, alt, icon } = props;
    return <BottombarButtonWrapper>
        {props.children}
    </BottombarButtonWrapper>
}

export function FlyingBox(props) {
    const { zindx, top, height } = props;
    return <FlyingBoxWrapper zindx={zindx} top={top} height={height}>
        {props.children}
    </FlyingBoxWrapper>
}