import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from 'styled-components';
import { StyledText, StyledTitle } from "../../components/designSystem/mobileDS";

export const MobileUserDetailsHeaderWrapper = styled.div`
    width: 100;
    padding: 0px 20%;
`;

export function MobileUserDetailsHeader({ props }) {
    const [hour, setHour] = useState("");
    const { logOut, userData } = useAuth();
    const history = useHistory();

    async function handleLogOut(event) {
        event.preventDefault();
        try {
            await logOut();
            history.push("/")
        } catch (err) {
            console.error("Error with logout ", err)
        }
    }

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

    }, [userData, hour])

    const userName = userData ? userData.userName : "loading..."
    const userLevel = userData ? userData.level : "";
    const url = userData && userData.profilePic && userData.profilePic !== "" ? userData.profilePic : "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg";
    const userScore = userData ? userData.score : 0;

    return (
        <MobileUserDetailsHeaderWrapper>
            <div className="d-flex justify-content-start flex-row">
                <StyledText mode={"over_dark"} id="text1">Good {hour} 👋</StyledText>
            </div>
            <div className="d-flex justify-content-between flex-row">
                <div className='align-self-center'>
                    <StyledTitle type={"title"} mode={"over_dark"} id="text2">{userName}</StyledTitle>
                    <StyledText mode={"over_dark"} id="text1" className='mt-1'>Score: {userScore}</StyledText>
                </div>
                <div className="align-self-end">
                    <img
                        src={url}
                        className="mb-2 profile_pic"
                        alt="profile pic"
                    ></img>
                </div>
            </div>
        </MobileUserDetailsHeaderWrapper>
    );


}