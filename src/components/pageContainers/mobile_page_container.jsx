import React from "react";
import styled from "styled-components";

const MobilePageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ? flexDirection : "column"};
  align-items: center;
  background: ${({ background }) => background ? background : "#FAF0E4"};
`;

export const MobileInnerPageContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "auto")};
  min-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "auto")};
  display: ${({ display }) => (display ? display : "flex")};
  flex-direction: ${({ flexDirection }) => flexDirection ? flexDirection : "column"};
  align-items: center;
  padding: 60px 100px;
  background: ${({ background }) => background ? background : "#FAF0E4"};
  overflow: hidden;
`;

export function MobilePageContainer(props) {
  const { background, flexDirection } = props;
  return (
    <MobilePageWrapper background={background} flexDirection={flexDirection}>
      {props.children}
    </MobilePageWrapper>
  );
}