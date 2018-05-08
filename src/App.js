import React, { Component } from "react";
import { Switch } from "react-router";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import * as actions from "./store/actions/index";
import ChatBotLayout from "./components/ChatbotLayout/ChatBotLayout";
import MenuLayout from "./components/MenuLayout";
import RedirectToHome from "./components/RedirectToHome";
import AboutPage from "./containers/AboutPage";
import HomePage from "./containers/HomePage";
import LawDetailPage from "./containers/LawDetailPage";
import NewsDetailPage from "./containers/NewsDetailPage";
import NewsPage from "./containers/NewsPage";
import NotFoundPage from "./containers/NotFoundPage";
import SavedPage from "./containers/SavedPage";
import SearchPage from "./containers/SearchPage";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccount: null,
      activeMenuItem: "",
      isMenuVisible: true
    };
    console.log(this.props);
  }

  componentWillMount() {
    // console.log(window.location.href);
    var currentURL = window.location.href.split("/");
    // console.log(currentURL);
    this.setState({
      activeMenuItem: currentURL[3]
    });
    // this.props.onGetAllSteps();
    this.props.onTryAutoSignIn();
  }

  componentWillUpdate() {
    var currentURL = window.location.href.split("/");
    if (currentURL[3] != this.state.activeMenuItem) {
      this.setState({
        activeMenuItem: currentURL[3]
      });
    }
  }

  handleMenuVisibility(isMenuVisible) {
    this.setState({
      isMenuVisible: isMenuVisible,
      activeMenuItem: ""
    });
  }

  handleMenuItemClick(menuItemName) {
    this.setState({
      activeMenuItem: menuItemName
    });
  }

  handleUrlChange = uri => {
    this.props.history.push(uri);
  };

  render() {
    return (
      <div className="App">
        <MenuLayout
          handleMenuItemClick={this.handleMenuItemClick.bind(this)}
          activeMenuItem={this.state.activeMenuItem}
          isMenuVisible={this.state.isMenuVisible}
        />
        <Switch>
          <Route exact path="/" component={RedirectToHome} />
          <Route
            exact
            path="/home"
            render={() => <HomePage history={this.state.history} />}
          />
          <Route exact path="/search" render={() => <SearchPage />} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news/:id" component={NewsDetailPage} />
          <Route exact path="/search/:id" component={LawDetailPage} />
          <Route exact path="/saved" render={() => <SavedPage />} />
          <Route
            render={() => (
              <NotFoundPage
                handleMenuVisibility={this.handleMenuVisibility.bind(this)}
              />
            )}
          />
        </Switch>
        <ChatBotLayout handleUrlChange={this.handleUrlChange} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
