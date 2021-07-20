import React from "react";
import { SubTitle, BadgeTitle, BadgeCollectionDiv, BadgePosterDiv, BadgePoster, BadgeStars} from "../designSystem/common";
import { Separator } from '../../components/marginer/marginer';
import SpoonFull from '../../components/svgs/Badges/sugarSpoonPoster.svg';
import Bottle from '../../components/svgs/Badges/bottlePoster.svg';
import NonGuilty from '../../components/svgs/Badges/dessertPoster.svg';
import FilledStar from '../../components/svgs/Badges/filledStar.svg';
import Star from '../../components/svgs/Badges/unfilledStar.svg';

export function BadgeProgressCard(props) {

return (
  <BadgeCollectionDiv>
      <div className="d-flex flex-column">
        <SubTitle>
          <b>Take a look at your achievements so far:</b>
        </SubTitle>
        <Separator className="mt-2"/>
        <BadgePosterDiv className="BadgePosterDiv d-flex flex-row">
            <div className="d-flex flex-column align-content-start m-2">
                <div className="d-flex flex-row justify-content-center">
                    <BadgeTitle className="d-flex mb-2">Reduce Sugar Spoon Challenge Series: 3 out of 3</BadgeTitle>
                </div>
                <BadgePoster className="d-flex flex-column justify-content-center"><img src={SpoonFull} alt="Spoon full poster"/></BadgePoster>
                <BadgeStars className="d-flex flex-row justify-content-center">
                    <img src={FilledStar} alt="filled star" />
                    <img src={FilledStar} alt="filled star" />
                    <img src={FilledStar} alt="filled star" />
                </BadgeStars>
            </div>
            <div className="d-flex flex-column justify-content-center align-content-center m-2">
                <BadgeTitle className="d-flex mb-2">Non-Guilty Pleasure Challenge Series: 2 out of 3</BadgeTitle>
                <BadgePoster className="d-flex flex-column justify-content-center"><img src={NonGuilty} alt="Spoon full poster"/></BadgePoster>
                <BadgeStars className="d-flex flex-row justify-content-center">
                    <img src={FilledStar} alt="filled star" />
                    <img src={FilledStar} alt="filled star" />
                    <img src={Star} alt="star" />
                </BadgeStars>
            </div>
            <div className="d-flex flex-column justify-content-center align-content-center m-2">
                <BadgeTitle className="d-flex mb-2">Bye Bye Sugary Drinks Challenge Series: 1 out of 3</BadgeTitle>
                <BadgePoster className="d-flex flex-column justify-content-center"><img src={Bottle} alt="Spoon full poster"/></BadgePoster>
                <BadgeStars className="d-flex flex-row justify-content-center">
                    <img src={FilledStar} alt="filled star" />
                    <img src={Star} alt="star" />
                    <img src={Star} alt="star" />
                </BadgeStars>
            </div>
        </BadgePosterDiv>
      </div>
  </BadgeCollectionDiv>
);
}