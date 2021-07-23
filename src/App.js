import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory, useParams, Redirect } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PageTemplate from "./containers/pages/pageTemplate";
import Overview from "./containers/pages/overview";
import ChallengePage from "./containers/pages/challenges";
import ProgressPage from "./containers/pages/progress";
import { HomePage } from "./containers/pages/landingPage/homePage";
import { MobileLanding } from "./containers/mobile/landing";
import { StyleExamples } from "./containers/mobile/style_examples";
import MobileHomeTemplate from "./containers/mobile/MobileHomeTemplate";
import MobileOverview from "./containers/mobile/MobileOverview";
import MobileChallenges from "./containers/mobile/MobileChallenges";
import MobileAchievements from "./containers/mobile/MobileAchievements";
import MobileRules from "./containers/mobile/Rules";
import NewSignUp from "./containers/pages/auth/NewSignUp";
import Login from "./containers/pages/auth/NewLogIn";
import NewSignUpJG from "./containers/pages/auth/NewSignUpJG";
import NotFoundPage from "./containers/pages/NotFoundPage";

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
            <Route exact path="/signup" exact component={NewSignUp} />
            <Route exact path="/login" exact component={Login} />
            <Route exact path="/signup/:groupId" component={NewSignUpJG} />
            <MobileHomeTemplate>
              <Route
                exact
                mode="white"
                path="/overview"
                component={MobileOverview}
              />
              <Route
                exact
                path="/challenges"
                component={MobileChallenges}
                mode="black"
              />
              <Route
                exact
                path="/achievements"
                component={MobileAchievements}
                mode="white"
              />
              <Route
                exact
                path="/rulesOfGame"
                component={MobileRules}
                mode="black" />
            </MobileHomeTemplate>
          </Switch>
        </AuthProvider>
        {/* <Route path='/404' component={NotFoundPage} />
        <Redirect from='*' exactto='/404' /> */}
      </Router>
    );
    // end of mobile routing
  } else {
    return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route exact path="/styling" component={StyleExamples} />
            <Route exact path="/signup" exact component={NewSignUp} />
            <Route exact path="/login" exact component={Login} />
            <Route exact path="/signup/:groupId" component={NewSignUpJG} />
            <PageTemplate>
              <Route exact path="/overview" exact component={Overview} />
              <Route exact path="/challenges" exact component={ChallengePage} />
              <Route exact path="/progress" exact component={ProgressPage} />
            </PageTemplate>
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
