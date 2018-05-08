import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Segment,
  Header,
  Image,
  Icon,
  Container
} from "semantic-ui-react";

import * as actions from "../store/actions/index";
import MediaParagraphPNG from "../assets/images/media-paragraph.png";
import ParagraphPNG from "../assets/images/paragraph.png";
import Aux from "../hoc/Aux";

class News extends Component {
  componentWillMount() {
    this.props.onGetAllNews(1, 6);
  }

  render() {
    return (
      <Aux>
        <Grid.Column className="NewsColumn">
          <Segment className="NewsSegment" basic>
            <Header as="h3">TIN TỨC MỚI NHẤT</Header>
            {this.props.isNewsLoading === false && (
              <div>
                <Image
                  verticalAlign="top"
                  floated="left"
                  size="small"
                  as="a"
                  href={"/news/" + this.props.news.data[0]._id}
                  src={this.props.news.data[0].image}
                />
                <Header
                  className="NewsHeadline"
                  size="tiny"
                  as="a"
                  href={"/news/" + this.props.news.data[0]._id}
                >
                  {this.props.news.data[0].headLines}
                </Header>
                <div>{this.props.news.data[0].brief}</div>
              </div>
            )}
            {(this.props.isNewsLoading === true ||
              this.props.news.data.length == 0) && <Image src={ParagraphPNG} />}
          </Segment>
          <Segment className="NewsSegment" basic>
            {this.props.isNewsLoading === false && (
              <div>
                <div>
                  <Icon color="blue" name="newspaper" />
                  <Header
                    className="NewsHeadline"
                    size="tiny"
                    as="a"
                    href={"/news/" + this.props.news.data[1]._id}
                  >
                    {this.props.news.data[1].headLines}
                  </Header>
                </div>
                &nbsp;
                <div>
                  <Icon color="blue" name="newspaper" />
                  <Header
                    className="NewsHeadline"
                    size="tiny"
                    as="a"
                    href={"/news/" + this.props.news.data[2]._id}
                  >
                    {this.props.news.data[2].headLines}
                  </Header>
                </div>
              </div>
            )}
            {(this.props.isNewsLoading === true ||
              this.props.news.data.length == 0) && <Image src={ParagraphPNG} />}
          </Segment>
        </Grid.Column>
        <Grid.Column className="NewsColumn">
          <Grid.Row>
            <Segment className="NewsSegment" basic>
              <Header as="h3">&nbsp;</Header>
              {this.props.isNewsLoading === false && (
                <div style={{ display: "table" }}>
                  <Image
                    as="a"
                    verticalAlign="middle"
                    floated="left"
                    size="tiny"
                    src={this.props.news.data[3].image}
                    href={"/news/" + this.props.news.data[3]._id}
                  />
                  <Header
                    as="a"
                    className="NewsHeadline"
                    size="tiny"
                    href={"/news/" + this.props.news.data[3]._id}
                  >
                    {this.props.news.data[3].headLines}
                  </Header>
                </div>
              )}
              {(this.props.isNewsLoading === true ||
                this.props.news.data.length == 0) && (
                <Image size="medium" src={MediaParagraphPNG} />
              )}
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Segment className="NewsSegment" basic>
              {this.props.isNewsLoading === false && (
                <div style={{ display: "table" }}>
                  <Image
                    as="a"
                    verticalAlign="middle"
                    floated="left"
                    size="tiny"
                    href={"/news/" + this.props.news.data[4]._id}
                    src={this.props.news.data[4].image}
                  />
                  <Header
                    as="a"
                    className="NewsHeadline"
                    size="tiny"
                    href={"/news/" + this.props.news.data[4]._id}
                  >
                    {this.props.news.data[4].headLines}
                  </Header>
                </div>
              )}
              {(this.props.isNewsLoading === true ||
                this.props.news.data.length == 0) && (
                <Image size="medium" src={MediaParagraphPNG} />
              )}
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Segment className="NewsSegment" basic>
              {this.props.isNewsLoading === false && (
                <div style={{ display: "table" }}>
                  <Image
                    as="a"
                    verticalAlign="middle"
                    floated="left"
                    size="tiny"
                    src={this.props.news.data[5].image}
                    href={"/news/" + this.props.news.data[5]._id}
                  />
                  <Header
                    as="a"
                    className="NewsHeadline"
                    size="tiny"
                    href={"/news/" + this.props.news.data[5]._id}
                  >
                    {this.props.news.data[5].headLines}
                  </Header>
                </div>
              )}
              {(this.props.isNewsLoading === true ||
                this.props.news.data.length == 0) && (
                <Image size="medium" src={MediaParagraphPNG} />
              )}
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Container fluid textAlign="right">
              <a href="/news">
                <Icon name="long arrow right" size="small" />
                <i>Xem tiếp</i>
              </a>
            </Container>
          </Grid.Row>
        </Grid.Column>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news.news,
    isNewsLoading: state.news.newsLoading,
    currentNews: state.news.currentNews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllNews: (pageIndex, itemPerPage) =>
      dispatch(actions.getAllNews(pageIndex, itemPerPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
