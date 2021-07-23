import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {Logo, NiceTitle, IndicationText, SidebarTitle } from "../designSystem/common";
import {TextualButton} from "../button/button"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useAuth} from "../../context/AuthContext";
import {SidebarData} from "./sidebarData";



export default function Sidebar() {
    const [hour, setHour] = useState("");
    const {logOut, userData} = useAuth();
    const history = useHistory();

    async function handleLogOut(event){
        event.preventDefault();
        try {
            await logOut();
            history.push("/")
        } catch(err){
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

    const userName = userData? userData.userName : "loading..."
    const userLevel = userData? userData.level : "";
    const url = userData && userData.profilePic && userData.profilePic !== ""? userData.profilePic : "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg";

    return (
        <div className="Sidebar col g-0">
            <Logo id="logo">Habite</Logo>
            <div className="mt-4 p-2 border-bottom">
                <div className="row m-2">
                    <div className="d-flex justify-content-center flex-column">
                        <div className="align-self-center">
                            <img
                                src={url}
                                className="mb-2 profile_pic"
                                alt="profile pic"
                            ></img>
                        </div>
                        <div className='align-self-center justify-content-center pTextSidebar'>
                            <IndicationText id="text1">Good {hour} 👋</IndicationText>
                            <NiceTitle id="text2">{userName}</NiceTitle>
                            <IndicationText id="text1" className='mt-1'>Level: {userLevel}</IndicationText>
                        </div>

                    </div>
                </div>
            </div>

            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li key={key}
                    
                            id={window.location.pathname === val.link ? "active" : ""}

                            className="rowSidebar"

                            onClick={() => { history.push(val.link) }}>
                            {" "}
                            <div id="sidebarIcon">{val.icon}</div>{" "}
                            <SidebarTitle id="sidebarTitle">{val.title}</SidebarTitle>
                        </li>
                    );
                })}
            </ul>
            <div className='row justify-content-center m-2 align-items-end'>
                <TextualButton color="rgba(231, 28, 125, 0.6)" onClick={(event) => handleLogOut(event)}><ExitToAppIcon />&nbsp;logout</TextualButton>
            </div>
        </div>
    )
}