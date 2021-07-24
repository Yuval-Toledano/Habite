import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  padding: 2em 3em;
  background: #00397b;
  padding: 100px;
`;

const Title = styled.h2`
  font-family: "Oleo Script";
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 149.58%;
  color: #fff4e6;
`;

const Paragraph = styled.p`
  width: 50%;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  color: #fff4e6;
`;

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between:
    align-items: center;
    height: 10px;
    border-top: 0.6px solid rgba(255, 244, 230, 0.5);
    margin-top: 30px;
`;

const PrivacyText = styled.p`
  color: #fff4e6;
  margin: 20px 0;
  font-size: 11px;
`;

/**
 * web App footer components
 */
export function Footer(props) {
  return (
    <FooterContainer>
      <Title>Habite</Title>
      <Paragraph>
        Habite is a safe place for those who are willing to start a healthier
        chapter in their lives - to intake sugar in a more responsible way or
        even stop consuming it.
      </Paragraph>
      <BottomContainer>
        <PrivacyText>
          © 2021 Habite. All rights reserved. Built by TYSAN team with love 🧡
        </PrivacyText>
      </BottomContainer>
    </FooterContainer>
  );
}
