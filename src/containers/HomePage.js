import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Container, Grid, Image, Label, Menu } from 'semantic-ui-react';

import ParagraphPNG from '../assets/images/paragraph.png';
import EntryList from '../components/EntryList/EntryList';
import FooterLayout from '../components/FooterLayout';
import News from '../components/News';
import SearchBar from '../components/SearchBar';
import * as actions from '../store/actions/index';
import RadioCardLayout from '../components/RadioCardLayout';

class HomePage extends Component {
  state = {
    pageIndex: 1,
    itemPerPage: 10,
    lawClass: null,
    agency: null,
    validityStatus: null,
    promulgateYear: null
  };

  componentWillMount() {
    this.getAllLaws();
    this.props.onGetLawClass();
    this.props.onGetAgencyList();
    this.props.onGetStatusList();
  }

  onLawClassChange = classId =>
    this.setState({ lawClass: classId, pageIndex: 1 }, () => this.getAllLaws());
  onAgencyChange = agencyId =>
    this.setState({ agency: agencyId, pageIndex: 1 }, () => this.getAllLaws());
  onStatusChange = statusId =>
    this.setState({ validityStatus: statusId, pageIndex: 1 }, () =>
      this.getAllLaws()
    );

  getAllLaws = () => {
    let lawClass = this.state.lawClass === 'all' ? null : this.state.lawClass;
    let agency = this.state.agency === 'all' ? null : this.state.agency;
    let validityStatus =
      this.state.validityStatus === 'all' ? null : this.state.validityStatus;
    this.props.onGetAllLaws(
      this.state.pageIndex,
      this.state.itemPerPage,
      agency,
      lawClass,
      this.state.promulgateYear,
      validityStatus
    );
  };

  componentWillUpdate(nextProps) {
    if (nextProps.chapters !== this.props.chapters) {
      nextProps.onGetChapterDetail(
        nextProps.chapters[0],
        this.pageIndex,
        this.itemPerPage
      );
    }
  }

  onPerPageChange = (e, { value }) => {
    this.setState({ itemPerPage: value }, () => this.getAllLaws());
  };

  onPageIndexClick = (e, { activePage }) => {
    this.setState({ pageIndex: activePage }, () => this.getAllLaws());
  };
  render() {
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
                    <News />
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
              <Grid.Column />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <RadioCardLayout
                  title="Loại văn bản"
                  loading={this.props.lawClassLoading}
                  data={this.props.lawClassList}
                  onChange={this.onLawClassChange}
                  groupName="lawClass"
                />
                <RadioCardLayout
                  title="Cơ quan ban hành"
                  loading={this.props.agencyListLoading}
                  data={this.props.agencyList}
                  onChange={this.onAgencyChange}
                  groupName="agency"
                />
                <RadioCardLayout
                  title="Trạng thái hiệu lực"
                  loading={this.props.statusListLoading}
                  data={this.props.validityStatusList}
                  onChange={this.onStatusChange}
                  groupName="status"
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <Card fluid>
                  <Card.Header textAlign="center" className="BlockHeader">
                    <Label color="blue" size="large">
                      Danh sách văn bản luật
                    </Label>
                  </Card.Header>
                  <Card.Content className="BlockContent">
                    <EntryList
                      isSearch={false}
                      useSegment={false}
                      itemPerPage={this.state.itemPerPage}
                      pageIndex={this.state.pageIndex}
                      onPerPageChange={this.onPerPageChange}
                      totalResult={this.props.totalLaw}
                      onPageIndexClick={this.onPageIndexClick}
                      searchLoading={this.props.lawListLoading}
                      searchResult={this.props.lawDocumentList}
                    />
                  </Card.Content>
                </Card>
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
    lawDocumentList: state.laws.lawDocumentList,
    totalLaw: state.laws.totalLaw,
    lawListLoading: state.laws.allLawLoading,
    lawListError: state.laws.allLawError,
    lawClassList: state.laws.lawClassList,
    lawClassLoading: state.laws.lawClassLoading,
    lawClassErrorMsg: state.laws.lawClassErrorMsg,
    agencyList: state.laws.agencyList,
    agencyListLoading: state.laws.agencyListLoading,
    agencyListErrorMsg: state.laws.agencyListErrorMsg,
    validityStatusList: state.laws.validityStatusList,
    statusListLoading: state.laws.statusListLoading,
    statusListErrorMsg: state.laws.statusListErrorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllLaws: (
      pageIndex,
      itemPerPage,
      agency,
      lawClass,
      promulgateYear,
      validityStatus
    ) =>
      dispatch(
        actions.getAllLaw(
          pageIndex,
          itemPerPage,
          agency,
          lawClass,
          promulgateYear,
          validityStatus
        )
      ),
    onGetLawClass: () => dispatch(actions.getLawClassList()),
    onGetAgencyList: () => dispatch(actions.getListAgency()),
    onGetStatusList: () => dispatch(actions.getValidityStatusList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
