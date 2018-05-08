import React, { Component } from 'react';
import Dotdotdot from 'react-clamp-lines';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  Card,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Loader,
  Pagination
} from 'semantic-ui-react';
import ParagraphPNG from '../assets/images/paragraph.png';
import FooterLayout from '../components/FooterLayout';
import MostViewedNews from '../components/MostViewedNews';
import * as actions from '../store/actions/index';


class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemPerPage: 10,
      pageIndex: 1
    };
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).scrollTop = 0;
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollTop = 0;
  }

  onPageIndexClick(e, { activePage }) {
    this.setState({ pageIndex: activePage }, () => {
      this.props.onGetAllNews(this.state.pageIndex, this.state.itemPerPage);
    });
  }

  onPerPageChange(e, { value }) {
    this.setState({ itemPerPage: value, pageIndex: 1 }, () => {
      this.props.onGetAllNews(this.state.pageIndex, this.state.itemPerPage);
    });
  }

  componentWillMount() {
    this.props.onGetAllNews(this.state.pageIndex, this.state.itemPerPage);
  }

  render() {
    var options = [
      { text: '5 văn bản', value: 5 },
      { text: '10 văn bản', value: 10 },
      { text: '15 văn bản', value: 15 },
      { text: '20 văn bản', value: 20 },
      { text: '25 văn bản', value: 25 }
    ];

    var newsList = [];
    if (this.props.isNewsLoading == false) {
      newsList = this.props.news.data.map(news => (
        <Grid.Row key={news._id}>
          <Card fluid>
            <Card.Content>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column
                    stretched={true}
                    verticalAlign="middle"
                    width={6}
                  >
                    <Image
                      as="a"
                      href={'/news/' + news._id}
                      src={news.image}
                      bordered
                    />
                  </Grid.Column>
                  <Grid.Column width={10} verticalAlign="middle">
                    <Grid>
                      <Grid.Row>
                        <Grid.Column textAlign="right">
                          <Icon
                            size="small"
                            name="calendar outline"
                            color="blue"
                          />
                          <span style={{ fontSize: '12px' }}>
                            {news.publishedDate}
                          </span>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={{ paddingTop: '0' }}>
                        <Grid.Column>
                          <Header
                            className="NewsHeadline"
                            size="medium"
                            as="a"
                            style={{
                              marginTop: '7px',
                              marginBottom: '7px'
                            }}
                            href={'/news/' + news._id}
                          >
                            {news.headLines}
                          </Header>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={{ padding: '0' }}>
                        <Grid.Column>
                          <Dotdotdot
                            buttons={false}
                            lines="3"
                            text={news.brief}
                            ellipsis="..."
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column textAlign="right">
                          <a href={'/news/' + news._id}>
                            <Icon name="long arrow right" size="small" />
                            <i>Xem tiếp</i>
                          </a>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
                  <Grid.Row>
                    <Container fluid>
                      <span>
                        Hiển thị:{' '}
                        <Dropdown
                          value={this.state.itemPerPage}
                          selection
                          options={options}
                          onChange={this.onPerPageChange.bind(this)}
                        />
                      </span>
                      <Pagination
                        floated="right"
                        activePage={this.state.pageIndex}
                        totalPages={Math.ceil(
                          this.props.newsCount / this.state.itemPerPage
                        )}
                        onPageChange={this.onPageIndexClick.bind(this)}
                        ellipsisItem={{
                          content: <Icon name="ellipsis horizontal" />,
                          icon: true
                        }}
                        firstItem={{
                          content: <Icon name="angle double left" />,
                          icon: true
                        }}
                        lastItem={{
                          content: <Icon name="angle double right" />,
                          icon: true
                        }}
                        prevItem={{
                          content: <Icon name="angle left" />,
                          icon: true
                        }}
                        nextItem={{
                          content: <Icon name="angle right" />,
                          icon: true
                        }}
                      />
                    </Container>
                  </Grid.Row>
                  <Grid.Row />
                </Grid>
              </Grid.Column>
              <Grid.Column width={1} />
              <Grid.Column width={4}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <MostViewedNews/>
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
    newsCount: state.news.newsCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllNews: (pageIndex, itemPerPage) =>
      dispatch(actions.getAllNews(pageIndex, itemPerPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
