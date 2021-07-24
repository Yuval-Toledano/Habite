import React from 'react';
import { MobilePageContainer } from "../../components/pageContainers/mobile_page_container";
import { StyledButton, StyledTitle, StyledLink, StyledText, Logo } from "../../components/designSystem/mobileDS";
import { SvgIcecream, SvgBeerbottle } from "../../components/svgs/candies";
import Markunread from '@material-ui/icons/Markunread';
import { Link } from "react-router-dom";


function sendMail(event) {
  event.preventDefault();
  var link = "mailto:hellohabite@gmail.com";

  window.location.href = link;
  // document.location.href = "mailto:hellohabite@gmail.com";
};


export function MobileLanding(props) {
  return (
    <MobilePageContainer>
      <div style={{ overflowX: "clip" }} className="container-sm container-md container-lg">
        {/* TOPBAR START */}
        <div className="row justify-content-center">
          <div className="col-1">

          </div>
          <div className="col-10">
            <div className="d-flex flex-row justify-content-between">
              <div className="p-2"><Logo>Habite</Logo></div>
              <div className="p-2">
                <Link to={"/login"} style={{color: "#E71C7D"}}>
                  <StyledLink mode={"main"}>
                    login
                  </StyledLink>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-1">

          </div>
        </div>

        {/* TOPBAR END */}
        {/* HEADLINER START */}

        <div className="row justify-content-center px-4">
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <div className="col-1">

          </div>
          <div className="col-auto">
            <div className="d-flex flex-col justify-content-between">
              <div className="p-2"><StyledTitle type={"subtitle"}>Regaining control back on your mind and life, together!</StyledTitle>
                <StyledText>Habite is a safe place for those who are willing to change their nutrition habits and start a healthier chapter in their lives - to intake sugar in a more responsible way or even stop consuming it. We made the process of sugar-sobriety totaly digital and sharable, so you’ll have fun on the way to regain the control of your mind and life back to yourself.</StyledText>
                <Link to={"/signup"}><StyledButton type={"primary"} wide={true}>Get sugar free now</StyledButton></Link>
              </div>
            </div>
          </div>
          <div className="col-1">

          </div>
          <span>&nbsp;</span>
        </div>

        {/* HEADLINER END */}
        {/* STRIP START */}

        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row StripAnimation">
                <SvgIcecream />
                <SvgIcecream />
                <SvgIcecream />
                <SvgIcecream />
              </div>
            </div>
          </div>
        </div>

        {/* STRIP END */}
        {/* SLIDE START */}

        <div className="row justify-content-center px-5">
          <span>&nbsp;</span>
          <div className="col-1">

          </div>
          <div className="col-auto">
            <div className="d-flex flex-col justify-content-between py-4">
              <div className="p-2">
                <div className="slide">
                  <StyledTitle type={"landingTitle"}>How?</StyledTitle>
                  <StyledText>Awareness is the biggest step towards the change you desire</StyledText>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1">

          </div>
        </div>

        {/* SLIDE END */}
        {/* STRIP START */}

        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="d-flex flex-row justify-content-center">
              <div className="StripAnimation">
                <SvgBeerbottle />
                <SvgBeerbottle />
                <SvgBeerbottle />
                <SvgBeerbottle />
              </div>
            </div>
          </div>
        </div>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>

        {/* STRIP END */}
        {/* MAIN CTA START */}

        <div className="row justify-content-center" style={{background: "#E71C7D"}}>
          <div className="col-1">

          </div>
          <div className="col-10">
            <div className="d-flex flex-column align-items-center justify-content-center RowBig">
              <div style={{textAlign: "center"}}>
                <StyledTitle type={"subtitle"} mode={"over_dark"}>So, are you up for the challenge?<br />Gather your friends &</StyledTitle>
                <StyledTitle type={"title"} mode={"over_dark"} style={{ textTransform: "uppercase" }}>Take control back</StyledTitle>
                <span>&nbsp;</span>
                <Link to={"/signup"}><StyledButton type={"secondary"} wide={true}>Sign up now</StyledButton></Link>
              </div>
            </div>
          </div>
          <div className="col-1">
          </div>
        </div>

        {/* MAIN CTA END */}
        {/* FOOTER START */}

        <div className="row justify-content-center align-items-center RowBig" style={{background: "#00397B"}}>
          <div className="col-1">

          </div>
          <div className="col-10" style={{textAlign: "center"}}>
            <StyledTitle type={"title"} mode={"over_dark"}>Habite</StyledTitle>
            <StyledText mode={"over_dark"}>Habite a safe place for those who are willing to start a healthier chapter in their lives - to intake sugar in a more responsible way or even stop consuming it.</StyledText>
            <StyledText mode={"over_dark"}>Got a question?</StyledText>
            <StyledLink mode={"over_dark"} onClick={sendMail} id="contactus"><Markunread fontSize="small" /> Contact us</StyledLink>
            <p></p>
            <StyledText mode={"over_dark"}>© 2021 Habite. All rights reserved. Built by the Habite team: Yuval, Sara, Avigail, Noam and Tal, with love 🧡</StyledText>
          </div>
          <div className="col-1">

          </div>
        </div>

        {/* FOOTER END */}
      </div>
    </MobilePageContainer >
  );
}