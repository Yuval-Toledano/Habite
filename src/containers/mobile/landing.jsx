import { MobilePageContainer } from "../../components/pageContainers/mobile_page_container";
import { StyledButton, StyledTitle, Link, StyledText } from "../../components/designSystem/mobileDS";

export function MobileLanding(props) {
  return (
    <MobilePageContainer>
      <div ClassName="container-sm container-md container-lg">
        <div ClassName="row">
          <div ClassName="col">Habite</div>
          <div ClassName="col"><Link>login</Link></div>
        </div>
        <div ClassName="row">
          <div ClassName="col">
            <StyledTitle type={"subtitle"}>Regaining control back on your mind and life, together!</StyledTitle>
            <StyledText>Habite is a safe place for those who are willing to change their nutrition habits and start a healthier chapter in their lives - to intake sugar in a more responsible way or even stop consuming it. We made the process of sugar-sobriety totaly digital and sharable, so you’ll have fun on the way to regain the control of your mind and life back to yourself.</StyledText>
            <StyledButton type={"primary"} wide={true}>Get sugar free now</StyledButton>
          </div>
        </div>
        <div ClassName="row">moving strip</div>
        <div ClassName="row">
          <div ClassName="slide">
            <StyledTitle type={"landingTitle"}>How?</StyledTitle>
            <StyledText>Awareness is the biggest step towards the change you desire</StyledText>
          </div>
          <div>circles slider</div>
        </div>
        <div ClassName="row">moving strip</div>
        <div ClassName="row">
          <StyledTitle type={"subtitle"} mode={"over_dark"}>So, are you up for the challenge?<br />Gather your friends &</StyledTitle>
          <StyledTitle type={"title"} mode={"over_dark"} Style={{ textTransform: "uppercase" }}>Take control back</StyledTitle>
        </div>
        <div ClassName="row">
          <StyledTitle type={"title"} mode={"over_dark"}>Habite</StyledTitle>
          <StyledText mode={"over_dark"}>Habite a safe place for those who are willing to start a healthier chapter in their lives - to intake sugar in a more responsible way or even stop consuming it.</StyledText>
          <StyledText mode={"over_dark"}>Have a question?</StyledText>
          <Link mode={"over_dark"}>Contact us</Link>
          <StyledText mode={"over_dark"}>© 2021 Habite. All rights reserved. Built by TYSAN with love.</StyledText>
        </div>
      </div>
    </MobilePageContainer>
  );
}
