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
              if (borderColor > 4) {
                borderColor = 1;
              } else {
                borderColor++;
              }
              const photoBorderString = `2px ${colors[borderColor]} solid`;
              return (
                  // to change the layout of the LeaderboardDiv go to the relevant function in mobileDS!
                  <LeaderboardDiv key={member.id} color={photoBorderString}>
                    <LeaderBoardPhoto className="d-flex flex-column justify-content-around align-items-center"
                      src={
                        member.profilePic ||
                        "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
                      }
                      className="picLeaderBox"
                      alt="profile pic"
                      color={photoBorderString}
                    ></LeaderBoardPhoto>
                      <StyledText className="d-flex flex-column justify-content-around align-items-center">{member.userName}</StyledText>
                      <StyledText className="d-flex flex-column justify-content-around align-items-center">{member.score}</StyledText>
                  </LeaderboardDiv>
              );
            })}
          </LeaderboardContainer>
        </>
      );

}