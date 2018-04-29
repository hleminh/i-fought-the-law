import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import MenuLayout from './components/MenuLayout';
import ChatBotLayout from './components/ChatbotLayout/ChatBotLayout';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import RedirectToHome from './components/RedirectToHome';
import HomePage from './containers/HomePage';
import SearchPage from './containers/SearchPage';
import AboutPage from './containers/AboutPage';
import SavedPage from './containers/SavedPage';
import NewsPage from './containers/NewsPage';
import NewsDetailPage from './containers/NewsDetailPage';
import LawDetailPage from './containers/LawDetailPage';
import NotFoundPage from './containers/NotFoundPage';
import update from 'react-addons-update';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccount: null,
      activeMenuItem: '',
      isMenuVisible: true
    };
  }

  componentWillMount() {
    // console.log(window.location.href);
    var currentURL = window.location.href.split('/');
    // console.log(currentURL);
    this.setState({
      activeMenuItem: currentURL[3]
    });
  }

  handleMenuVisibility(isMenuVisible) {
    this.setState({
      isMenuVisible: isMenuVisible,
      activeMenuItem: ''
    });
  }

  handleMenuItemClick(menuItemName) {
    this.setState({
      activeMenuItem: menuItemName
    });
  }

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
          <Route exact path="/home" render={() => <HomePage />} />
          <Route exact path="/search" render={() => <SearchPage />} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news/:id" component={NewsDetailPage} />
          <Route exact path="/laws/:id" component={LawDetailPage}/>
          <Route exact path="/saved" render={() => <SavedPage />} />
          <Route
            render={() => (
              <NotFoundPage
                handleMenuVisibility={this.handleMenuVisibility.bind(this)}
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
