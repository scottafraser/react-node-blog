import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";

import { Home } from "../../components";
import { Contacts } from "../../components";

const App = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contacts" component={Contacts} />
    </Switch>
  );
};

export default withRouter(App);
