import React from "react";
import Gramophone from '../../images/Gramophone.svg';
import { FlyingBox, BackgroundRegular, StyledButton, StyledTitle, StyledTextCentered } from "../../components/designSystem/mobileDS";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function NotFoundPage() {
    const history = useHistory();

    return (
        <>
            <FlyingBox zindx={1} top={50}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <img src={Gramophone} width={'50%'} />
                    <div style={{ margin: '10%', display: 'grid', justifySelf: 'center' }}>
                        <StyledTitle type={"title"}>Page not found</StyledTitle>
                        <p></p>
                        <StyledTextCentered>We're sorry, this page probably doesn't exist...</StyledTextCentered>
                        <p></p>
                        <StyledButton type={"primary"} wide={true} onClick={() => history.goBack()}>Go back</StyledButton>
                    </div>
                </div>
            </FlyingBox>
            <BackgroundRegular alt="Upper background color" />
        </>
    );
}