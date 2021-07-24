import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import styled from 'styled-components';
import { StyledText, StyledTitle } from "../../components/designSystem/mobileDS";

export const MobileUserDetailsHeaderWrapper = styled.div`
    
`;

export function MobileUserDetailsHeader() {
    const [hour, setHour] = useState("");
    const [userScore, setUserScore] = useState(0)
    const { userData } = useAuth();

    useEffect(() => {
        const whatIsTheHour = () => {
            var date = new Date();
            const nowHour = date.getHours();
            if (nowHour >= 5 && nowHour < 12) {
                setHour("morning");
            } else if (nowHour >= 12 && nowHour < 17) {
                setHour("afternoon");
            } else if (nowHour >= 17 && nowHour < 20) {
                setHour("evening");
            } else {
                setHour("night");
            }
        };
        whatIsTheHour();
        const score = userData ? userData.score : userScore
        setUserScore(score)
    }, [userData, hour, userScore])

    const userName = userData ? userData.userName : "loading..."
    const url = (userData && userData.profilePic) ? userData.profilePic : "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg";
    
    return (
        <MobileUserDetailsHeaderWrapper className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-column">
                <StyledText mode={"over_dark"} id="text1">Good {hour} 👋</StyledText>
                <StyledTitle type={"title"} mode={"over_dark"} id="text2">{userName}</StyledTitle>
                <StyledText mode={"over_dark"} id="text1" className='mt-1'>Score: {userScore}</StyledText>
            </div>
            <div className="d-flex flex-column w-25">
                <img
                    src={url}
                    className="m-3 profile_pic"
                    alt="profile pic"
                    style={{
                        border: "4px #e993b1 solid"
                    }}
                ></img>
            </div>
        </MobileUserDetailsHeaderWrapper>
    );


}