import React from 'react';
import { useHistory } from "react-router-dom";
import { bottomsideData } from "./bottomBarData";
import { StyledBottombarButton, StyledBottombar } from "../../../components/designSystem/mobileDS";

export function Bottombar(props) {
    const history = useHistory();

    return (
        <StyledBottombar>
            {bottomsideData.map((val, key) => {
                return (
                    <StyledBottombarButton
                        key={key}
                        id={window.location.pathname === val.link ? "active" : ""}
                        className="rowBottombar"
                        onClick={() => { history.push(val.link) }}
                        alt={val.title}
                        icon={val.icon}>
                        {val.icon}
                    </StyledBottombarButton>
                );
            })}
        </StyledBottombar>
    );
}