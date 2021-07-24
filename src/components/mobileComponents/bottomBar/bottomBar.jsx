import React from 'react';
import { useHistory } from "react-router-dom";
import { BottomSideData } from "./bottomBarData";
import { StyledBottombarButton, StyledBottombar } from "../../../components/designSystem/mobileDS";
import { Link } from "react-router-dom";

/**
 * mobile bottom bar component
 */
export function Bottombar(props) {
    const history = useHistory();

    return (
        <StyledBottombar>
            {BottomSideData.map((val, key) => {
                return (
                    <Link to={val.link} key={key}>
                        <StyledBottombarButton
                            key={key}
                            id={window.location.pathname === val.link ? "active" : ""}
                            className="rowBottombar"
                            onClick={() => { 
                                history.push({
                                    pathname: val.link,
                                    state: {mode: "test" }})}}
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