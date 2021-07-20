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
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import MobileSignUpNG from "./containers/mobile/auth/MobileSignUp";
import MobileSignUpJG from "./containers/mobile/auth/MobileSignUpJG";
import MobileNewUserBegin from "./containers/mobile/auth/MobileNewUser";

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
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={MobileSignUpNG} />
            <Route exact path="/signup/:groupId" component={MobileSignUpJG} />
            <Route exact path="/newUser" component={MobileNewUserBegin} />
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
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signup/:groupId" component={SignUpJG} />
            <Route path="/newUser" exact component={NewUserBegin} />
            <PageTemplate>
              <Route path="/user/overview" exact component={Overview} />
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
