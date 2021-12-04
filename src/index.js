/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import LoginPage from "views/examples/LoginPage";
import ProfilePage from "views/examples/ProfilePage.js";
import ContactPage from "views/examples/ContactPage";
import AboutPage from "views/examples/AboutPage";
import AdvertPage from "views/examples/AdvertPage";
import OffersPage from "views/examples/OffersPage";
import AddAdvert from "views/examples/AddAdvert";
import AdvertDetailsPage from "views/examples/AdvertDetailsPage";
import ChatPage from "views/examples/ChatPage";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/components"
        render={(props) => <LandingPage {...props} />}
      />
      <Route path="/anasayfa" render={(props) => <LandingPage {...props} />} />
      <Route path="/kayit" render={(props) => <RegisterPage {...props} />} />
      <Route path="/giris" render={(props) => <LoginPage {...props} />} />
      <Route path="/bize-ulas" render={(props) => <ContactPage {...props} />} />
      <Route path="/hakkimizda" render={(props) => <AboutPage {...props} />} />
      <Route path="/ilanlarim" render={(props) => <AdvertPage {...props} />} />
      <Route
        path="/tekliflerim"
        render={(props) => <OffersPage {...props} />}
      />
      <Route path="/ilan-ekle" render={(props) => <AddAdvert {...props} />} />
      <Route
        path="/ilan-detaylari"
        render={(props) => <AdvertDetailsPage {...props} />}
      />
      <Route
        path="/sohbet"
        render={(props) => <ChatPage {...props} />}
      />
      <Redirect from="/" to="/anasayfa" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
