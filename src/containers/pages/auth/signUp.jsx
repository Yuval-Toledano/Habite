import React, {useRef, useState} from 'react';
import {Link, withRouter, useHistory} from "react-router-dom";
import {TextInPage, StandAloneTitle} from "../../../components/designSystem/common";
import {PageContainer, InnerPageContainer} from "../../../components/pageContainers/pageContainer"
import { Marginer } from '../../../components/marginer/marginer';
import {useAuth} from "../../../context/AuthContext";


export default function SignUp() {
    const NG_emailRef = useRef();
    const NG_passwordRef = useRef();
    const WG_emailRef = useRef();
    const WG_passwordRef = useRef();
    const groupCodeRef = useRef();
    const {signUpNG, signUpJG} = useAuth();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    // The function handles submit 'no group' form
    async function handleSubmitNG(event){
        event.preventDefault();
        setLoading(true);
        await signUpNG(NG_emailRef.current.value, NG_passwordRef.current.value);
        setLoading(false);
        history.push("/newUser")

    }

    // The function handles submit 'join group' form
    async function handleSubmitJG(event) {
        event.preventDefault();
        setLoading(true);
        await signUpJG(WG_emailRef.current.value, WG_passwordRef.current.value, groupCodeRef.current.value);
        setLoading(false);
        console.log("submit")
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
                <StandAloneTitle>I don't have a group</StandAloneTitle>
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
                </div>
              </div>
              {/* form 1 - groupless user end */}

              <div className="p-4 m-4 d-flex align-items-center">
                <p>or</p>
              </div>

              {/* form 2 - join group user start */}
              <div className="form-2">
                {/* <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1> */}
                <StandAloneTitle>I have a group code</StandAloneTitle>
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
                    {/* groupCode input start - TODO: add to backend*/}
                    <div className="form-group mt-2">
                      <label htmlFor="userGroupCode" className="form-label">
                        <small>Group code:</small>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        name="userGroupCode"
                        id="userGroupCode"
                        ref={groupCodeRef}
                      />
                    </div>
                    {/* groupCode input end */}
                    {/* sign up button start */}
  
                    <button
                      className="Button-primary Button-wide"
                      type="submit"
                    >
                      Join your friends
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
              {/* form 2 - join group user end */}
              {/* forms wrapper end */}
            </div>
          </div>
        </InnerPageContainer>
      </PageContainer>
    );
    
};


