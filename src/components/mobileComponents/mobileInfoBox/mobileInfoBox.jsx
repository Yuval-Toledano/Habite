import React from "react";
import { StyledTitle, StyledText, InfoBoxDiv } from "../../designSystem/mobileDS";

export function MobileInfoBox(props) {

    const { subtitle, title, text } = props;

    return (
        <InfoBoxDiv className="d-flex flex-column">
            <StyledText>{subtitle}</StyledText>
            <StyledTitle type={"subtitle"}>{title}</StyledTitle>
            <StyledText>{text}</StyledText>
        </InfoBoxDiv>
    );
}