import React, { Component } from "react";
import "./App.css";
import $ from "jquery";
import MenuLayout from "./components/MenuLayout";
import ChatBotLayout from "./components/ChatbotLayout/ChatBotLayout";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import RedirectToHome from "./components/RedirectToHome";
import HomePage from "./containers/HomePage";
import SearchPage from "./containers/SearchPage";
import AboutPage from "./containers/AboutPage";
import SavedPage from "./containers/SavedPage";
import NewsPage from "./containers/NewsPage";
import NewsDetailPage from "./containers/NewsDetailPage";
import update from "react-addons-update";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccount: null
    };
  }

  

  render() {
    return (
      <div className="App">
        <MenuLayout
          
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomePage userAccount={this.state.userAccount} />}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <SearchPage
              />
            )}
          />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news/:id" component={NewsDetailPage} />
          <Route
            exact
            path="/saved"
            render={() => (
              <SavedPage
              />
            )}
          />
        </Switch>
        <ChatBotLayout />
      </div>
    );
  }
}

export default App;