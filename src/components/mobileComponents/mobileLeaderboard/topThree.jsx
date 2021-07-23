import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { StyledText, InfoBoxDiv, TopThreeMiddle, TopThreeLeft, TopThreeRight, FirstPlaceCircle, GeneralPlaceCircle, FirstCrown } from "../../designSystem/mobileDS";
import FirstCircle from "../../svgs/topThreeSvgs/FirstCircle.svg";
import SecondCircle from "../../svgs/topThreeSvgs/SecondCircle.svg";
import ThirdCircle from "../../svgs/topThreeSvgs/ThirdCircle.svg";
import Crown from "../../svgs/topThreeSvgs/crown.svg";


export function TopThree() {

    const { groupMemberData } = useAuth();
    const sortedGroupMemberData = [].concat(groupMemberData);
    sortedGroupMemberData.sort((a, b) => (a.score < b.score) ? 1 : -1);
    if (sortedGroupMemberData.length > 2) {

        const topThreeMembers = sortedGroupMemberData.slice(0, 3);

        return (
            <div className="d-flex flex-row justify-content-center align-items-end mb-3">
                <div className="d-flex flex-column mx-3 align-items-center">
                    <TopThreeLeft src={topThreeMembers[1].profilePic || "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"} alt="Second place member"></TopThreeLeft>
                    <GeneralPlaceCircle src={SecondCircle} alt="Second place circle"/>
                </div>
                <div className="d-flex flex-column mx-3 align-items-center">
                    <FirstCrown src={Crown}/>
                    <TopThreeMiddle src={topThreeMembers[0].profilePic || "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"} alt="First place member"></TopThreeMiddle>
                    <FirstPlaceCircle src={FirstCircle} alt="First place circle"/>
                </div>
                <div className="d-flex flex-column mx-3 align-items-center">
                    <TopThreeRight src={topThreeMembers[2].profilePic || "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"} alt="Third place member"></TopThreeRight>
                    <GeneralPlaceCircle src={ThirdCircle} alt="Third place circle"/>
                </div>
            </div>
        );
    } else {
        return (
            <InfoBoxDiv>
                <StyledText>There are less than 3 members... &#128542;</StyledText>
            </InfoBoxDiv>
        );
    }

}