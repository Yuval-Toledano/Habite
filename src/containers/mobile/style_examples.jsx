import { MobilePageContainer } from "../../components/pageContainers/mobile_page_container";
import { StyledButton, StyledTitle, StyledLink, StyledText } from "../../components/designSystem/mobileDS";

// Styling codex
export function StyleExamples(props) {
  return (
    <MobilePageContainer>
      <StyledButton type={"primary"}>primary button</StyledButton>
      <StyledButton type={"secondary"}>secondary button</StyledButton>
      <StyledButton type={"disabled"}>disabled button</StyledButton>

      <StyledTitle type={"title"}>Title over bright background</StyledTitle>
      <StyledTitle type={"title"} mode={"over_dark"}>Title over dark background</StyledTitle>
      <StyledTitle type={"subtitle"}>Subtitle over bright background</StyledTitle>
      <StyledTitle type={"subtitle"} mode={"over_dark"}>Subtitle over dark background</StyledTitle>
      <StyledTitle type={"landingTitle"}>Landing page subtitle</StyledTitle>

      <StyledLink>Default link</StyledLink>
      <StyledLink mode={"over_bright"}>Link over bright background</StyledLink>
      <StyledLink mode={"over_dark"}>Link over dark background</StyledLink>
      
      <StyledText>Default text</StyledText>
      <StyledText mode={"over_dark"}>Text over dark background</StyledText>
    </MobilePageContainer>
  );
}
