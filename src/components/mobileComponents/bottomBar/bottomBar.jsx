import React from 'react';
import { useHistory } from "react-router-dom";
import { bottomsideData } from "./bottomBarData";
import { StyledBottombarButton, StyledBottombar } from "../../../components/designSystem/mobileDS";
import { Link } from "react-router-dom";

export function Bottombar(props) {
    const history = useHistory();

    return (
        <StyledBottombar>
            {bottomsideData.map((val, key) => {
                return (
                    <Link to={val.link} key={key}>
                        <StyledBottombarButton
                            key={key}
                            id={window.location.pathname === val.link ? "active" : ""}
                            className="rowBottombar"
                            onClick={() => { history.push(val.link) }}
                            alt={val.title}
                            icon={val.icon}>
                            {val.icon}
                        </StyledBottombarButton>
                    </Link>
                );
            })}
        </StyledBottombar>
    );
}