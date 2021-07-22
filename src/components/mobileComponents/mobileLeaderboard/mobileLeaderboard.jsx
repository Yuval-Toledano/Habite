import React, {useState, useEffect} from "react";
import { useAuth } from "../../../context/AuthContext";
import { StyledTitle, StyledText, LeaderboardDiv, LeaderboardContainer, LeaderBoardPhoto } from "../../designSystem/mobileDS";

export function MobileLeaderboard() {

    const { groupMemberData } = useAuth();
    const sortedGroupMemberData = [].concat(groupMemberData)
    sortedGroupMemberData.sort((a, b) => (a.score < b.score) ? 1 : -1)

    // variables for the user color
    const colors = {
      1: "#F16643", 2: "#0891A8", 3: "#E993B1", 4: "#FBE536"
    };
    var borderColor = 0;

    return (
        <>
          <LeaderboardContainer className="d-flex flex-column">
          {sortedGroupMemberData &&
            sortedGroupMemberData.map((member) => {
              // getting the user color and creating the border string
              if (borderColor > 3) {
                borderColor = 1;
              } else {
                borderColor++;
              }
              const photoBorderString = `2px ${colors[borderColor]} solid`;
              return (
                  // to change the layout of the LeaderboardDiv go to the relevant function in mobileDS!
                  <LeaderboardDiv key={member.id} 
                  color={photoBorderString} 
                  className="d-flex align-items-center">
                    <LeaderBoardPhoto
                      src={
                        member.profilePic
                      }
                      className="picLeaderBox"
                      alt="profile pic"
                      color={photoBorderString}
                    ></LeaderBoardPhoto>
                    <StyledTitle type="subtitle" size="20" className="align-self-center">{member.userName}</StyledTitle>
                    <StyledText className="d-flex align-items-center mt-1">{member.score}</StyledText>
                  </LeaderboardDiv>
              );
            })}
          </LeaderboardContainer>
        </>
      );

}