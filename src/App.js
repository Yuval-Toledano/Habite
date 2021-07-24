import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import SignUpNG from "./containers/pages/auth/SignUpNG";
import SignUpJG from "./containers/pages/auth/SignUpJG";
import Login from "./containers/pages/auth/LogIn";
import PrivateRoute from "./components/privateRoute/privateRoute";
import NotFoundPage from "./containers/pages/NotFoundPage";

/****************** WINDOW DIMENSIONS ******************/

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

/**
 * custom hook to make the app responsive
 */
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

/****************** HABITE APP ******************/

/**
 * The main App component, provide an entry into the App
 */
function App() {
  const ValidPaths = [
    "/",
    "/signup",
    "/login",
    "/signup/:groupId",
    "/overview",
    "/challenges",
    "/progress",
    "/rulesOfGame",
    "/styling"
  ];

  const currPath = window.location.pathname;
  var dimensions = useWindowDimensions();

  if ((ValidPaths.indexOf(currPath) > -1) || (currPath.includes("/signup/"))) {
    //mobile
    if (dimensions.width < 500) {
      return (
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={MobileLanding} />
              <Route path="/signup" exact component={SignUpNG} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup/:groupId" component={SignUpJG} />
              <MobileHomeTemplate>
                <PrivateRoute exact mode="white" path="/overview" component={MobileOverview} />
                <PrivateRoute exact path="/challenges" component={MobileChallenges} mode="black" />
                <PrivateRoute exact path="/progress" component={MobileAchievements} mode="white" />
                <Route exact path="/rulesOfGame" component={MobileRules} mode="black" />
              </MobileHomeTemplate>
            </Switch>
          </AuthProvider>
        </Router>
      );

      // web
    } else {
      return (
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/styling" component={StyleExamples} />
              <Route path="/signup" exact component={SignUpNG} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup/:groupId" component={SignUpJG} />
              <PageTemplate>
                <PrivateRoute path="/overview" exact component={Overview} />
                <PrivateRoute
                  path="/challenges"
                  exact
                  component={ChallengePage}
                />
                <PrivateRoute path="/progress" exact component={ProgressPage} />
              </PageTemplate>
            </Switch>
          </AuthProvider>
        </Router>
      );
    }

    //invalid path
  } else {
    return (
      <Router>
        <Switch>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
