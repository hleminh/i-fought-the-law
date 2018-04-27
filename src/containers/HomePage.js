import React, { Component } from "react";
import { connect } from "react-redux";
import Dotdotdot from "react-clamp-lines";

import SearchBar from "../components/SearchBar";
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
  Icon
} from "semantic-ui-react";
import MediaParagraphPNG from "../assets/images/media-paragraph.png";
import ParagraphPNG from "../assets/images/paragraph.png";
import * as actions from "../store/actions/index";
import FooterLayout from "../components/FooterLayout";

class HomePage extends Component {
  pageIndex = 1;
  itemPerPage = 10;

  componentDidMount() {
    this.props.onGetAllNews(1, 6);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.chapters !== this.props.chapters) {
      nextProps.onGetChapterDetail(
        nextProps.chapters[0],
        this.pageIndex,
        this.itemPerPage
      );
    }
  }

  handleChapterSelect(e, { id, chapter }) {
    this.props.onGetChapterDetail(chapter, this.pageIndex, this.itemPerPage);
    console.log(chapter);
  }

  handlePageSelect(e, { name }) {
    console.log(name);
    console.log(this.props.news);
  }

  render() {
    // const chapterList = this.props.chapters.map(chapter => (
    //   <Menu.Item
    //     id={chapter.id}
    //     chapter={chapter}
    //     onClick={this.handleChapterSelect.bind(this)}
    //   >
    //     Chương {chapter.order} : {chapter.title}
    //   </Menu.Item>
    // ));

    // const articleList = this.props.articles.map(article => (
    //   <Table.Row id={article.id}>
    //     <Table.Cell>
    //       <Dotdotdot
    //         buttons={false}
    //         lines="3"
    //         ellipsis="..."
    //         text={article.order}
    //       />
    //     </Table.Cell>
    //     <Table.Cell>
    //       <Dotdotdot
    //         buttons={false}
    //         lines="3"
    //         ellipsis="..."
    //         text={article.title}
    //       />
    //     </Table.Cell>
    //     <Table.Cell>
    //       <Dotdotdot
    //         buttons={false}
    //         lines="3"
    //         ellipsis="..."
    //         text={article.content}
    //       />
    //     </Table.Cell>
    //   </Table.Row>
    // ));

    return (
      <div className="Body">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <SearchBar
                        keyword={this.props.keyword}
                        handleSearchSubmit={this.props.handleSearchSubmit}
                        onCategoryChange={this.props.onCategoryChange}
                        category={this.props.category}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="NewsColumn">
                      <Segment className="NewsSegment" basic>
                        <Header as="h3">TIN TỨC MỚI NHẤT</Header>
                        {this.props.isNewsLoading == false && (
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
                        {this.props.isNewsLoading == true && (
                          <Image src={ParagraphPNG} />
                        )}
                      </Segment>
                      <Segment className="NewsSegment" basic>
                        {this.props.isNewsLoading == false && (
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
                        {this.props.isNewsLoading == true && (
                          <Image src={ParagraphPNG} />
                        )}
                      </Segment>
                    </Grid.Column>
                    <Grid.Column className="NewsColumn">
                      <Grid.Row>
                        <Segment className="NewsSegment" basic>
                          <Header as="h3">&nbsp;</Header>
                          {this.props.isNewsLoading == false && (
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
                          {this.props.isNewsLoading == true && (
                            <Image size="medium" src={MediaParagraphPNG} />
                          )}
                        </Segment>
                      </Grid.Row>
                      <Grid.Row>
                        <Segment className="NewsSegment" basic>
                          {this.props.isNewsLoading == false && (
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
                          {this.props.isNewsLoading == true && (
                            <Image size="medium" src={MediaParagraphPNG} />
                          )}
                        </Segment>
                      </Grid.Row>
                      <Grid.Row>
                        <Segment className="NewsSegment" basic>
                          {this.props.isNewsLoading == false && (
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
                          {this.props.isNewsLoading == true && (
                            <Image size="medium" src={MediaParagraphPNG} />
                          )}
                        </Segment>
                      </Grid.Row>
                      <Grid.Row>
                        <Container fluid textAlign="right">
                          <a href="/news/">
                            <Icon name="long arrow right" size="small" />
                            <i>Xem tiếp</i>
                          </a>
                        </Container>
                      </Grid.Row>
                    </Grid.Column>
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
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {/* <Advertisement centered unit="top banner" test="Top Banner" /> */}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <Card fluid>
                  <Card.Header textAlign="center" className="BlockHeader">
                    <Label color="blue" size="big">
                      CHƯƠNG TRA CỨU
                    </Label>
                  </Card.Header>
                  <Card.Content className="BlockContent">
                    <Menu
                      style={{
                        border: "0"
                      }}
                      fluid
                      vertical
                    >
                      {/* {this.props.isChapterListLoading ? (
                        <Loader active={this.props.isChapterListLoading} />
                      ) : (
                        chapterList
                      )} */}
                    </Menu>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card fluid>
                  <Card.Header textAlign="center" className="BlockHeader">
                    <Label color="blue" size="big">
                      DANH SÁCH ĐIỀU LUẬT
                    </Label>
                  </Card.Header>
                  <Card.Content className="BlockContent">
                    <Table
                      style={{
                        border: "0"
                      }}
                      striped
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell width={2}>STT</Table.HeaderCell>
                          <Table.HeaderCell width={5}>Tên</Table.HeaderCell>
                          <Table.HeaderCell width={9}>
                            Nội dung
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {/* {this.props.isChapterDetailLoading ? (
                          <Loader active={this.props.isChapterDetailLoading} />
                        ) : (
                          articleList
                        )} */}
                      </Table.Body>
                    </Table>
                  </Card.Content>
                </Card>
                <Menu floated="right" pagination>
                  <Menu.Item
                    name="1"
                    onClick={this.handlePageSelect.bind(this)}
                  />
                  <Menu.Item disabled>...</Menu.Item>
                  <Menu.Item
                    name="10"
                    onClick={this.handlePageSelect.bind(this)}
                  />
                  <Menu.Item
                    name="11"
                    onClick={this.handlePageSelect.bind(this)}
                  />
                  <Menu.Item
                    name="12"
                    onClick={this.handlePageSelect.bind(this)}
                  />
                </Menu>
              </Grid.Column>
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
    onGetAllNews: (pageIndex, itemPerPage) =>
      dispatch(actions.getAllNews(pageIndex, itemPerPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
