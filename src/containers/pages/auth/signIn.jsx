import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Marginer } from "../../../components/marginer/marginer";
import {
  PageContainer,
  InnerPageContainer,
} from "../../../components/pageContainers/pageContainer";
import { TextInPage } from "../../../components/designSystem/common";

export default function SignIn() {
  const { logIn } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      history.push("user/overview");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <PageContainer flexDirection="row" background="#E993B1">
      <InnerPageContainer
        flexDirection="row"
        className="justify-content-center"
        display="grid"
        background="transparent"
      >
        <div className="rounded p-4 bg-offwhite">
          <div className="page-headline d-flex justify-content-center">
            <TextInPage>
              Log in to <span className="logo-small">Habite</span>
            </TextInPage>
          </div>
          {/* forms wrapper start */}
          <div className="forms p-4 pb-0">
            <div className="form-1 p-2 pb-0">
              <div className="mx-auto md:w-2/4">
                {error && (
                  <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                    {error}
                  </div>
                )}
                {/* this is the log in form */}
                <form onSubmit={handleSubmit}>
                  {/* email input start */}
                  <div className="form-group">
                    <label htmlFor="userEmail" className="form-label">
                      <small>Email:</small>
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-pill"
                      name="userEmail"
                      placeholder="E.g. archie@riverdale.com"
                      id="userEmail"
                      ref={emailRef}
                    />
                  </div>
                  {/* email input end */}
                  <Marginer direction="vertical" margin={24} />
                  {/* password input start */}
                  <div className="form-group">
                    <label htmlFor="userPassword" className="form-label">
                      <small>Password:</small>
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-pill"
                      name="userPassword"
                      placeholder="Your Password"
                      id="userPassword"
                      ref={passwordRef}
                    />
                    <div className="d-flex justify-content-end">
                      <Link to="passwordReset" className="reg-link">
                        <small>Forgot password</small>
                      </Link>
                    </div>
                  </div>
                  {/* password input end */}

                  <Marginer direction="vertical" margin={20} />

                  {/* Log in button start */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="Button-primary Button-wide"
                  >
                    Log in
                  </button>
                  {/* Log in button end */}
                </form>
                {/* forms wrapper end */}
                <div className="text-center my-1">
                  <small>
                    Don't have an account?&nbsp;
                    <Link to="signUp" className="reg-link">
                      Sign up
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
          {/* forms wrapper end */}
        </div>
      </InnerPageContainer>
    </PageContainer>
  );
}
