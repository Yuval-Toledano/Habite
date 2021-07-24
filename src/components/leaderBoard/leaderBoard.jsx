import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { IndicationText } from "../designSystem/common";
import { Marginer } from "../marginer/marginer";

const LeaderBoxContainer = styled.div`
  background: rgba(250, 240, 228, 1);
  border: 1px solid;
  border-color: ${({ bColor }) => (bColor ? bColor : "rgba(251, 229, 54, 1)")};
  margin: 0px 16px 0px 0px;
  padding: 16px 0px;
  padding-top: 0px;
  width: 120px;
  max-width: 100px;
  text-align: center;
  border-radius: 10px;
`;

/**
 * web leader board
 */
export function LeaderBoard() {
  const { groupMemberData } = useAuth();

  return (
    <>
      {groupMemberData &&
        groupMemberData.map((member) => {
          return (
            <LeaderBoxContainer key={member.id}>
              <img
                src={
                  member.profilePic ||
                  "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
                }
                className="picLeaderBox"
                alt="profile pic"
              ></img>
              <Marginer direction="vertical" margin={10} />
              <div className="">
                <IndicationText>{member.userName}</IndicationText>
                <IndicationText>
                  <b>{member.score} exp.</b>
                </IndicationText>
              </div>
            </LeaderBoxContainer>
          );
        })}
    </>
  );
}
