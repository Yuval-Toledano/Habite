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
import SignUpJG from "./containers/pages/auth/SignUpJG";


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
            <Route path="/" exact component={HomePage} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" component={SignUp}/>
            <Route path="/newUser" exact component={NewUserBegin} />
            <Route exact path="/signup/:groupId" component={SignUpJG}/>
            <PageTemplate>
              <Route path="/user/overview" exact component={Overview}/>
              <Route path="/user/challenges" exact component={ChallengePage} />
            </PageTemplate>
          </Switch>
        </AuthProvider>
      </Router>
    );
    // needs to be the mobile routing!!!
  } else {
    return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={HomePage} />
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
