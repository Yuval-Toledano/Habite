import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./containers/pages/auth/signUp";
import NewUserBegin from "./containers/pages/auth/newUserBegin";
import PageTemplate from "./containers/pages/pageTemplate";
import Overview from "./containers/pages/overview";
import ChallengePage from "./containers/pages/challenges";
import ProgressPage from "./containers/pages/progress";
import { HomePage } from "./containers/pages/landingPage/homePage";
import SignIn from "./containers/pages/auth/signIn";
import { MobileLanding } from "./containers/mobile/landing";
import { StyleExamples } from "./containers/mobile/style_examples";
import SignUpJG from "./containers/pages/auth/SignUpJG";
import MobileHomeTemplate from "./containers/mobile/MobileHomeTemplate";
import MobileOverview from "./containers/mobile/MobileOverview";
import MobileChallenges from "./containers/mobile/MobileChallenges";
import MobileAchievements from "./containers/mobile/MobileAchievements";
import MobileRules from "./containers/mobile/Rules";
import Teal from "./components/svgs/mobileBackgrounds/Teal.svg";
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"
import MobileSignUpNG from "./containers/mobile/auth/MobileSignUp"
import MobileSignUpJG from "./containers/mobile/auth/MobileSignUpJG"
import MobileNewUserBegin from "./containers/mobile/auth/MobileNewUser"
import NewSignUp from "./containers/pages/auth/NewSignUp"
import MobileNewSignUp from "./containers/mobile/auth/MobileTestSignUp.jsx"
import Login from "./containers/pages/auth/NewLogIn";
import NewSignUpJG from "./containers/pages/auth/NewSignUpJG";

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

function App() {
  var dimentions = useWindowDimensions();

  if (dimentions.width < 500) {
    // needs to be the mobile routing!!!
    return (
      <Router>
        <AuthProvider>
          <Switch>
          <Route exact path="/" component={MobileLanding} />
            <Route path="/signup" exact component={NewSignUp} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup/:groupId" component={NewSignUpJG}/>
            <MobileHomeTemplate>
              <Route exact path="/mobile/overview" component={MobileOverview} />
              <Route
                exact
                path="/mobile/challenges"
                component={MobileChallenges}
              />
              <Route
                exact
                path="/mobile/achievements"
                component={MobileAchievements}
              />
              <Route exact path="/mobile/rulesOfGame" component={MobileRules} />
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
          <Route path="/signup" exact component={NewSignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup/:groupId" component={NewSignUpJG}/>
          <PageTemplate>
            <Route path="/user/overview" exact component={Overview}/>
            <Route path="/user/challenges" exact component={ChallengePage} />
            <Route path="/user/progress" exact component={ProgressPage} />
          </PageTemplate>
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
