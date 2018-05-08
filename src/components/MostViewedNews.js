import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';

class MostViewedNews extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    mostViewedNews: state.news.mostViewedNews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetMostViewedNews: itemNumber =>
      dispatch(actions.getMostViewedNews(itemNumber))
  };
};

export default connect(mapStateToProps)(MostViewedNews);
