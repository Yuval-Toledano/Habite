import React, {useRef, useState} from 'react';
import { useHistory, useParams} from "react-router-dom";
import {PageContainer, InnerPageContainer} from "../../../components/pageContainers/pageContainer"
import { StyledButton, StyledTitle, Link, StyledText } from "../../../components/designSystem/mobileDS"


export default function MobileSignUpJG(props) {
    const WG_emailRef = useRef();
    const WG_passwordRef = useRef();
    const { groupId } = useParams();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    
    // The function handles submit 'join group' form
    async function handleSubmitJG(event) {
        event.preventDefault();
        //setLoading(true);
        //await signUpJG(WG_emailRef.current.value, WG_passwordRef.current.value, groupCodeRef.current.value);
        //setLoading(false);
        history.push( {
          pathname: "/newUser",
          state: {
            userMail: WG_emailRef.current.value,
            password: WG_passwordRef.current.value,
            groupID: groupId,
            type: 'JG'}})
        
    }

    return (
        <PageContainer flexDirection="row" background="#E993B1">
        <InnerPageContainer flexDirection="row" className="justify-content-center" display="grid" background="transparent">
          <div className="rounded p-4 bg-offwhite">
            <div className="page-headline d-flex justify-content-center">
              <StyledTitle>Sign up to <span className="logo-small">Habite</span></StyledTitle>
            </div>
            {/* forms wrapper start */}
            <div className="forms p-4">
              
              {/* form 2 - join group user start */}
              <div className="form-2">
                {/* <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1> */}
                <StyledText>Join your group!</StyledText>
                <div className="mx-auto md:w-2/4">
                  {/* TODO: here was error div */}
                  <form onSubmit={handleSubmitJG} >
                    {/* email input start */}
                    <div className="form-group">
                      <label htmlFor="userEmailWg" className="form-label">
                        <small>Email:</small>
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-pill"
                        name="userEmailWg"
                        placeholder="E.g. archie@riverdale.com"
                        id="userEmailWg"
                        ref={WG_emailRef}
                      />
                    </div>
                    {/* email input end */}
                    {/* password input start */}
                    <div className="form-group mt-2">
                      <label htmlFor="userPasswordWg" className="form-label">
                        <small>Password</small>
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-pill"
                        name="userPasswordWg"
                        placeholder=""
                        id="userPasswordWg"
                        ref={WG_passwordRef}
                      />
                    </div>
                    {/* password input end */}
                    {/* sign up button start */}
  
                    <StyledButton type={"primary"}
                      className="Button-primary Button-wide"
                    >
                      Join your friends
                    </StyledButton>
                    {/* sign up button end */}
  
                  </form>
                  <div className="text-center my-2">
                      <small>Already have an account?{" "}
                        <Link to="/signin" className="reg-link">Log in</Link>
                      </small>
                  </div>
                </div>
              </div>
              {/* form 2 - join group user end */}
              {/* forms wrapper end */}
            </div>
          </div>
        </InnerPageContainer>
      </PageContainer>
    );
    
};


