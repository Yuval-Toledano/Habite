import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {AuthProvider} from "./context/AuthContext"
import SignUp from "./containers/pages/auth/signUp";
import NewUserBegin from "./containers/pages/auth/newUserBegin";
import PageTemplate from "./containers/pages/pageTemplate";
import Overview from "./containers/pages/overview";
import ChallengePage from "./containers/pages/challenges";
import { HomePage } from "./containers/pages/landingPage/homePage";
import SignIn from "./containers/pages/auth/signIn";
import { MobileLanding } from "./containers/mobile/landing";
import { StyleExamples } from "./containers/mobile/style_examples";
import SignUpJG from "./containers/pages/auth/SignUpJG";
import MobileHomeTemplate from "./containers/mobile/MobileHomeTemplate";
import MobileOverview from "./containers/mobile/MobileOverview";
import Teal from "./components/svgs/mobileBackgrounds/Teal.svg";


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function App() {

  var dimentions = useWindowDimensions()
  
  if (dimentions.width < 500) {
    // needs to be the mobile routing!!!
    return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={MobileLanding} />
            <Route exact path="/signin" exact component={SignIn} />
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/newUser" exact component={NewUserBegin} />
            <Route exact path="/signup/:groupId" component={SignUpJG}/>
            <MobileHomeTemplate>
              { /* <Route exact path="/mobile/overview" render={(props) => <MobileHomeTemplate background={Teal} {...props} />}/> */}
              <Route exact path="/mobile/overview" exact component={MobileOverview} />
              <Route exact path="/user/challenges" exact component={ChallengePage} />
            </MobileHomeTemplate>
          </Switch>
        </AuthProvider>
      </Router>
    );
    // end of mobile routing
  } else {
    return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/styling" component={StyleExamples} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" component={SignUp}/>
            <Route path="/newUser" exact component={NewUserBegin} />
            <PageTemplate>
              <Route path="/user/overview" exact component={Overview}/>
              <Route path="/user/challenges" exact component={ChallengePage} />
            </PageTemplate>
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
  }

export default App;
