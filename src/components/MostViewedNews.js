import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Label,
  Image,
  Dimmer,
  Loader,
  Grid,
  Header,
  Popup
} from 'semantic-ui-react';
import Aux from '../hoc/Aux';
import ParagraphPNG from '../assets/images/paragraph.png';
import * as actions from '../store/actions/index';

class MostViewedNews extends Component {
  componentWillMount() {
    this.props.onGetMostViewedNews(6);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.mostViewedNews.length > 0) {
      if (this.props.excludeId) {
        let index = nextProps.mostViewedNews.findIndex(
          obj => obj._id === this.props.excludeId
        );
        if (index != null) {
          nextProps.mostViewedNews.splice(index, 1);
        } else {
          nextProps.mostViewedNews.splice(5, 1);
        }
      } else {
        nextProps.mostViewedNews.splice(5, 1);
      }
    }
  }

  render() {
    let mainContent = this.props.mostViewedNews.map(newEle => (
      <Grid.Row
        style={{ paddingBottom: '10px', paddingTop: '10px' }}
        key={newEle._id}
      >
        <Grid.Column>
          <Grid.Row>
            <Image
              as="a"
              verticalAlign="middle"
              size="medium"
              src={newEle.image}
              href={'/news/' + newEle._id}
            />
          </Grid.Row>
          <Grid.Row>
            <Popup
              position="left center"
              trigger={
                <Header
                  as="a"
                  className="NewsHeadline"
                  size="tiny"
                  href={'/news/' + newEle._id}
                >
                  {newEle.headLines}
                </Header>
              }
            >
              <Popup.Content>{newEle.brief}</Popup.Content>
            </Popup>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    ));
    return (
      <Card fluid color="teal">
        <Card.Header textAlign="center" className="BlockHeader">
          <Label color="blue" size="large">
            Tin tức được xem nhiều
          </Label>
        </Card.Header>
        <Card.Content>
          {this.props.loading && (
            <Aux>
              <Dimmer active inverted>
                <Loader inverted content="Đang tải" />
              </Dimmer>
              <Image src={ParagraphPNG} />
            </Aux>
          )}
          {mainContent}
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    mostViewedNews: state.news.mostViewedNews,
    loading: state.news.mostViewedLoading,
    mostViewedError: state.news.mostViewedError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetMostViewedNews: itemNumber =>
      dispatch(actions.getMostViewedNews(itemNumber))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MostViewedNews);
