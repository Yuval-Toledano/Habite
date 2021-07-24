import React from "react";
import SpoonFull from '../../../components/svgs/Badges/sugarSpoonPoster.svg';
import Bottle from '../../../components/svgs/Badges/bottlePoster.svg';
import NonGuilty from '../../../components/svgs/Badges/dessertPoster.svg';
import FilledStar from '../../../components/svgs/Badges/filledStar.svg';
import Star from '../../../components/svgs/Badges/unfilledStar.svg';
import { MobileBadgeDiv, StyledText } from "../../designSystem/mobileDS";

/**
 * mobile badge component
 */
export function MobileBadges(props) {

return (
    <MobileBadgeDiv className="d-flex flex-row">
        <div className="d-flex flex-column m-2">
            <StyledText>Reduce Sugar Spoon Challenge Series: 3 out of 3</StyledText>
            <img src={SpoonFull} alt="Reduce Sugar Spoon poster"/>
            <div className="d-flex flex-row justify-content-center mt-2">
                <img src={FilledStar} alt="Filled star"/>
                <img src={FilledStar} alt="Filled star"/>
                <img src={FilledStar} alt="Filled star"/>
            </div>
        </div>
        <div className="d-flex flex-column m-2">
            <StyledText>Non-Guilty Pleasure Challenge Series: 2 out of 3</StyledText>
            <img src={NonGuilty} alt="Non-Guilty Pleasure poster"/>
            <div className="d-flex flex-row justify-content-center mt-2">
                <img src={FilledStar} alt="Filled star"/>
                <img src={FilledStar} alt="Filled star"/>
                <img src={Star} alt="Star"/>
            </div>
        </div>
        <div className="d-flex flex-column m-2">
            <StyledText>Bye Bye Sugary Drinks Challenge Series: 1 out of 3</StyledText>
            <img src={Bottle} alt="Bye Bye Sugary Drinks poster"/>
            <div className="d-flex flex-row justify-content-center mt-2">
                <img src={FilledStar} alt="Filled star"/>
                <img src={Star} alt="Star"/>
                <img src={Star} alt="Star"/>
            </div>
        </div>
    </MobileBadgeDiv>
);
}