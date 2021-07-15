// mobile design system - only for mobile
// import this file if you work on mobile version

import { MicNoneSharp, MicNoneTwoTone } from '@material-ui/icons';
import styled, { css } from 'styled-components';

const px = "px";
const rem = "rem";
const shadow = "-2px 4px 0px rgba(160, 160, 160, 0.25)";

const colors = {
    main_cta: "#E71C7D", bg: "#FAF0E4", text: "#333331", accent: "#F8F7F5", link: "#00397B",
    shadow_main: "#E993B1", shadow_orange: "#F16643", shadow_teal: "#0891A8", shadow_yellow: "#FBE536",
    pink_hover: "#FD35BD", light_gray: "#D8D8D8", dark_gray: "#666662"
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
            default:
                return colors.main_cta;
        }
    }
    )};
  
  &:hover {
    color: ${colors.pink_hover};
  };

  &:active {
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

// images

export const BackgroundCircle = styled.img`
    width: 100%;
    position: relative;
    z-index: 0;
`;

// containers

export const InfoBoxDiv = styled.div`
    background-color: ${colors.accent};
    overflow: hidden;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 25px 15px 15px 15px;
    margin: 20px;
    border-radius: 5%;
    box-shadow: ${shadow};
    position: absolute;
`;


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

export function Link(props) {
    const { type, onClick } = props;

    return (
        <StyledLinkWrapper type={type} onClick={onClick}>
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