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

  handleSignUpSubmit(credentials, callback) {
    // console.log(credentials);
    var oldData = credentials;
    $.ajax({
      url: "/user/register",
      type: "POST",
      context: this,
      data: credentials,
      success: function(result) {
        callback(true, null);
      },
      error: function(result) {
        callback(false, oldData);
      }
    });
  }

  handleSignInSubmit(credentials, callback) {
    // console.log(credentials);
    var oldData = credentials;
    $.ajax({
      url: "/user/login",
      type: "POST",
      context: this,
      data: credentials,
      success: function(result) {
        this.setState({ userAccount: result }, () => {
          $.ajax({
            url: "/user/get/" + this.state.userAccount.user._id,
            type: "GET",
            context: this,
            success: function(nestedResult) {
              // console.log(nestedResult);
              var trueNestedResult = [];
              for (var element in nestedResult) {
                trueNestedResult.push(nestedResult[element].item);
              }
              this.setState({ savedList: trueNestedResult }, () => {
                callback(true, null);
              });
            },
            error: function(nestedResult) {
              callback(false, oldData);
            }
          });
        });
        // console.log(result);
      },
      error: function(result) {
        callback(false, oldData);
      }
    });
  }

  handleSignOutSubmit(credentials, callback) {
    this.setState({ userAccount: "" });
  }

  handleSaveSubmit(entry, callback) {
    // console.log(entry);
    entry.kind = this.state.category;
    // console.log(entry);
    $.ajax({
      url: "/user/save/" + this.state.userAccount.user._id,
      type: "POST",
      context: this,
      data: entry,
      success: function(result) {
        // console.log('save submit result ', result);
        this.setState(
          {
            savedList: update(this.state.savedList, { $push: [entry] }),
            userAccount: update(this.state.userAccount, {
              user: { $set: result }
            })
          },
          () => {
            // console.log(this.state.savedList);
            callback(true, null);
          }
        );
      },
      error: function(result) {
        callback(false, result);
      }
    });
  }

  handleUnSaveSubmit(entry, callback) {
    $.ajax({
      url: "/user/unsave/" + this.state.userAccount.user._id,
      type: "POST",
      context: this,
      data: entry,
      success: function(result) {
        // console.log('unsave submit result ', result);
        this.setState(
          {
            savedList: update(this.state.savedList, {
              $splice: [[this.state.savedList.indexOf(entry), 1]]
            }),
            userAccount: update(this.state.userAccount, {
              user: { $set: result }
            })
          },
          () => {
            // console.log(this.state.savedList);
            callback(true, null);
          }
        );
      },
      error: function(result) {
        callback(false, result);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <MenuLayout
          userAccount={this.state.userAccount}
          handleSignOutSubmit={this.handleSignOutSubmit.bind(this)}
          handleSignInSubmit={this.handleSignInSubmit.bind(this)}
          handleSignUpSubmit={this.handleSignUpSubmit.bind(this)}
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
                handleSaveSubmit={this.handleSaveSubmit.bind(this)}
                handleUnSaveSubmit={this.handleUnSaveSubmit.bind(this)}
                userAccount={this.state.userAccount}
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
                handleSaveSubmit={this.handleSaveSubmit.bind(this)}
                handleUnSaveSubmit={this.handleUnSaveSubmit.bind(this)}
                userAccount={this.state.userAccount}
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
