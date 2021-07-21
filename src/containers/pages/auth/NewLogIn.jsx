import React, {useRef, useState, useEffect} from 'react';
import { useHistory,Link } from "react-router-dom";
import {TextInPage, StandAloneTitle} from "../../../components/designSystem/common";
import {PageContainer} from "../../../components/pageContainers/pageContainer"
import {useAuth} from "../../../context/AuthContext";
import { Marginer } from "../../../components/marginer/marginer";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }

export default function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { logIn } = useAuth();
    const history = useHistory();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dimentions = useWindowDimensions();
    
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      if (dimentions.width < 500) {
        history.push("mobile/overview");
      } else {
        history.push("user/overview");
      }
    } catch {
      setError("Failed to log in")
      console.log(error);
    }
    setLoading(false);
  }
    
   
return (
    <PageContainer flexDirection="row" background="#E993B1">
        <div className="title-container">
            
            <div className="title">
                <span className="logo-small" style={{color:"white"}}>Habite</span>
            </div>
        </div>
            <div className="container">
            
                <div className="subTitle-container">
                    <StandAloneTitle>Log In</StandAloneTitle>
                </div>
            
                <form onSubmit={handleSubmit} method="POST">
                    
                    {/* email input start */}
                    <div className="user-details">
                        <div className="input-box">
                            <TextInPage><small>
                            <span className="details">Email</span>
                            </small></TextInPage>    
                            <input 
                            type="text"
                            name="userEmail"
                            id="userEmail"
                            ref={emailRef}
                            required 
                            placeholder="E.g. example@mail.com">
                            </input>
                        </div>
                    </div>
                    {/* name input start */}
                    <div className="user-details">
                        <div className="input-box">
                            <TextInPage><small>
                            <span className="details">Password</span>
                            </small></TextInPage>
                            <input 
                            type="password"
                            name="userPassword"
                            id="userPassword"
                            ref={passwordRef}
                            required>
                            </input>
                        </div>
                    </div>
                    
                <Marginer direction="vertical" margin={24} />
                <button
                    className="Button-primary Button-wide"
                    type="submit"
                    disabled={loading}
                    >Log In
                </button>
                <Marginer direction="vertical" margin={40} />
                </form>
            </div>
        <div className="login-container">
            <small>
            Don't have an account?&nbsp;
                <Link to="signUp" className="reg-link" style={{color:"white"}}>
                    Sign up
                </Link>
            </small>
        </div>
    </PageContainer>
);
}