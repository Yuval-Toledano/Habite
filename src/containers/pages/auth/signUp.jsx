import React, {useRef, useState} from 'react';
import {Link, withRouter, useHistory} from "react-router-dom";
import {TextInPage, StandAloneTitle} from "../../../components/designSystem/common";
import {PageContainer, InnerPageContainer} from "../../../components/pageContainers/pageContainer"
import { Marginer } from '../../../components/marginer/marginer';


export default function SignUp(props) {
    const NG_emailRef = useRef();
    const NG_passwordRef = useRef();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    // The function handles submit 'no group' form
    async function handleSubmitNG(event){
        event.preventDefault();
        //setLoading(true);
        //await signUpNG(NG_emailRef.current.value, NG_passwordRef.current.value);
        //setLoading(false);
        history.push( {
          pathname: "/newUser",
          state: {
            userMail: NG_emailRef.current.value,
            password: NG_passwordRef.current.value,
            type: 'NG'}})
    }

    return (
        <PageContainer flexDirection="row" background="#E993B1">
        <InnerPageContainer flexDirection="row" className="justify-content-center" display="grid" background="transparent">
          <div className="rounded p-4 bg-offwhite">
            <div className="page-headline d-flex justify-content-center">
              <TextInPage>Sign up to <span className="logo-small">Habite</span></TextInPage>
            </div>
            {/* forms wrapper start */}
            <div className="forms p-4">
              {/* form 1 - groupless user start */}
              <div className="form-1 p-2">
                <StandAloneTitle>Create a New Group!</StandAloneTitle>
                <div className="mx-auto md:w-2/4">
                {/* {TODO: here was error div} */}
  
                  <form onSubmit={handleSubmitNG} method="POST">
                    {/* email input start */}
                    <div className="form-group">
                      <label htmlFor="userEmailNg" className="form-label">
                        <small>Email:</small>
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-pill"
                        name="userEmailNg"
                        placeholder="E.g. archie@riverdale.com"
                        id="userEmailNg"
                        ref={NG_emailRef}
                      />
                    </div>
                    {/* email input end */}
                    {/* password input start */}
                    <div className="form-group mt-2">
                      <label htmlFor="userPasswordNg" className="form-label">
                        <small>Password:</small>
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-pill"
                        name="userPasswordNg"
                        placeholder=""
                        id="userPasswordNg"
                        ref={NG_passwordRef}
                      />
                    </div>
                    {/* password input end */}
                    {/* Marginer start */}
                    <Marginer direction="vertical" margin={68} />
                    {/* Marginer end */}
                    {/* sign up button start */}
  
                    <button
                      className="Button-primary Button-wide"
                      type="submit">Create a group
                    </button>
                    {/* sign up button end */}
                  </form>
                  <div className="text-center my-2">
                  <small>Already have an account?{" "}
                    <Link to="/signin" className="reg-link">Log in</Link>
                  </small>
              </div>
                
                  </div>
              </div>
              {/* form 1 - groupless user end */}

              
              
              {/* forms wrapper end */}
            </div>
          </div>
        </InnerPageContainer>
      </PageContainer>
    );
    
};


