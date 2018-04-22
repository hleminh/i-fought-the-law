import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Dotdotdot from "react-clamp-lines";
import * as actions from "../store/actions/index";
import ParagraphPNG from "../assets/images/paragraph.png";
import renderHTML from "react-render-html";
import FooterLayout from "../components/FooterLayout";


import {
  Card,
  Container,
  Grid,
  Segment,
  Image,
  Label,
  Loader,
  Header,
  Menu,
  Table,
  Icon,
  Breadcrumb
} from "semantic-ui-react";

class NewsDetailPage extends Component {
  componentWillMount() {
    if (this.props.news.data == null) this.props.onGetAllNews();
  }

  onNewsHeadlineClick(news) {
    this.props.onNewsHeadlineClicked(news);
  }

  render() {
    if (this.props.isNewsLoading) {
      var newsList = <Loader active={this.props.isNewsLoading} />;
    } else {
      if (this.props.currentNews == null) {
        var currentNews = this.props.news.data.filter(
          news => news._id == this.props.match.params.id
        );
        this.props.onNewsHeadlineClicked(currentNews[0]);
      }
      var newsList = [];
      var newsListData = this.props.news.data.filter(
        news => news._id !== this.props.match.params.id
      );
      newsListData = newsListData.slice(0, 4);
      if (this.props.isNewsLoading == false) {
        newsList = newsListData.map(news => (
          <Grid.Column key={news._id} width={4}>
            <Grid>
              <Grid.Row>
                <Image
                  as="a"
                  verticalAlign="middle"
                  floated="left"
                  size="medium"
                  src={news.image}
                  onClick={this.onNewsHeadlineClick.bind(this, news)}
                  href={"/news/" + news._id}
                />
              </Grid.Row>
              <Grid.Row>
                <Header
                  as="a"
                  className="NewsHeadline"
                  size="tiny"
                  onClick={this.onNewsHeadlineClick.bind(this, news)}
                  href={"/news/" + news._id}
                >
                  {news.headLines}
                </Header>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        ));
      }
    }

    return (
      <div className="Body">
        <Container>
          <Grid container={true}>
            <Grid.Row>
              <Grid.Column width={11}>
                <Grid>
                  <Grid.Row>
                    <Breadcrumb>
                      <Breadcrumb.Section link as={Link} to="/">
                        <Icon name="home" />Trang chủ
                      </Breadcrumb.Section>
                      <Breadcrumb.Divider icon="right angle" />
                      <Breadcrumb.Section link as={Link} to="/news">
                        Tin tức pháp luật
                      </Breadcrumb.Section>
                      <Breadcrumb.Divider icon="right angle" />
                      <Breadcrumb.Section active>
                        {this.props.currentNews &&
                          this.props.currentNews.headLines}
                        {!this.props.currentNews && <p>...</p>}
                      </Breadcrumb.Section>
                    </Breadcrumb>
                  </Grid.Row>
                  <Grid.Row>
                    <Card fluid>
                      <Card.Content style={{ padding: "32px" }}>
                        <Loader active={this.props.isNewsLoading} />
                        {this.props.currentNews && (
                          <div>
                            <Icon
                              size="small"
                              name="calendar outline"
                              color="blue"
                            />
                            {this.props.currentNews.publishedDate}
                            {renderHTML(this.props.currentNews.newsHtml)}
                          </div>
                        )}
                      </Card.Content>
                    </Card>
                  </Grid.Row>
                  <Grid.Row />
                  <Grid.Row>
                    <Grid.Column style={{ padding: "0" }}>
                      <Header
                        as={Link}
                        to="/news/"
                        className="NewsHeadline"
                        block
                        style={{
                          display: "block"
                        }}
                      >
                        TIN PHÁP LUẬT KHÁC
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>{newsList}</Grid.Row>
                  <Grid.Row>
                    <Container fluid textAlign="right">
                      <a href="/news/">
                        <Icon name="long arrow right" size="small" />
                        <i>Xem tiếp</i>
                      </a>
                    </Container>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={1} />
              <Grid.Column width={4}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header textAlign="center" className="BlockHeader">
                          <Label color="blue" size="big">
                            TEST
                          </Label>
                        </Card.Header>
                        <Card.Content>
                          <Image src={ParagraphPNG} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header textAlign="center" className="BlockHeader">
                          <Label color="blue" size="big">
                            TEST
                          </Label>
                        </Card.Header>
                        <Card.Content>
                          <Image src={ParagraphPNG} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header textAlign="center" className="BlockHeader">
                          <Label color="blue" size="big">
                            TEST
                          </Label>
                        </Card.Header>
                        <Card.Content>
                          <Image src={ParagraphPNG} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header textAlign="center" className="BlockHeader">
                          <Label color="blue" size="big">
                            TEST
                          </Label>
                        </Card.Header>
                        <Card.Content>
                          <Image src={ParagraphPNG} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <FooterLayout />
      </div>
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
    onGetAllNews: () => dispatch(actions.getAllNews()),
    onNewsHeadlineClicked: news => dispatch(actions.toNewsDetail(news))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetailPage);
