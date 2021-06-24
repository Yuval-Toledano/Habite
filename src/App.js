import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {AuthProvider} from "./context/AuthContext"
import SignUp from "./containers/pages/auth/signUp";
import NewUserBegin from "./containers/pages/auth/newUserBegin";
import PageTemplate from "./containers/pages/pageTemplate";
import Overview from "./containers/pages/overview";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={SignUp}/>
          <Route path="/newUser" exact component={NewUserBegin} />
          <PageTemplate>
            <Route path="overview" exact component={Overview}/>
          </PageTemplate>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
