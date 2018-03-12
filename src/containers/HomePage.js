import React, {Component} from 'react';
import {connect} from 'react-redux';

import SearchBar from '../components/SearchBar';
import {Advertisement, Card, Container, Grid, Segment, Image, Label, Header, Menu, Table} from 'semantic-ui-react';
import MediaParagraphPNG from '../assets/images/media-paragraph.png';
import ParagraphPNG from '../assets/images/paragraph.png';
import * as actions from '../store/actions/index';
import FooterLayout from '../components/FooterLayout';

class HomePage extends Component {

  pageIndex = 1;
  itemPerPage = 10;

  componentDidMount() {
    this.props.onGetChapterList();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.chapters !== this.props.chapters) {
      nextProps.onGetChapterDetail(nextProps.chapters[0], this.pageIndex, this.itemPerPage);
    }
  }

  handleChapterSelect(e, {name}){
    console.log(name);
  }

  handlePageSelect(e, {name}){
    console.log(name);
  }

  render() {
    return (
        <div className="Body">
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width = {11}>
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
                      <Grid.Column className='NewsColumn'>
                        <Segment className="NewsSegment" basic>
                          <Header as='h3'>TEST</Header>
                          <Image src={MediaParagraphPNG}/>
                        </Segment>
                        <Segment className="NewsSegment" basic>
                          <Image src={ParagraphPNG}/>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column className='NewsColumn'>
                        <Grid.Row>
                          <Segment className="NewsSegment" basic>
                            <Header as='h3'>TEST</Header>
                            <Image size='medium' src={MediaParagraphPNG}/>
                          </Segment>
                        </Grid.Row>
                        <Grid.Row>
                          <Segment className="NewsSegment" basic>
                            <Image size='medium' src={MediaParagraphPNG}/>
                          </Segment>
                        </Grid.Row>
                        <Grid.Row>
                          <Segment className="NewsSegment" basic>
                            <Image size='medium' src={MediaParagraphPNG}/>
                          </Segment>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column width = {5}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Card fluid>
                          <Card.Header textAlign = 'center' className = 'BlockHeader'>
                            <Label color = 'blue' size = 'big'>TEST</Label>
                          </Card.Header>
                          <Card.Content>
                            <Image src = {ParagraphPNG}/>
                          </Card.Content>
                        </Card>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Card fluid>
                          <Card.Header textAlign = 'center' className = 'BlockHeader'>
                            <Label color = 'blue' size = 'big'>TEST</Label>
                          </Card.Header>
                          <Card.Content>
                            <Image src = {ParagraphPNG}/>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Advertisement centered unit='top banner' test='Top Banner' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width = {4}>
                    <Card fluid>
                      <Card.Header textAlign = 'center' className = 'BlockHeader'>
                        <Label color = 'blue' size = 'big'>CHƯƠNG TRA CỨU</Label>
                      </Card.Header>
                      <Card.Content className = 'BlockContent'>
                        <Menu style = {{
                          'border': '0'
                        }} fluid vertical>
                          <Menu.Item name = 'c1' onClick = {this.handleChapterSelect.bind(this)}>Chương 1</Menu.Item>
                          <Menu.Item name = 'c2' onClick = {this.handleChapterSelect.bind(this)}>Chương 2</Menu.Item>
                          <Menu.Item name = 'c3' onClick = {this.handleChapterSelect.bind(this)}>Chương 3</Menu.Item>
                          <Menu.Item name = 'c4' onClick = {this.handleChapterSelect.bind(this)}>Chương 4</Menu.Item>
                          <Menu.Item name = 'c5' onClick = {this.handleChapterSelect.bind(this)}>Chương 5</Menu.Item>
                          <Menu.Item name = 'c6' onClick = {this.handleChapterSelect.bind(this)}>Chương 6</Menu.Item>
                          <Menu.Item name = 'c7' onClick = {this.handleChapterSelect.bind(this)}>Chương 7</Menu.Item>
                          <Menu.Item name = 'c8' onClick = {this.handleChapterSelect.bind(this)}>Chương 8</Menu.Item>
                          <Menu.Item name = 'c9' onClick = {this.handleChapterSelect.bind(this)}>Chương 9</Menu.Item>
                          <Menu.Item name = 'c10' onClick = {this.handleChapterSelect.bind(this)}>Chương 10</Menu.Item>
                          <Menu.Item name = 'c11' onClick = {this.handleChapterSelect.bind(this)}>Chương 11</Menu.Item>
                          <Menu.Item name = 'c12' onClick = {this.handleChapterSelect.bind(this)}>Chương 12</Menu.Item>
                        </Menu>
                      </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width = {7}>
                  <Card fluid>
                    <Card.Header textAlign = 'center' className = 'BlockHeader'>
                      <Label color = 'blue' size = 'big'>DANH SÁCH ĐIỀU LUẬT</Label>
                    </Card.Header>
                    <Card.Content className = 'BlockContent'>
                       <Table style = {{
                         'border':'0',
                       }} celled striped>
                       <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>STT</Table.HeaderCell>
                            <Table.HeaderCell>Tên</Table.HeaderCell>
                            <Table.HeaderCell>Nội dung</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                         <Table.Row>
                          <Table.Cell>
                            1
                          </Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                         <Table.Cell>
                           2
                         </Table.Cell>
                         <Table.Cell>Test</Table.Cell>
                         <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            3
                          </Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            4
                          </Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            5
                          </Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            6
                          </Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            7
                          </Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            8
                          </Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            9
                          </Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                          <Table.Cell>Test</Table.Cell>
                        </Table.Row>
                      </Table>
                    </Card.Content>
                  </Card>
                  <Menu floated = 'right' pagination>
                    <Menu.Item name='1' onClick={this.handlePageSelect.bind(this)} />
                    <Menu.Item disabled>...</Menu.Item>
                    <Menu.Item name='10' onClick={this.handlePageSelect.bind(this)} />
                    <Menu.Item name='11' onClick={this.handlePageSelect.bind(this)} />
                    <Menu.Item name='12' onClick={this.handlePageSelect.bind(this)} />
                  </Menu>
                </Grid.Column>
                <Grid.Column width = {5}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Card fluid>
                          <Card.Header textAlign = 'center' className = 'BlockHeader'>
                            <Label color = 'blue' size = 'big'>TEST</Label>
                          </Card.Header>
                          <Card.Content>
                            <Image src = {ParagraphPNG}/>
                          </Card.Content>
                        </Card>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Card fluid>
                          <Card.Header textAlign = 'center' className = 'BlockHeader'>
                            <Label color = 'blue' size = 'big'>TEST</Label>
                          </Card.Header>
                          <Card.Content>
                            <Image src = {ParagraphPNG}/>
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
        </div>);
  }
}

const mapStateToProps = state => {
  return {
    chapters: state.laws.chapters,
    isChapterListLoading: state.laws.listLoading,
    articles: state.laws.articles,
    isChapterDetailLoading: state.laws.detailLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetChapterList: () => dispatch(actions.getChapterList()),
    onGetChapterDetail: (currentChapter, pageIndex, itemPerPage) => dispatch(actions.getChapterDetail(currentChapter, pageIndex, itemPerPage))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
