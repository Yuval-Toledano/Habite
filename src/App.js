import React from "react";
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signin" exact component={SignIn} />
          <Route exact path="/signup" component={SignUp}/>
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
}

export default App;
