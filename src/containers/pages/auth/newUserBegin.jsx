import { Email } from '@material-ui/icons';
import React, {useRef, useState} from 'react';
import {Link, withRouter, useHistory, useLocation} from "react-router-dom";
import {TextInPage, StandAloneTitle, IndicationText } from "../../../components/designSystem/common";
import {PageContainer, InnerPageContainer} from "../../../components/pageContainers/pageContainer"
import {useAuth} from "../../../context/AuthContext";


export default function NewUserBegin(props) {
  //const [email, setEmail] = useState()
  //const password = location.state.password
  //const typeSignUp = location.state.type
      
  const nameRef = useRef();
  const imageRef = useRef();
  const {updateUserInfo, forceRender, signUpNG, signUpJG} = useAuth();

  const history = useHistory();
  const location = useLocation()
    
    
    // The function handles submit form
    async function handleSubmit(event) {
        event.preventDefault();
        
        if (location.state.type === 'NG'){
          await signUpNG(location.state.userMail, location.state.password, nameRef.current.value, imageRef.current.value);
        }
        else {
          await signUpJG(location.state.userMail, location.state.password, location.state.groupID, nameRef.current.value, imageRef.current.value)
        }
        //await updateUserInfo(nameRef.current.value, imageRef.current.value)
        history.push("/overview")
    }

    return (
        <PageContainer flexDirection="row">
          <InnerPageContainer className="fly-above cover-all justify-content-center" display="grid" background="rgba(0,0,0,0.4)">
            {/* <div className='pageAuth d-flex justify-content-center align-self-center' id='wrapper'> */}
            {/* TODO: add here a rendering of the logo (white) */}
            <div className="rounded p-4 bg-offwhite">
              <div className="page-headline justify-content-start">
                <div><TextInPage>Welcome,</TextInPage></div>
                <div><StandAloneTitle>Tell us a bit about yourself</StandAloneTitle></div>
                <div><IndicationText>This will help us personalize your experience</IndicationText></div>
    
              </div>
              {/* forms wrapper start */}
              <div className="forms mt-4">
                <div className="">
                  {/* TODO: here was an error div */}
                  {/* form - name and motivation adding */}
                  <form >
                    {/* name input start */}
                    <div className="form-group mb-2">
                      <label htmlFor="name" className="form-label">
                        <TextInPage><small>What's your name?</small></TextInPage>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        name="userName"
                        placeholder=""
                        id="userName"
                        ref={nameRef}
                      />
                    </div>
                    {/* name input end */}
                    {/* motivation input start */}
                    <div className="form-group mb-2">
                      <label htmlFor="userMotivationn" className="form-label">
                        <TextInPage><small>What’s your motivation to changing your habit?</small></TextInPage>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        name="userMotivation"
                        placeholder="I'm here because..."
                        id="userMotivation"
                      />
                    </div>
                    {/* motivation input end */}
                    {/* profile picture input start */}
                    <div className="form-group mb-2">
                      <label htmlFor="userProfilePic" className="form-label">
                        <TextInPage><small>Profile picture</small></TextInPage>
                      </label>
                      <input
                        type="file"
                        className="form-control rounded-pill"
                        name="userProfilePic"
                        placeholder=""
                        id="userProfilePic"
                        ref={imageRef}
                      />
                    </div>
                    {/* profile picture input end */}
    
                    {/* willing check start */}
                    <div className="form-group mb-2">
                      <input
                        type="checkbox"
                        className=""
                        name="userAgreement"
                        id="userAgreement"
                      />
                      <label htmlFor="userAgreement" className="form-label">
                        <TextInPage><small>&nbsp;Yes! I’m willing to change my sugar intake habits!</small></TextInPage>
                      </label>
                    </div>
                    {/* willing check end */}
    
                    {/* cta button start */}
                    <button
                      className="Button-primary float-md-end" onClick={handleSubmit}>
                      Continue
                    </button>
                    {/* cta button end */}
                  </form>
                  {/* form - name and motivation adding */}
    
                </div>
              </div>
              {/* forms wrapper end */}
            </div>
          </InnerPageContainer>
        </PageContainer>
      );
}