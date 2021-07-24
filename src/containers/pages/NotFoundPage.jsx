// 404 page container

import React from "react";
import Gramophone from '../../images/Gramophone.svg';
import { StyledButton, StyledTitle, StyledTextCentered, StyledLink } from "../../components/designSystem/mobileDS";
import { useHistory } from "react-router-dom";

// contact habite team through email
function sendMail(event) {
    event.preventDefault();
    var link = "mailto:hellohabite@gmail.com";

    window.location.href = link;
};

// 404 error - Not found page container
export default function NotFoundPage() {
    const history = useHistory();

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="d-flex flex-column justify-content-center align-items-center align-self-center">

                <div><p></p><p></p></div>

                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src={Gramophone} width={"60%"} alt="This is a gramophone illustration" />
                    </div>
                    <p></p>
                    <StyledTitle type={"title"}>Page not found</StyledTitle>
                    <p></p>
                    <StyledTextCentered style={{ textAlign: 'center' }}>We're sorry, this page probably doesn't exist...</StyledTextCentered>
                    <p></p>
                    <StyledButton type={"primary"} wide={true} onClick={() => history.goBack()}>Go back</StyledButton>
                    <p>&nbsp;</p>
                    <div><StyledTextCentered style={{ textAlign: 'center' }}>or <StyledLink mode={'main'} onClick={sendMail}>contact us</StyledLink></StyledTextCentered></div>
                </div>

            </div>
        </div>
    );
}