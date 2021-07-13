import { MobilePageContainer } from "../../components/pageContainers/mobile_page_container";
import { StyledButton, StyledTitle, Link, StyledText } from "../../components/designSystem/mobileDS";
import { SvgIcecream, SvgBeerbottle } from "../../components/svgs/candies";

export function MobileLanding(props) {
  return (
    <MobilePageContainer>
      <div ClassName="container-sm container-md container-lg">
        {/* TOPBAR START */}
        <div class="row justify-content-center">
          <div class="col-1">

          </div>
          <div class="col-10">
            <div class="d-flex flex-row justify-content-between">
              <div class="p-2">Habite</div>
              <div class="p-2"><Link>login</Link></div>
            </div>
          </div>
          <div class="col-1">

          </div>
        </div>

        {/* TOPBAR END */}
        {/* HEADLINER START */}

        <div class="row justify-content-center px-4">
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <div class="col-1">

          </div>
          <div class="col-auto">
            <div class="d-flex flex-col justify-content-between">
              <div class="p-2"><StyledTitle type={"subtitle"}>Regaining control back on your mind and life, together!</StyledTitle>
                <StyledText>Habite is a safe place for those who are willing to change their nutrition habits and start a healthier chapter in their lives - to intake sugar in a more responsible way or even stop consuming it. We made the process of sugar-sobriety totaly digital and sharable, so you’ll have fun on the way to regain the control of your mind and life back to yourself.</StyledText>
                <StyledButton type={"primary"} wide={true}>Get sugar free now</StyledButton></div>
            </div>
          </div>
          <div class="col-1">

          </div>
          <span>&nbsp;</span>
        </div>

        {/* HEADLINER END */}
        {/* STRIP START */}

        <div class="row justify-content-center">
          <div class="col-auto">
            <div class="d-flex flex-row justify-content-between">
              <div ClassName="StripAnimation">
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

        <div class="row justify-content-center px-5">
          <span>&nbsp;</span>
          <div class="col-1">

          </div>
          <div class="col-auto">
            <div class="d-flex flex-col justify-content-between py-4">
              <div class="p-2">
                <div ClassName="slide">
                  <StyledTitle type={"landingTitle"}>How?</StyledTitle>
                  <StyledText>Awareness is the biggest step towards the change you desire</StyledText>
                </div>
              </div>
            </div>
          </div>
          <div class="col-1">

          </div>
        </div>

        {/* SLIDE END */}
        {/* STRIP START */}

        <div class="row justify-content-center">
          <div class="col-auto">
            <div class="d-flex flex-row justify-content-center">
              <div ClassName="StripAnimation">
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

        <div class="row justify-content-center px-2" Style={"background: #E71C7D"}>
          <div class="col-1">

          </div>
          <div class="col-auto">
            <div class="d-flex flex-col justify-content-center align-items-center RowBig">
              <div class="p-2">
                <p Style={"text-Align: center"}>
                  <StyledTitle type={"subtitle"} mode={"over_dark"}>So, are you up for the challenge?<br />Gather your friends &</StyledTitle>
                  <StyledTitle type={"title"} mode={"over_dark"} Style={{ textTransform: "uppercase" }}>Take control back</StyledTitle>
                  <span>&nbsp;</span>
                  <StyledButton type={"secondary"} wide={true}>Sign up now</StyledButton>
                </p>
              </div>
            </div>
          </div>
          <div class="col-1">
          </div>
        </div>

        {/* MAIN CTA END */}
        {/* FOOTER START */}

        <div class="row justify-content-center px-2 align-items-center RowBig" Style={"background: #00397B"}>
          <div class="col-1">

          </div>
          <div class="col-10" Style={"text-Align: center"}>
            <StyledTitle type={"title"} mode={"over_dark"}>Habite</StyledTitle>
            <StyledText mode={"over_dark"}>Habite a safe place for those who are willing to start a healthier chapter in their lives - to intake sugar in a more responsible way or even stop consuming it.</StyledText>
            <StyledText mode={"over_dark"}>Got a question?</StyledText>
            <Link mode={"over_dark"}>Contact us</Link>
            <StyledText mode={"over_dark"}>© 2021 Habite. All rights reserved. Built by TYSAN with love.</StyledText>
          </div>
          <div class="col-1">

          </div>
        </div>

        {/* FOOTER END */}
      </div>
    </MobilePageContainer>
  );
}
