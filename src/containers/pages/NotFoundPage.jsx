import React from "react";
import Gramophone from '../../images/Gramophone.svg';
import { StyledButton, StyledTitle, StyledTextCentered } from "../../components/designSystem/mobileDS";
import { useHistory } from "react-router-dom";

export default function NotFoundPage() {
    const history = useHistory();

    return (
        <div className='container-fluid'>

            {/* <div className="d-flex justify-content-center align-items-center"> */}

            <div className="d-flex  flex-column justify-content-center align-items-center">
                <div><img src={Gramophone} width={"50%"} alt="This is a gramophone illustration"/></div>
                <StyledTitle type={"title"}>Page not found</StyledTitle>
                <p></p>
                <StyledTextCentered>We're sorry, this page probably doesn't exist...</StyledTextCentered>
                <p></p>
                <StyledButton type={"primary"} width={"50%"} onClick={() => history.goBack()}>Go back</StyledButton>
            </div>

            {/* </div> */}
        </div>
    );
}