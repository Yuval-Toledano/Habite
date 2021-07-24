import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { TextInPage, StandAloneTitle } from "../../../components/designSystem/common";
import { PageContainer } from "../../../components/pageContainers/pageContainer";
import { useAuth } from "../../../context/AuthContext";
import "./auth.css";

/**
 * sign up and create a new group form 
 */
export default function SignUpNG(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const { signUpNG} = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* the function checks if the the email is a valid input */
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  /* The function handles submit form */
  async function handleSubmit(event) {
    event.preventDefault();

    if(!validateEmail(emailRef.current.value)){
        return setError("The email address is badly formatted.")
    }
    try {
      setError("");
      setLoading(true);
      await signUpNG(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        image
      )
    } catch (err) {
      setError(err);
      console.log("error 2");
    }
    setLoading(false);
    history.push("/overview");
  }

  /* The function handles submit image */
  function handleUploadImage(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  return (
    <PageContainer flexDirection="row" background="#E993B1">
      <div className="title-container">
        <div className="title">
          <span className="logo-small" style={{ color: "white" }}>
            Habite
          </span>
        </div>
      </div>
      <div className="container">
        <div className="subTitle-container">
          <StandAloneTitle>Create a Group</StandAloneTitle>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} method="POST">
          {/* name input start */}
          <div className="user-details">
            <div className="input-box">
              <TextInPage>
                <small>
                  <span className="details">Name</span>
                </small>
              </TextInPage>
              <input
                type="text"
                name="userName"
                id="userName"
                ref={nameRef}
                required
              ></input>
            </div>
          </div>
          {/* email input start */}
          <div className="user-details">
            <div className="input-box">
              <TextInPage>
                <small>
                  <span className="details">Email</span>
                </small>
              </TextInPage>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                ref={emailRef}
                required
                placeholder="E.g. example@mail.com"
              ></input>
            </div>
          </div>
          {/* password input start */}
          <div className="user-details">
            <div className="input-box">
              <TextInPage>
                <small>
                  <span className="details">Password</span>
                </small>
              </TextInPage>
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                ref={passwordRef}
                placeholder="6-digits-min"
                required
              ></input>
            </div>
          </div>
          {/* profilepic input start */}
          <div className="user-details">
            <div className="input-box">
              <TextInPage>
                <small>
                  <span className="details">Profile Picture</span>
                </small>
              </TextInPage>
              <input
                type="file"
                accept="image/*"
                id="userProfilePic"
                ref={imageRef}
                className="form-control rounded-pill"
                onChange={(e) => handleUploadImage(e)}
                placeholder="need to fix"
              ></input>
            </div>
          </div>
          <button
            className="Button-primary Button-wide"
            type="submit"
            disabled={loading}
          >
            Create a group
          </button>
        </form>
      </div>
      <div className="login-container">
        <small>
          Already have an account?{" "}
          <Link to="/login" className="reg-link" style={{ color: "white" }}>
            Log in
          </Link>
        </small>
      </div>
    </PageContainer>
  );
}
