import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import community from "./components/community/community";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/community" component={community} />
    </Switch>
  </BrowserRouter>
);
export default Routes;