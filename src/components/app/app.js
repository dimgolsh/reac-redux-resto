import React from "react";
import { MainPage, CartPage, ItemPage } from "../pages";
import AppHeader from "../app-header";
import WithRestoService from "../hoc";
import { Route, Switch } from "react-router-dom";

import Background from "./food-bg.jpg";

const App = ({ RestoService }) => {
  console.log(RestoService.getMenuItems());
  return (
    <div
      style={{ background: `url(${Background}) center center/cover no-repeat` }}
      className="app"
    >
      <AppHeader totalPrice={50} />
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/cart" component={CartPage} exact />
        <Route path="/:id" component={ItemPage} exact />
      </Switch>
    </div>
  );
};




export default WithRestoService()(App);
