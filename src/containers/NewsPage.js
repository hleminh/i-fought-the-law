import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Dotdotdot from "react-clamp-lines";
import * as actions from "../store/actions/index";
import ParagraphPNG from "../assets/images/paragraph.png";

import {
  Advertisement,
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

class NewsPage extends Component {
  componentWillMount() {
    this.props.onGetAllNews();
  }

  render() {
    var newsList = [];
    if (this.props.isNewsLoading == false) {
      newsList = this.props.news.data.map(news => (
        <Grid.Row>
          <Card fluid>
            <Card.Content
              style={{
                paddingTop: "0",
                paddingBottom: "0",
                paddingLeft: "0"
              }}
            >
              <Image
                verticalAlign="top"
                floated="left"
                size="medium"
                src={news.image}
                style={{ "margin-bottom": "0" }}
              />
              <Container style={{ marginTop: "14px" }} textAlign="right" fluid>
                <Icon size="small" name="calendar outline" color="blue" />
                <span style={{ fontSize: "12px" }}>{news.publishedDate}</span>
              </Container>
              <Header
                className="NewsHeadline"
                size="medium"
                as="a"
                href={news.linkToNews}
                style={{
                  marginTop: "7px",
                  marginBottom: "7px"
                }}
              >
                {news.headLines}
              </Header>
              <Dotdotdot
                buttons={false}
                lines="3"
                text={news.brief}
                ellipsis="..."
              />
              <Container fluid textAlign="right">
                <a href={news.linkToNews}>
                  <Icon name="long arrow right" size="small" />
                  <i>Xem tiếp</i>
                </a>
              </Container>
            </Card.Content>
          </Card>
        </Grid.Row>
      ));
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
                      <Breadcrumb.Section active>
                        Tin tức pháp luật
                      </Breadcrumb.Section>
                    </Breadcrumb>
                  </Grid.Row>
                  <Grid.Row>
                    <Header as="h3">
                      TIN TỨC PHÁP LUẬT
                      <Header.Subheader>
                        <br />
                        <i>
                          Tin pháp luật, giải đáp Thông tin về các vụ án, các
                          vấn đề an ninh trật tự, phổ biến kiến thức về các vấn
                          đề thời sự pháp luật và văn bản pháp luật.
                        </i>
                      </Header.Subheader>
                    </Header>
                  </Grid.Row>
                  {this.props.isNewsLoading ? (
                    <Grid.Row>
                      <Loader active={this.props.isNewsLoading} />
                    </Grid.Row>
                  ) : (
                    newsList
                  )}
                  <Grid.Row />
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news.news,
    isNewsLoading: state.news.newsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllNews: () => dispatch(actions.getAllNews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
